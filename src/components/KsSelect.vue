<template>
    <div
        class="ks-select"
        :class="{ 'ks-select-open': isOpen }"
        :tabindex="disabled ? -1 : 0"
        :disabled="disabled"
        @keydown.space.prevent.stop="open"
        @keydown.enter.prevent.stop="enterOpen"
        @keydown.tab="tabOpen"
        @keydown.down.prevent="openSelectDown"
        @keydown.up.prevent="openSelectUp"
        @keydown="keyOpen"
        @keyup.esc="close"
    >
        <input
            type="text"
            tabindex="-1"
            :name="name"
            :value="inputValue"
            class="select-input-field"
            @input="filledInput"
        >
        <div
            class="ks-select-selection"
            @click.prevent="toggleOpen"
        >
            <div
                v-if="!has_value"
                class="ks-select-placeholder"
            >{{ placeholder }}</div>
            <template v-else>
                <slot
                    name="label"
                    :value="value"
                    :label="selected"
                >
                    {{ selected }}
                </slot>
            </template>
            <span
                v-if="showDeselect"
                class="ks-select-deselect"
                @click.prevent.stop="clearSelection()"
            >x</span>
            <span class="ks-select-arrow"></span>
        </div>

        <div
            v-show="isOpen"
            ref="dropdown"
            class="ks-select-dropdown"
            :class="{ 'ks-select-dropdown-inverted': inverted }"
        >
            <!-- Lookup field-->
            <div
                v-show="show_search"
                class="ks-select-dropdown-input"
            >
                <input
                    ref="lookup"
                    v-model="lookup_name"
                    type="text"
                    autocomplete="new-password"
                    :placeholder="placeholder"
                    :class="{ 'is-multiple': multiple }"
                    @keyup.esc.stop="clear"
                    @keydown.space.stop
                >
            </div>

            <!-- Loading indicator -->
            <div style="position: relative; height: 5px;margin-top: -5px;">
                <ks-loader-line
                    :show="loading"
                    :absolute="true"
                ></ks-loader-line>
            </div>

            <!-- Autocomplete list-->
            <div class="ks-select-list">
                <ul
                    ref="list"
                    class="ks-autocomplete-list"
                    :class="{'inverted': inverted}"
                    :style="list_style"
                >
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
                                    <slot :item="item">{{ item[labelKey] }}</slot>
                                </li>
                            </ul>
                        </li>
                    </template>
                    <template v-else>
                        <li
                            v-for="(item, index) in list"
                            :key="index"
                            :class="{ 'ks-selected-item': index == selected_index }"
                            @click.prevent="selectItem(index)"
                            @mouseover="setHoverIndex(index)"
                        >
                            <!-- Scoped slot  that defaults to the labelKey-->
                            <slot :item="item">{{ item[labelKey] }}</slot>
                        </li>
                    </template>
                    <!-- Slot for empty search results-->
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
                        class="ks-empty-list-message ks-active-empty-list-message"
                        :class="{ 'ks-selected-item': selected_empty }"
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
    </div>
</template>


<script>
    import ListIndexNavigator from './mixins/ListIndexNavigator';
    import FloatingDropdown from './mixins/FloatingDropdown';
    import KsLoaderLine from './KsLoaderLine.vue';
    import { object_get } from '../helpers/objects';

    function isEmpty(value) {
        return value === null || typeof value === 'undefined' || value === '';
    }

    export default {
        name: 'KsSelect',

        mixins: [ListIndexNavigator, FloatingDropdown],

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
            // No longer used: the dropdown flips above the select when there is no room below
            invertOffsetRatio: {
                type: Number,
                default: .75
            }
        },

        emits: ['input', 'deleted', 'selected-empty', 'clear', 'blur', 'focus', 'search'],

        computed: {
            keyName() {
                return this.itemKey || this.name;
            },

            has_value() {
                return !isEmpty(this.value);
            },

            inputValue() {
                if ( this.value instanceof Object ) {
                    return this.keyName in this.value ? this.value[this.keyName] : this.value;
                }

                return this.value;
            },

            using_items() {
                return !!this.items;
            },

            binds_objects() {
                if ( this.forceValues ) {
                    return false;
                }

                // Without a value assume the consumer wants objects
                if ( this.forceObjects || null === this.value || typeof this.value === "undefined" ) {
                    return true;
                }

                return typeof this.value === 'object';
            },
            show_search() {
                if ( this.disableSearch ) {
                    return false;
                }

                if ( !this.items || this.paginated ) {
                    return true;
                }

                return this.items.length > this.searchThreshold;
            },
            showDeselect() {
                if ( this.multiple ) {
                    return false;
                }

                return this.singleDeselect && !isEmpty(this.inputValue);
            },
            list_style() {
                return {
                    'max-height': this.listHeight,
                };
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
                isOpen: false,
                needs_new_search: true,
            };
        },

        mounted() {
            this.filter = this.itemFilter || this.labelKey;

            if ( Array.isArray(this.items) ) {
                this.list = this.items;
            }

            this.$nextTick(() => {
                this.refreshSelected();

                this.initListNavigation({
                    lookup: 'lookup',
                    list: 'list',
                });
            });
        },

        methods: {
            filledInput(e) {
                const index = this.list.findIndex(item => item && this.keyName in item && e.target.value == item[this.keyName]);

                if ( index !== -1 ) {
                    this.selectItem(index, e, false);
                }
            },
            /**
             * Clear the lookup and close the list
             */
            clear() {
                this.resetList();
                this.lookup_name = '';

                if ( this.$refs[this.ref_lookup] === document.activeElement ) {
                    this.$refs[this.ref_lookup].blur();
                }
                this.isOpen = false;
                this.$emit('clear');
            },

            clearSelection(s = null) {
                let popped = null;

                if ( this.multiple && Array.isArray(this.selected) ) {
                    const index = this.selected.indexOf(s);
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
                const keycode = e.keyCode;
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
            open() {
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

                // Index -1 clears the selection; only single deselect gets there
                if ( index == -1 ) {
                    this.clearSelection();
                    return this.resetSelect();
                }

                if ( this.selected_empty ) {
                    this.$emit('selected-empty', true);
                } else {
                    const item = this.getItemByIndex(index);
                    if ( item === null ) {
                        return;
                    }

                    if ( !(this.keyName in item) ) {
                        console.error('KsSelect: Could not find key: ' + this.keyName, item);
                    }

                    this.$emit('input', this.binds_objects ? item : item[this.keyName]);
                }

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
                if ( !this.has_value ) {
                    this.selected = '';
                    return;
                }

                if ( this.binds_objects ) {
                    this.selected = object_get(this.value, this.labelKey, null);
                } else {
                    const item = this.list.find(item => item && item[this.keyName] == this.value);
                    this.selected = item ? object_get(item, this.labelKey, null) : null;
                }

                // Without a label in the list show the value itself
                if ( null === this.selected ) {
                    if ( !this.binds_objects ) {
                        this.selected = this.value;
                    } else {
                        console.error(`KsSelect Invalid label '${this.labelKey}'. Could not find label key in selected`);
                    }
                }
            },

            value_index() {
                if ( this.has_value && !this.multiple ) {
                    if ( this.binds_objects ) {
                        return this.list.indexOf(this.value);
                    }

                    return this.list.findIndex(item => item && item[this.keyName] == this.value);
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
                if ( this.list.length > 0 ) {
                    this.selected_empty = false;
                }
            },
            value() {
                this.refreshSelected();
                if ( !this.has_value ) {
                    this.close();
                }
            },
            items() {
                this.list = Array.isArray(this.items) ? this.items : [];
                this.clearCache();
                this.refreshSelected();
                this.selected_empty = false;
            },
            itemFilter() {
                this.filter = this.itemFilter || this.labelKey;
            },
            isOpen(open, oldOpen) {
                if ( !open ) {
                    this.stopDropdown();
                    return;
                }

                this.$nextTick(() => {
                    this.startDropdown(this.$el, this.$refs.dropdown);
                    this.setFocus('lookup');

                    if ( oldOpen != open ) {
                        // Only search again when the list is empty or the lookup changed
                        const value_index = this.value_index();
                        if ( this.list.length == 0 || this.needs_new_search ) {
                            this.startSearch(value_index);
                            this.needs_new_search = false;
                        } else {
                            this.selected_index = value_index;
                            this.initListScrollTo(this.selected_index);
                        }
                    }
                });
            },
        },

        components: {
            KsLoaderLine
        }
    }
</script>
