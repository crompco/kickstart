<template>
    <div
        class="ks-select"
        :class="{ 'ks-select-open': isOpen }"
        tabindex="0"
        @keydown.space.prevent.stop="open"
        @keydown.enter.prevent.stop="enterOpen"
        @keydown.tab="tabOpen"
        @keydown.down.prevent="openSelectDown"
        @keydown.up.prevent="openSelectUp"
        @keydown="keyOpen"
        @keyup.esc="close"
        :disabled="disabled"
    >
        <input type="text" :name="name" :value="inputValue" @input="filledInput" class="select-input-field"
               tabindex="-1">
        <div class="ks-select-selection" @click.prevent="toggleOpen">
            <div class="ks-select-placeholder" v-if="!value">{{placeholder}}</div>
            <template v-else>
                <slot :value="value" :label="selected" name="label">
                    {{selected}}
                </slot>
            </template>
            <span class="ks-select-deselect" v-if="showDeselect" @click.prevent.stop="clearSelection()">x</span>
            <span class="ks-select-arrow"></span>
        </div>

        <div class="ks-select-dropdown" v-show="isOpen">
            <!-- Lookup field-->
            <div class="ks-select-dropdown-input" v-show="show_search">
                <input
                    type="text"
                    autocomplete="new-password"
                    ref="lookup"
                    v-model="lookup_name"
                    :placeholder="placeholder"
                    @keyup.esc.stop="clear"
                    @keydown.space.stop
                    :class="{ 'is-multiple': multiple }"
                >
            </div>

            <!-- Loading indicator -->
            <div style="position: relative; height: 5px;margin-top: -5px;">
                <loader-line :show="loading" :absolute="true"></loader-line>
            </div>

            <!-- Autocomplete list-->
            <div class="ks-select-list">
                <ul
                    ref="list"
                    class="autocomplete-list"
                    :class="{'inverted': this.inverted}"
                    :style="list_style"
                >
                    <template v-if="groupBy">
                        <li v-for="(group_list, group) in groups" class="opt-group">
                            <strong>{{group}}</strong>
                            <ul>
                                <li
                                    v-for="(item, index) in group_list"
                                    :class="{ 'selected-item': item._index == selected_index }"
                                    @click.prevent="selectItem(item._index, $event)"
                                    @mouseover="setHoverIndex(item._index)"
                                >
                                    <!-- Scoped slot -->
                                    <slot :item="item">{{item[labelKey]}}</slot>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <template v-else>
                        <li
                            v-for="(item, index) in list"
                            :class="{ 'selected-item': index == selected_index }"
                            @click.prevent="selectItem(index)"
                            @mouseover="setHoverIndex(index)"
                        >
                            <!-- Scoped slot  that defaults to the labelKey-->
                            <slot :item="item">{{item[labelKey]}}</slot>
                        </li>
                    </template>
                    <!-- Slot for empty search results-->
                    <li v-if="!acceptEmptySelection && hasEmptyMessage && !loading && list.length == 0" class="empty-list-message">
                        <slot :term="lookup_name" name="empty">{{emptyMessage}}</slot>
                    </li>
                    <li
                        v-if="acceptEmptySelection && hasEmptyMessage && !loading && list.length == 0"
                        class="empty-list-message active-empty-list-message"
                        :class="{ 'selected-item': selected_empty }"
                        @click.prevent="selectEmpty(true)"
                    >
                        <slot :term="lookup_name" name="empty">{{emptyMessage}}</slot>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>

    import KsAutocomplete from './KsAutocomplete.vue';
    import ListIndexNavigator from './mixins/ListIndexNavigator';
    import LoaderLine from './KsLoaderLine.vue';
    import {object_get} from '../helpers/objects';

    export default {
        name: 'KsSelect',

        mixins: [ListIndexNavigator],

        props: {
            name: {
                type: String,
                required: true
            },
            labelKey: {
                type: String,
                required: true
            },
            value: {},
            placeholder: {
                type: String,
                default: 'Select...',
            },
            searchThreshold: {
                type: Number,
                default: 7
            },
            disableSearch: {
                type: Boolean,
                default: false
            },
            itemFilter: {},
            itemKey: String,
            listHeight: {
                default: "250px"
            },
            minSearch: {
                type: Number,
                default: 0
            },
            multiple: {
                type: Boolean,
                default: false
            },
            singleDeselect: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            forceValues: {
                type: Boolean,
                default: false,
            },
            forceObjects: {
                type: Boolean,
                default: false,
            },
            invertOffsetRatio: {
                type: Number,
                default: .75
            }
        },

        computed: {
            inputValue() {
                if ( this.value instanceof Object ) {
                    return this.keyName in this.value ? this.value[this.keyName] : this.value;
                }

                return this.value;
            },

            using_items() {
                return this.items ? true : false;
            },

            binds_objects() {
                if ( this.forceValues ) {
                    return false;
                }

                // Try to determine what type of value the consumer expects
                // If they don't provide a value then we will assume they want objects
                if ( this.forceObjects || null === this.value || typeof this.value === "undefined" ) {
                    return true;
                }

                // We will
                return typeof this.value !== 'object' ? false : true;
            },
            show_search() {
                if ( this.disableSearch ) {
                    return false;
                }

                if ( !this.items || this.paginated ) {
                    return true;
                }

                if ( this.items.length > this.searchThreshold ) {
                    return true;
                }

                return false;
            },
            showDeselect() {
                return !this.multiple && this.singleDeselect && this.selected ? true : false;
            },
        },

        data() {
            return {
                clear_on_close: false,
                loading: false,
                selected: null,
                startIndex: 0,
                minIndex: 0,
                selected_index: 0,
                keyName: this.itemKey,
                filter: this.itemFilter,
                isOpen: false,
                needs_new_search: true,
                inverted: false,
                list_style: {
                    'max-height': this.listHeight,
                    top: null,
                }
            };
        },

        mounted() {
            if ( !this.itemKey ) {
                this.keyName = this.name;
            }
            if ( !this.itemFilter ) {
                this.filter = this.labelKey;
            }

            if ( Array.isArray(this.items) ) {
                this.list = this.items;
            }

            this.refreshSelected();

            this.initListNavigation({
                lookup: 'lookup',
                list: 'list',
            });

            this.$on('clear', () => {
                this.isOpen = false;
            });

            window.addEventListener('scroll', this.handleScroll);
        },

        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        methods: {

            handleScroll() {
                let list_height = parseInt(this.$refs.list.offsetHeight);
                let element_height = this.$el.offsetHeight;
                if ( list_height == 0 ) {
                    this.list_style.top = false;
                    return;
                }

                let bottom_of_element = this.$el.getBoundingClientRect().top + (list_height * this.invertOffsetRatio) + window.scrollY;

                // Chect that the overall window height vs the list_height is large enough to even considering flipping the screen
                // Then see if the bottom of the element is passed our scrolled height
                if ( (window.innerHeight > list_height + 115) && bottom_of_element > ((window.innerHeight + window.scrollY)) ) {
                    this.inverted = true;
                    this.list_style.top = `calc(-${list_height}px - 2.135rem)`
                } else {
                    this.inverted = false;
                    let operator = '+';
                    let adjustment = 0.875;
                    if ( !this.show_search ) {
                        operator = '-';
                        adjustment = 2.125;
                    }

                    this.list_style.top = `calc(${element_height -1}px ${operator} ${adjustment}rem)`;
                }
            },

            filledInput(e) {
                this.list.find((item, index) => {
                    if ( this.keyName in item && e.target.value == item[this.keyName] ) {
                        this.selectItem(index, e, false);
                        return;
                    }
                });
            },
            /**
             * Clear the lookup
             */
            clear() {
                this.resetList();
                this.lookup_name = '';

                if ( this.$refs[this.ref_lookup] === document.activeElement ) {
                    this.$refs[this.ref_lookup].blur();
                }
                this.$emit('clear');
            },

            clearSelection(s = null) {
                let popped = null;

                if ( this.multiple ) {
                    let index = this.selected.indexOf(s);
                    if ( index > -1 ) {
                        popped = this.selected.splice(index, 1);
                    }
                } else {
                    popped = this.selected;
                    this.selected = null;
                }

                this.$emit('deleted', popped);
                this.$emit('input', this.binds_objects ? null : '');
                this.refreshSelected();
            },

            toggleOpen() {
                if ( !this.isOpen ) {
                    this.open();
                } else {
                    this.close();
                }
            },
            enterOpen(e) {
                if ( this.disabled ) {
                    return false;
                }

                if ( !this.isOpen ) {
                    this.isOpen = true;
                    return;
                }

                this.selectItem(this.selected_index, e);
            },
            tabOpen(e) {
                if ( this.disabled ) {
                    return false;
                }

                if ( this.isOpen ) {
                    this.selectItem(this.selected_index, e);
                }

                return true;
            },
            openSelectDown() {
                this.open();
                this.selectDown();
            },
            openSelectUp() {
                this.open();
                this.selectUp();
            },
            keyOpen(e) {
                if ( !this.isOpen && this.isTypeKey(e) ) {
                    this.open();
                }
            },
            /**
             * Determines whether the key should be handled as valid input
             * @param e
             * @returns {boolean}
             */
            isTypeKey(e) {
                let keycode = e.keyCode;
                return (keycode > 47 && keycode < 58) || // number keys
                    keycode == 32 || // spacebar
                    (keycode > 64 && keycode < 91) || // letter keys
                    (keycode > 95 && keycode < 112) || // numpad keys
                    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
                    (keycode > 218 && keycode < 223);   // [\]' (in order)
            },
            blurred() {
                this.close();
            },
            open(e) {
                if ( this.disabled ) {
                    return false;
                }

                this.isOpen = true;
            },

            close() {
                this.isOpen = false;
                this.selected_empty = false;
            },

            selectItem(index, e, reset = true) {
                if ( !this.handleSelectEvent(e) ) {
                    return;
                }

                // If user is selecting index -1 then we should just clear the selection
                // This should only happen when single deselect is active
                if ( index == -1 ) {
                    this.clearSelection();
                    return this.resetSelect();
                }

                // Find the item by the given index
                let item = this.getItemByIndex(index);
                if ( item != null && !(this.keyName in item) ) {
                    console.error('KsSelect: Could not find key: ' + this.keyName, item);
                }

                if ( this.selected_empty ) {
                    this.$emit('selected-empty', true);
                } else {
                    // Determine what value to emit
                    if ( this.binds_objects ) {
                        this.$emit('input', item);
                    } else {
                        this.$emit('input', item[this.keyName]);
                    }
                }

                // Reset the select to it starting state
                if ( reset ) {
                    this.resetSelect();
                }
            },

            resetSelect() {
                this.resetList();
                this.selected_index = 0;
                this.lookup_name = '';
                this.close();
                this.$el.focus();
            },

            refreshSelected() {
                if ( !this.value ) {
                    this.selected = '';
                    return;
                }

                if ( this.binds_objects ) {
                    this.selected = object_get(this.value, this.labelKey, null);
                    return;
                }

                for ( var i in this.list ) {
                    if ( this.list[i][this.keyName] == this.value ) {
                        this.selected = this.list[i][this.labelKey];
                        return;
                    }
                }

            },

            value_index() {
                // This currently only works properly with the
                //&& this.using_items
                if ( this.value && !this.multiple ) {
                    if ( this.binds_objects ) {
                        return parseInt(this.list.indexOf(this.value));
                    }

                    // When not using objects we need to iterate over the list to determine the values index
                    for ( var i in this.list ) {
                        if ( this.list[i][this.keyName] == this.value ) {
                            return parseInt(i);
                        }
                    }
                }

                return -1;
            },
        },

        watch: {
            lookup_name() {
                this.startSearch();
                this.needs_new_search = true;
            },
            list() {
                this.$nextTick(() => {
                    this.handleScroll();
                });

                if ( this.list.length > 0 ) {
                    this.selected_empty = false;
                }
            },
            value() {
                this.refreshSelected();
                if ( !this.value ) {
                    this.close();
                }
            },
            items() {
                this.list = ( Array.isArray(this.items) && this.items.length > 0 ) ?
                    this.list = this.items :
                    this.list = [];
                if ( this.value_index() === -1 ) {
                    this.clearSelection();
                }
                this.clearCache();
                this.refreshSelected();
                this.selected_empty = false;
            },
            isOpen(open, oldOpen) {
                if ( open ) {
                    this.$nextTick(() => {
                        this.setFocus('lookup');
                        if ( oldOpen != open ) {
                            // Only start the new search when the list is empty
                            // otherwise we can just keep the current list
                            let value_index = this.value_index();
                            if ( this.list.length == 0 || this.needs_new_search ) {
                                this.startSearch(value_index);
                                this.needs_new_search = false;
                            } else {
                                this.selected_index = value_index;
                                this.initListScrollTo(this.selected_index);
                            }
                            this.handleScroll();
                        }
                    });
                }
            },
        },

        components: {
            KsAutocomplete,
            LoaderLine
        }
    }
</script>
