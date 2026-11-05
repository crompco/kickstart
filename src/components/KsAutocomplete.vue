<template>
    <div
        tabindex="-1"
        class="ks-autocomplete-holder"
        :class="{ 'ks-selected': has_selections, 'ks-multiple': is_multiple, 'disabled': disabled}"
        @click.prevent="setFocus('lookup')"
        @keydown.enter.prevent.stop="editSelection"
    >

        <!-- Selections  -->
        <span
            v-if="selectionKey && has_selections"
            ref="selections"
            class="ks-selection"
            @click.prevent="editSelection"
        >
            <span
                v-for="(s, index) in selection"
                :key="index"
                tabindex="0"
                class="ks-selection-text"
                @keyup.delete.prevent.stop="clearSelection(s)"
            >
                <slot
                    name="label"
                    :item="s"
                >
                    {{ getSelectionLabel(s) }}
                </slot>
                <a
                    href="#"
                    tabindex="-1"
                    class="clear-selection"
                    @click.prevent.stop="clearSelection(s)"
                >
                    <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                        >
                            <g fill="currentColor">
                                <polygon points="10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644"></polygon>
                            </g>
                        </g>
                    </svg>
                </a>
            </span>
        </span>

        <!-- Lookup Field -->
        <input
            v-show="!has_selections || is_multiple"
            ref="lookup"
            v-model="lookup_name"
            type="text"
            autocomplete="off"
            name="lookup_name"
            :placeholder="placeholder_txt"
            :disabled="disabled"
            @keyup.esc="clear"
            @keyup.backspace="backspace"
            @keydown.tab="selectItem(selected_index, $event)"
            @keydown.enter.prevent="selectItem(selected_index, $event)"
            @keydown.down.prevent="selectDown()"
            @keydown.up.prevent="selectUp()"
        >

        <!-- List -->
        <div
            v-show="show_list"
            ref="dropdown"
            class="autocomplete-list-wrapper"
            :class="{ 'inverted': inverted }"
        >
            <div class="ks-searching-results">
                <ks-loader-line :show="loading"></ks-loader-line>
            </div>
            <ul
                ref="list"
                class="ks-autocomplete-list"
                :class="{ 'inverted': inverted }"
                :style="list_style"
            >
                <li
                    v-if="showTagInList && taggable && lookup_name"
                    :class="{ 'ks-selected-item': -1 == selected_index }"
                    @click="selectItem(-1, $event)"
                >
                    Add "<em v-text="lookup_name"></em>"
                </li>
                <template v-if="groupBy">
                    <li
                        v-for="(group_list, group) in groups"
                        :key="group"
                        class="ks-opt-group"
                    >
                        <strong>{{ group }}</strong>
                        <ul>
                            <li
                                v-for="item in group_list"
                                :key="item._index"
                                :class="{ 'ks-selected-item': item._index == selected_index }"
                                @click.prevent="selectItem(item._index, $event)"
                                @mouseover="setHoverIndex(item._index)"
                            >
                                <!-- Scoped slot -->
                                <slot :item="item">{{ item[selectionKey] }}</slot>
                            </li>
                        </ul>
                    </li>
                </template>
                <template v-else>
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                        :class="{ 'ks-selected-item': index == selected_index }"
                        @click.prevent="selectItem(index, $event)"
                        @mouseover="setHoverIndex(index)"
                    >
                        <!-- Scoped slot -->
                        <slot :item="item">{{ item[selectionKey] }}</slot>
                    </li>
                </template>
                <li
                    v-if="!acceptEmptySelection && hasEmptyMessage && !loading && list.length == 0"
                    class="ks-empty-list-message"
                >
                    <slot
                        name="empty"
                        :term="lookup_name"
                    >{{ emptyMessage }}</slot>
                </li>
                <li
                    v-if="acceptEmptySelection && hasEmptyMessage && !loading && list.length == 0"
                    class="ks-empty-list-message active-empty-list-message ks-active-empty-list-message"
                    :class="{'ks-selected-item': selected_empty}"
                    @click.prevent="selectEmpty(true)"
                >
                    <slot
                        name="empty"
                        :term="lookup_name"
                    >{{ emptyMessage }}</slot>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import KsLoaderLine from './KsLoaderLine.vue';
    import { object_get } from '../helpers/objects';
    import ListIndexNavigator from './mixins/ListIndexNavigator';
    import FloatingDropdown from './mixins/FloatingDropdown';

    export default {
        name: 'KsAutocomplete',

        mixins: [ListIndexNavigator, FloatingDropdown],

        props: {
            value: {},
            placeholder: {
                default: 'Lookup ...'
            },
            itemFilter: {
                type: [String, Function],
                default: null
            },
            multiple: {
                type: Boolean,
                default: false
            },
            listHeight: {
                default: "250px"
            },
            minSearch: {
                type: Number,
                default: 1
            },
            focus: {
                type: Boolean,
                default: false
            },
            showTagInList: {
                type: Boolean,
                default: false
            },
            keepTextOnDelete: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false,
            }
        },

        emits: ['input', 'deleted', 'selected-empty', 'tag-created', 'clear', 'blur', 'focus', 'search'],

        data() {
            return {
                lookup_name: '',
                selected_index: -1,
                selection: null,
                timer: '',
                list: [],
                loading: false
            };
        },

        computed: {
            show_list() {
                return this.focused && this.lookup_name.length >= this.minSearch;
            },
            has_selections() {
                return !!(this.selection && this.selection.length);
            },
            placeholder_txt() {
                if ( this.has_selections ) {
                    return '';
                }

                return this.placeholder;
            },
            list_style() {
                return {
                    'max-height': this.listHeight,
                };
            },
        },

        mounted() {
            this.filter = this.itemFilter || this.selectionKey;
            this.refreshSelection();

            this.$nextTick(() => {
                this.initListNavigation({
                    lookup: 'lookup',
                    list: 'list'
                });
            });
        },

        methods: {

            clearSelection(s) {
                let popped = null;

                if ( this.is_multiple ) {
                    const index = this.selection.indexOf(s);
                    if ( index > -1 ) {
                        popped = this.selection.splice(index, 1);
                        this.$emit('deleted', popped);
                        this.$emit('input', [...this.selection]);
                    }
                } else {
                    popped = this.selection;
                    this.selection = null;
                    this.$emit('input', this.selection);
                }

                // Keep the selection text if prop is set to true
                if ( popped && popped.length && this.keepTextOnDelete ) {
                    this.lookup_name = this.getSelectionLabel(popped[0]);
                }

                // resetting focused to force watcher to fire in the nextTick
                this.focused = false;
                this.$nextTick(() => {
                    this.setFocus();
                });
            },

            backspace() {
                if ( this.lookup_name == '' ) {
                    if ( this.has_selections && this.is_multiple ) {
                        const child = this.$refs.selections && this.$refs.selections.children[this.selection.length - 1];
                        if ( child ) {
                            child.focus();
                        }
                    } else {
                        this.clear(true);
                    }
                }
            },

            selectionValue() {
                if ( this.is_multiple ) {
                    return [...this.selection];
                }

                return this.selection.length ? this.selection[0] : '';
            },

            selectItem(index, e) {
                this.handleSelectEvent(e);

                if ( this.taggable && index == -1 && this.lookup_name.length ) {
                    this.tagSelection();
                    return;
                } else if ( !this.list[index] && !this.selected_empty ) {
                    return;
                }

                this.selected_index = index;

                if ( this.selected_empty ) {
                    this.$emit('selected-empty', true);
                    this.focused = false;
                } else {
                    this.addSelection(this.getSelectedItem());
                    this.$emit('input', this.selectionValue());
                }

                // Reset the input and list
                this.lookup_name = '';
                this.list = [];

                // With min search 0 a multiple select opens the search right back up
                if ( this.minSearch == 0 && this.is_multiple ) {
                    this.startSearch();
                }

                if ( !this.is_multiple && e && 'type' in e && e.type == 'click' ) {
                    // A click on a selection can leave the list open for another selection,
                    // so act as if the field is not focused
                    this.focused = false;
                }
            },

            /**
             * Add a selection into the array of selections
             *
             * @param {*} selection
             */
            addSelection(selection) {
                if ( !this.selection ) {
                    this.selection = [];
                }

                if ( !this.is_multiple ) {
                    this.selection = [];
                }

                // Prevent duplicate adds
                if ( selection !== null && typeof selection !== 'undefined' && this.selection.indexOf(selection) === -1 ) {
                    this.selection.push(selection);
                }
            },

            /**
             * Returns the current selection
             */
            getSelection() {
                return this.selection;
            },

            /**
             * Return the label for the selected item
             *
             * @param s
             * @returns {*}
             */
            getSelectionLabel(s) {
                if ( s instanceof Object ) {
                    return object_get(s, this.selectionKey);
                }

                return s;
            },

            editSelection() {
                if ( this.lookup_name == '' && !this.is_multiple && this.has_selections ) {
                    this.lookup_name = this.getSelectionLabel(this.selection[0]);
                    this.selection = [];
                    this.$emit('input', '');

                    this.$nextTick(() => {
                        this.setFocus('lookup');
                    });
                }
            },

            tagSelection() {
                const tag = this.lookup_name;
                if ( !this.selection ) {
                    this.selection = [];
                }

                this.selection.push(tag);
                this.lookup_name = '';
                this.$emit('tag-created', tag);
                this.$emit('input', this.selectionValue());
            },

            refreshSelection() {
                if ( !this.value ) {
                    this.selection = [];
                } else if ( this.is_multiple && Array.isArray(this.value) ) {
                    this.selection = [...this.value];
                } else if ( !this.selection || !this.is_multiple ) {
                    this.selection = [this.value];
                } else if ( this.selection.indexOf(this.value) === -1 ) {
                    this.selection = [...this.selection, this.value];
                }
            }
        },

        watch: {
            lookup_name(newVal, oldVal) {
                if ( newVal != oldVal ) {
                    // When the lookup name changes we trigger the run lookup
                    if ( !this.has_selections || this.is_multiple ) {
                        this.startSearch();
                    }
                }
            },

            items() {
                // Clear the cache if the items are changed
                this.clearCache();
            },

            itemFilter() {
                this.filter = this.itemFilter || this.selectionKey;
            },

            list() {
                // Auto select when 1 element is available
                if ( this.taggable && this.list.length == 1 ) {
                    const typed_name = String(this.lookup_name).toLowerCase();
                    const list_name = String(this.getSelectionLabel(this.getItemByIndex(0))).toLowerCase();

                    // Only auto select when the typed name matches the first element
                    if ( typed_name === list_name ) {
                        this.selected_index = 0;
                    }
                } else if ( this.list.length > 0 ) {
                    this.selected_empty = false;
                }
            },

            focused() {
                if ( this.focused && this.minSearch == 0 && this.lookup_name.length == 0 ) {
                    if ( !this.has_selections || this.is_multiple ) {
                        this.startSearch();
                    }
                }
            },

            show_list() {
                if ( this.show_list ) {
                    this.$nextTick(() => this.startDropdown(this.$el, this.$refs.dropdown));
                    return;
                }

                // Reset the list when its closed
                this.stopDropdown();
                this.resetList();
            },

            value() {
                this.refreshSelection();
            }
        },

        components: {
            KsLoaderLine
        }
    }
</script>
