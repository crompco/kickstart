import { object_get } from '../../helpers/objects';
import { addEvent, keyCode, removeEvent, removeSmartFocusToggle, scrolledToBottom, smartFocusToggle, stopParentScroll } from '../../helpers/events';
import { escapeRegExp } from '../../helpers/strings';
import api from '../../helpers/api';

export default {

    props: {
        // A list of items to use in the list
        items: {
            type: Array,
            default() {
                return null;
            }
        },
        // When true the list auto closes when the lookup field is blurred
        closeOnBlur: {
            type: Boolean,
            default: true
        },
        // If true the list will be cached by term
        cacheResults: {
            type: Boolean,
            default: true
        },
        // If true run search will be called as the list reaches the end
        paginated: {
            type: Boolean,
            default: false
        },
        // The threshold to start the pagination request
        paginateThreshold: {
            type: Number,
            default: 3
        },
        // The minimum length needed to fire a search/filter
        minSearch: {
            type: Number,
            default: 1
        },
        // Stops the scrolling of the list from propagating to the parent
        stopParentScroll: {
            type: Boolean,
            default: true
        },
        // If taggable then it allows entries not in the list
        taggable: {
            type: Boolean,
            default: false,
        },
        selectionKey: {
            type: String,
            default: null
        },
        // The delay used for the search
        delay: {
            type: Number,
            default: 100
        },
        groupBy: {
            type: [String],
            default: null
        },
        acceptEmptySelection: {
            type: Boolean,
            default: false,
        },
        emptyMessage: {
            type: String,
            default: ''
        },
    },

    data() {
        return {
            ref_lookup: 'lookup',
            ref_list: 'list',
            loading: false,
            focused: false,
            lookup_name: '',
            list: [],
            startIndex: -1,
            minIndex: -1,
            selected_index: -1,
            hover_index: -1,
            cache: {},
            page: 1,
            last_page: null,
            mousescroll_threshold: 40,
            mousescroll_delay: 100,
            navigating_with_keys: false,
            key_pressed_timer: '',
            selected_empty: false,
            filter: null,
            timer: null,
        };
    },

    computed: {
        nameRegex() {
            return new RegExp('^.*' + escapeRegExp('' + this.lookup_name) + '.*', 'i');
        },

        /**
         * Returns the filter used against the list
         *
         * @returns {function(*=)}
         */
        filter_function() {
            let filter = this.filter;
            if ( !filter && this.selectionKey ) {
                filter = this.selectionKey;
            }
            if ( typeof filter == 'function' ) {
                return filter;
            }

            return (item) => {
                const name_match = this.nameRegex.test(String(object_get(item, filter, '')));

                // If groupBy is set then we should filter on the group name or the name match
                if ( this.groupBy ) {
                    return name_match || this.nameRegex.test(String(object_get(item, this.groupBy, '')));
                }

                return name_match;
            };
        },

        list_exhausted() {
            return parseInt(this.last_page || 0) > 0;
        },

        /**
         * Returns true when list expects multiple selections
         *
         * @return {boolean}
         */
        is_multiple() {
            return this.taggable || this.multiple;
        },

        /**
         * This is the index of the last item in the list
         *
         * @returns {number}
         */
        last_index() {
            return this.list.length - 1;
        },

        groups() {
            if ( !this.groupBy ) {
                return {};
            }

            const groups = {};

            // Keep the original index as _index for selecting the items
            this.list.forEach((item, index) => {
                const group = object_get(item, this.groupBy);

                if ( typeof groups[group] == 'undefined' ) {
                    groups[group] = [];
                }

                groups[group].push({
                    ...item,
                    _index: index,
                });
            });

            return groups;
        },

        hasEmptyMessage() {
            return !!(this.emptyMessage || this.$slots.empty || (this.$scopedSlots && this.$scopedSlots.empty));
        },
    },

    mounted() {
        this.list_teardown = [];
        this.is_unmounted = false;
        this.abort_controller = null;
    },

    beforeDestroy() {
        this.teardownListNavigation();
    },

    beforeUnmount() {
        this.teardownListNavigation();
    },

    methods: {
        callHookMethod(method_name, params = []) {
            if ( typeof this[method_name] == 'function' ) {
                this[method_name].apply(this, params);
            }
        },

        initListNavigation(options) {
            this.ref_lookup = options.lookup || 'lookup';
            this.ref_list = options.list || 'list';

            this.$nextTick(() => {
                // The component can be destroyed before the next tick
                if ( this.is_unmounted ) {
                    return;
                }

                this.listenForScroll();

                const stopKeyNavigation = () => {
                    this.navigating_with_keys = false;
                };
                addEvent(document, 'mousemove', stopKeyNavigation);
                this.list_teardown.push(() => removeEvent(document, 'mousemove', stopKeyNavigation));

                const focus_toggle = smartFocusToggle(this.$el, (focus) => {
                    this.focused = focus;
                    if ( !focus ) {
                        this.$emit('blur');
                        this.focused = false;
                        if ( this.closeOnBlur ) {
                            this.clear();
                        }
                    }
                }, 50);
                this.list_teardown.push(() => removeSmartFocusToggle(focus_toggle));

                if ( this.focus ) {
                    this.setFocus();
                }
            });
        },

        teardownListNavigation() {
            this.is_unmounted = true;
            clearTimeout(this.timer);
            this.abortSearch();

            (this.list_teardown || []).forEach(teardown => teardown());
            this.list_teardown = [];
        },

        /**
         * Listens for the scroll changes to detect when to run the next page
         */
        listenForScroll() {
            const list = this.$refs[this.ref_list];
            if ( !list ) {
                return;
            }

            if ( this.paginated ) {
                this.list_teardown.push(scrolledToBottom(list, () => {
                    if ( this.last_index && !this.list_exhausted && this.list.length ) {
                        this.runNextPage(this.last_index);
                    }
                }, this.mousescroll_delay, this.mousescroll_threshold));
            }
            if ( this.stopParentScroll ) {
                this.list_teardown.push(stopParentScroll(list));
            }
        },

        /**
         * @param index
         */
        setHoverIndex(index) {
            if ( !this.navigating_with_keys ) {
                this.selected_index = index;
            }
        },

        /**
         * Move the selection up
         */
        selectUp() {
            this.navigating_with_keys = true;
            const index = this.selected_index - 1;
            if ( !(index < this.minIndex) ) {
                this.selected_index -= 1;
                this.callHookMethod('onSelectUp');
            } else {
                this.callHookMethod('onSelectStartBoundary');
            }

            if ( this.list.length > 0 ) {
                this.$nextTick(() => {
                    this.autoScroll('up');
                });
            }
        },

        /**
         * Move the selection down
         */
        selectDown() {
            this.navigating_with_keys = true;
            const index = this.selected_index + 1;

            if ( index <= this.last_index ) {
                this.selected_index += 1;
                this.callHookMethod('onSelectDown');
            } else {
                this.callHookMethod('onSelectEndBoundary');
            }

            if ( this.list.length > 0 ) {
                this.$nextTick(() => {
                    this.autoScroll('down');
                });
            }
        },

        /**
         * Clear the lookup
         * @param keep_focus_or_event
         */
        clear(keep_focus_or_event = false) {
            this.resetList();
            this.lookup_name = '';
            this.list = [];
            if ( this.$refs[this.ref_lookup] === document.activeElement && !keep_focus_or_event ) {
                this.$refs[this.ref_lookup].blur();
            }
            this.$emit('clear', keep_focus_or_event);
        },

        /**
         * Clear the cache
         */
        clearCache() {
            this.cache = {};
        },

        /**
         * Retrieves the item at the current selected index
         *
         * @returns {*}
         */
        getSelectedItem() {
            return this.getItemByIndex(this.selected_index);
        },

        /**
         * Retrieves an item by index
         *
         * @param index
         * @returns {*}
         */
        getItemByIndex(index) {
            index = parseInt(index);

            if ( index >= 0 && this.list.length > index ) {
                return this.list[index];
            }

            return null;
        },

        /**
         * Sets focus to the passed reference and fires event
         *
         * @param ref
         */
        setFocus(ref) {
            const reference = this.$refs[ref || this.ref_lookup];
            if ( reference ) {
                reference.focus();
            }
            this.$emit('focus');
        },

        /**
         * Looks for the term in the cache
         *
         * @param term
         * @param page
         * @returns {Array|boolean}
         */
        findCache(term, page) {
            if ( term in this.cache && page in this.cache[term] ) {
                return this.cache[term][page];
            }

            return false;
        },

        /**
         * Add results into the cache
         *
         * @param term
         * @param page
         * @param results
         */
        addCache(term, page, results) {
            if ( !this.cache[term] ) {
                this.cache[term] = {};
            }

            this.cache[term][page] = results;
        },

        /**
         * Emits the search event with the given lookup name and attaches the new results
         *
         * @param term
         * @param concat
         */
        runSearch(term, concat = false) {
            // See if we can process the request from our cache
            if ( this.cacheResults ) {
                const cached_list = this.findCache(term, this.page);
                if ( cached_list ) {
                    this.callback(cached_list, false, concat);
                    return;
                }
            }

            this.loading = true;
            const page = this.page;
            this.$emit('search', {
                term,
                page,
                callback: (endpoint, config = {}) => {
                    const signal = this.setupAbortSignal();

                    return api.getInstance().get(endpoint, {
                        signal,
                        ...config,
                    }).then(({ data }) => {
                        this.callback(data.data, true, concat);

                        return data;
                    }).catch((e) => {
                        if ( !api.isCancel(e) ) {
                            this.loading = false;
                            console.error(e);
                        }
                    });
                }
            });
        },

        /**
         * Aborts the previous search request and returns the signal for the next one
         *
         * @returns {AbortSignal}
         */
        setupAbortSignal() {
            this.abortSearch();
            this.abort_controller = new AbortController();

            return this.abort_controller.signal;
        },

        abortSearch() {
            if ( this.abort_controller ) {
                this.abort_controller.abort();
                this.abort_controller = null;
            }
        },

        /**
         * Callback when list is updated
         *
         * @param list
         * @param cache
         * @param concat
         */
        callback(list, cache = true, concat = false) {
            this.loading = false;
            const term = this.lookup_name;
            list = Array.isArray(list) ? list : [];

            const start_index = this.getSearchStartIndex();
            if ( this.paginated ) {
                if ( list.length ) {
                    if ( concat ) {
                        this.list = this.list.concat(list);
                    } else {
                        this.selected_index = start_index;
                        this.list = list;
                    }
                } else {
                    // Save when we reach the last page to prevent repeated calls
                    this.last_page = this.page;

                    if ( !concat ) {
                        this.list = list;
                    }
                }
            } else {
                this.selected_index = start_index;
                this.list = list;
            }

            if ( cache && this.cacheResults ) {
                this.addCache(term, this.page, list);
            }
        },

        /**
         * @returns {Number}
         */
        getSearchStartIndex() {
            return parseInt(this.startIndex);
        },

        /**
         * Filters the items by the lookup text
         */
        runFilter() {
            const items = Array.isArray(this.items) ? this.items : [];

            this.list = this.lookup_name ? items.filter(this.filter_function) : items;
            this.loading = false;
        },

        /**
         * Begins the execution of a search from the user
         * this is triggered before runSearch or runFilter
         *
         * @param {Number|null} index
         */
        startSearch(index = null) {
            // If a value index is provided then we should initialize to that
            this.selected_index = parseInt(index !== null && index != -1 ? index : this.startIndex);
            this.$nextTick(() => {
                this.initListScrollTo(this.selected_index);
            });

            if ( this.lookup_name.length < this.minSearch ) {
                this.list = [];
                return;
            }

            if ( this.items && !this.paginated ) {
                this.runFilter();
                return;
            }

            clearTimeout(this.timer);

            // Store the current lookup name for the search
            const term = this.lookup_name;
            this.timer = setTimeout(() => {
                // Reset page since the search term has changed
                this.page = 1;
                this.last_page = null;
                this.runSearch(term);
            }, this.delay);
        },

        /**
         * Sets up the scroll to of the list when it is opened
         */
        initListScrollTo(index) {
            const list = this.$refs[this.ref_list];
            if ( !list ) {
                return;
            }

            let scrollStart = 0;
            if ( index > 0 && list.children[index] ) {
                scrollStart = parseInt(Math.abs((list.children[index].scrollHeight + 2) * index));
            }

            list.scrollTop = scrollStart;
        },

        /**
         * Resets the scroll of the given reference
         */
        resetList() {
            if ( !this.$refs[this.ref_list] ) {
                return;
            }

            this.$refs[this.ref_list].scrollTop = 0;
            this.selected_index = parseInt(this.startIndex);
        },

        /**
         * Scrolls the list to keep the selected item visible
         *
         * @param direction
         */
        autoScroll(direction) {
            const list = this.$refs[this.ref_list];
            const li = list && list.getElementsByClassName('ks-selected-item')[0];
            if ( !li ) {
                return;
            }

            const itemOffset = li.offsetTop;
            const itemHeight = li.offsetHeight;
            const scrollTop = list.scrollTop;
            const offsetHeight = list.offsetHeight;

            if ( direction == 'down' ) {
                if ( itemOffset + itemHeight >= scrollTop + offsetHeight ) {
                    list.scrollTop += itemHeight;
                }
            } else if ( itemOffset - (itemHeight / 2) <= scrollTop ) {
                list.scrollTop -= itemHeight;
            }
        },

        /**
         * Runs the next page when applicable (at the end of the list)
         *
         * @param index
         */
        runNextPage(index) {
            if ( this.paginated && this.last_index - this.paginateThreshold <= index ) {
                if ( !this.list_exhausted ) {
                    this.page++;
                    this.runSearch(this.lookup_name, true)
                }
            }
        },

        /**
         * Handles the tab key intelligently
         *
         * @param e
         * @return Boolean
         */
        handleSelectEvent(e) {
            if ( e && keyCode(e) == 9 ) {
                if ( e.shiftKey ) {
                    this.clear();
                    return false;
                }
                if ( this.is_multiple && this.lookup_name.length ) {
                    e.preventDefault();
                }
            }
            if ( e && keyCode(e) == 13 ) {
                if ( !this.is_multiple ) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }
            }

            return true;
        },

        /**
         * Clears selections, items, and cache
         */
        reset() {
            this.list = [];
            this.lookup_name = '';
            this.clearSelection();
            this.clear();
            this.clearCache();
        },

        selectEmpty(selected_empty) {
            this.selected_empty = selected_empty;
            if ( this.selected_empty ) {
                this.selectItem();
            }
        },

        onSelectEndBoundary() {
            if ( this.list.length == 0 && this.acceptEmptySelection ) {
                this.selected_empty = true;
            }
        },

        onSelectStartBoundary() {
            if ( this.list.length == 0 && this.acceptEmptySelection ) {
                this.selected_empty = false;
            }
        },

        onSelectUp() {
            this.selected_empty = false;
        },

        onSelectDown() {
            this.selected_empty = false;
        },
    },

    watch: {
        /**
         * Watch the selected index in order to run the next page or to autoScroll
         */
        selected_index() {
            if ( this.selected_index >= 0 ) {
                this.runNextPage(this.selected_index);
            }
        }
    }
}
