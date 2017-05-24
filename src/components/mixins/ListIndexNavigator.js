import {object_get} from '../../helpers/objects';
import {addEvent, smartFocusToggle, keyCode, stopParentScroll, scrolledToBottom} from '../../helpers/events';
import {escapeRegExp} from '../../helpers/strings';

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
		};
	},

	computed: {
        /**
		 * Returns the filter used against the list
		 *
         * @returns {function(*=)}
         */
		filter_function() {
			let name_regex = new RegExp('^.*' + escapeRegExp(''+this.lookup_name) + '.*', 'i');

			let filter = this.filter;
			if ( !filter && this.selectionKey ) {
				filter = this.selectionKey;
			}
			if ( typeof filter == 'function' ) {
				return filter;
			}

			return (item) => {
				return object_get(item, filter, '').match(name_regex) ? true : false;
			};
		},

		list_exhausted() {
			return parseInt(this.last_page || 0) > 0;
		},

		/**
		 * Returns true when list expects multiple selections
		 *
		 * @return {props.taggable|{type, default}|taggable|props.multiple|multiple|boolean}
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
			return this.list.length -1;
		},

	},

	methods: {
		initListNavigation(options) {
            this.ref_lookup = options.lookup || 'lookup';
            this.ref_list = options.list || 'list';

            this.$nextTick(() => {
				this.listenForScroll();

				addEvent(document, 'mousemove', () => {
					this.navigating_with_keys = false;
				});

	            smartFocusToggle(this.$el, (focus, e) => {
		            this.focused = focus;
		            if ( !focus ) {
			            this.$emit('blur');
			            this.focused = false;
			            if ( this.closeOnBlur ) {
				            this.clear();
			            }
		            }
	            }, 50);

                if ( this.focus ) {
                    this.setFocus();
                }
			})
		},

		/**
		 * Listens for the scroll changes to detect when to run the next page
		 */
		listenForScroll() {
			if ( this.paginated ) {
                scrolledToBottom(this.$refs[this.ref_list], () => {
                    if ( this.last_index && !this.list_exhausted && this.list.length ) {
                        this.runNextPage(this.last_index);
                    }
				}, this.mousescroll_delay, this.mousescroll_threshold);
			}
			if ( this.stopParentScroll ) {
                stopParentScroll(this.$refs[this.ref_list]);
			}
		},

		/**
		 *
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
			let index = this.selected_index - 1;
			if ( !(index < this.minIndex) ) {
				this.selected_index -= 1;
			}

	        // Auto scroll
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
			let index = this.selected_index + 1;

			if ( index <= this.last_index ) {
				this.selected_index += 1;
			}

	        // Auto scroll
	        if ( this.list.length > 0 ) {
		        this.$nextTick(() => {
			        this.autoScroll('down');
		        });
	        }
        },

		/**
		 * Clear the lookup
		 */
		clear() {
			this.resetList();
			this.lookup_name = '';
			this.list = [];
			if ( this.$refs[this.ref_lookup] === document.activeElement ) {
				this.$refs[this.ref_lookup].blur();
			}
			this.$emit('clear');
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

			if ( this.list.length > index ) {
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
			this.$refs[ref || this.ref_lookup].focus();
			this.$emit('focus');
		},

        /**
		 * Looks for the term in the cache
		 *
         * @param term
         * @returns {boolean}
         */
		findCache(term, page) {
			if ( term in this.cache ) {
				if ( page in this.cache[term] ) {
					return this.cache[term][page];
				}
			}

			return false;
		},

		/**
		 * Add results into the cache
		 *
		 * @param term
		 * @param page
		 * @param results
		 * @return {boolean}
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
         * @param concat
         */
		runSearch(concat = false) {
			// See if we can process the request from our cache
			if ( this.cacheResults ) {
				let cached_list = this.findCache(this.lookup_name, this.page)
				if ( cached_list ) {
					this.callback(cached_list, false, concat);
					return;
				}
			}

			this.loading = true;
			let term = this.lookup_name;
			let page = this.page;
			this.$emit('search', {
				term,
				page,
				callback: (list) => {
					this.callback(list, true, concat);
				}
			});
		},

		/**
		 * Callback when list is updated
		 *
		 * @param list
		 */
		callback(list, cache = true, concat = false) {
	        this.loading = false;
			let term = this.lookup_name;

			let start_index = this.getSearchStartIndex();
	        if ( this.paginated ) {
	        	// If we have results and the we want them concatenated
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
		        }
	        } else {
		        this.selected_index = start_index;
		        this.list = list;
	        }

	        if ( cache && this.cacheResults ) {
		        this.addCache(term, this.page, list);
	        }
        },

        getSearchStartIndex() {
		    return this.startIndex;
        },

        /**
		 * Runs the filter for the given lookup text
         */
		runFilter() {
			if ( this.findCache(this.lookup_name) ) {
				return;
			}

			this.loading = true;

			if ( !this.lookup_name ) {
				this.list = this.items;
			} else {
				this.list = this.items.filter(this.filter_function);
				this.cache[this.lookup_name] = this.list;
			}

			this.loading = false;
		},

        /**
		 * Begins the execution of a search from the user
		 * this is triggered before runSearch or runFilter
         *
         * @param Number index
         */
		startSearch(index = null) {
		    // If a value index is provided then we should initialize to that
			this.selected_index = parseInt(index && index != -1 ? index : this.startIndex);
			this.initListScrollTo(this.selected_index);

			if ( this.lookup_name.length < this.minSearch ) {
				this.list = [];
				return;
			}

			if ( this.items && !this.paginated ) {
				this.runFilter();
				return;
			}

			if ( this.timer ) {
				clearTimeout(this.timer);
			}

			this.timer = setTimeout(() => {
				// Reset page since the search term has changed
				this.page = 1;
				this.last_page = null;
				this.runSearch();
			}, this.delay);
		},

        /**
         * Sets up the scroll to of the list when it is opened
         */
        initListScrollTo(index) {
            let scrollStart = 0;
            if ( index > 0 && this.$refs[this.ref_list].children[index] ) {
                scrollStart = (this.$refs[this.ref_list].children[index].scrollHeight + 2) * index;
                scrollStart = parseInt(Math.abs(scrollStart));
            }

            this.$refs[this.ref_list].scrollTop = scrollStart;
        },

        /**
		 * Resets the scroll of the given reference
         */
		resetList() {
			this.$refs[this.ref_list].scrollTop = 0;
	        this.selected_index = this.startIndex;
		},

        /**
		 * Auto scrolls the the list based on the offset of the items
		 * takes a direction for scrolling down or up
		 *
         * @param direction
         */
		autoScroll(direction) {
			let li = this.$refs[this.ref_list].getElementsByClassName('selected-item')[0];
			if ( !li ) {
				return;
			}
			let itemOffset = li.offsetTop;
			let itemHeight = li.offsetHeight;
			let scrollTop = this.$refs[this.ref_list].scrollTop;
			let offsetHeight = this.$refs[this.ref_list].offsetHeight;

			if ( direction == 'down' ) {
				if ( itemOffset+itemHeight >= scrollTop + offsetHeight) {
					this.$refs[this.ref_list].scrollTop += itemHeight;
				}
			} else {
				if ( itemOffset-(itemHeight/2) <= scrollTop) {
					this.$refs[this.ref_list].scrollTop -= itemHeight;
				}
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
					this.runSearch(true)
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

			return true;
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
