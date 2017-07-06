<template>
	<div class="autocomplete-holder"
		 :class="{ 'is-selected': has_selections, 'is-multiple': is_multiple }"
		 @click.prevent="setFocus('lookup')"
	     tabindex="-1"
	>

		<!-- Selections  -->
		<span class="selection" v-if="selectionKey && has_selections" @click.prevent="editSelection" ref="selections">
			<span v-for="s in selection" class="selection-text" tabindex="0" @keyup.delete.prevent.stop="clearSelection(s)">
				{{getSelectionLabel(s)}}
				<a href="#" @click.prevent.stop="clearSelection(s)" class="clear-selection" tabindex="-1">
					<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="close" fill="#000000">
								<polygon id="Combined-Shape" points="10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644"></polygon>
							</g>
						</g>
					</svg>
				</a>
			</span>
		</span>

		<!-- Lookup Field -->
		<input
			v-show="!has_selections || is_multiple"
			type="text"
			autocomplete="off"
			name="lookup_name"
			:placeholder="placeholder_txt"
			v-model="lookup_name"
			ref="lookup"
			@keyup.esc="clear"
			@keyup.8="backspace"
			@keydown.tab="selectItem(selected_index, $event)"
			@keydown.enter.prevent="selectItem(selected_index)"
			@keydown.down.prevent="selectDown()"
			@keydown.up.prevent="selectUp()"
		>

		<!-- List -->
		<div v-show="show_list" class="autocomplete-list-wrapper">
			<div class="searching-results">
				<loader-line :show="loading"></loader-line>
			</div>
			<ul class="autocomplete-list"
			    :style="'max-height:'+this.listHeight"
			    ref="list"
			>
				<li
					v-if="showTagInList && taggable && lookup_name"
					:class="{ 'selected-item': -1 == selected_index }"
                    @click="selectItem(-1, $event)"
				>
					Add "<em v-text="lookup_name"></em>"
				</li>
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
                                <slot :item="item">{{item[selectionKey]}}</slot>
                            </li>
                        </ul>
                    </li>
                </template>
                <template v-else>
                    <li
                        v-for="(item, index) in list"
                        :class="{ 'selected-item': index == selected_index }"
                        @click.prevent="selectItem(index, $event)"
                        @mouseover="setHoverIndex(index)"
                    >
                        <!-- Scoped slot -->
                        <slot :item="item">{{item[selectionKey]}}</slot>
                    </li>
                </template>
			</ul>
		</div>
	</div>
</template>

<script>
	// Internal
	import LoaderLine from './KsLoaderLine.vue';
	import {addEvent, keyCode} from '../helpers/events';
    import {object_get} from '../helpers/objects';
    import ListIndexNavigatior from './mixins/ListIndexNavigator';

	export default {
		name: 'KsAutocomplete',

		mixins: [ListIndexNavigatior],

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
            }
		},

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
				if ( this.selection && this.selection.length ) {
					return true;
				}

				return false;
			},
			placeholder_txt() {
				if ( this.has_selections ) {
					return '';
				}

				return this.placeholder;
			}
		},

		mounted() {
			if ( !this.itemFilter ) {
				this.filter = this.selectionKey;
			}
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
					let index = this.selection.indexOf(s);
                    if ( index > -1 ) {
                        popped = this.selection.splice(index, 1);
                        this.$emit('deleted', popped);
                        this.$emit('input', this.selection);
                    }
				} else {
				    popped = this.selection;
					this.selection = null;
					this.$emit('input', this.selection);
				}

				// Keep the selection text if prop is set to true
				if ( popped && this.keepTextOnDelete) {
                    this.lookup_name = this.getSelectionLabel(popped[0])
                }

                this.$nextTick(() => {
                    this.setFocus();
                });
			},

			backspace() {
				if ( this.lookup_name == '' ) {
					if ( this.has_selections && this.is_multiple ) {
                        let child = this.$refs.selections.children[this.selection.length-1];
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
					return this.selection;
				}

				return this.selection.length ? this.selection[0] : '';
			},

			selectItem(index, e) {
				this.handleSelectEvent(e);

                if ( this.taggable && index == -1 && this.lookup_name.length ) {
                    this.tagSelection();
                    return;
                } else if ( !this.list[index] ) {
                    return;
                }

				this.selected_index = index;
				let selection = this.getSelectedItem();
				this.addSelection(selection);

				// Emit input event
				this.$emit('input', this.selectionValue());

				// Reset the input and list
				this.lookup_name = '';
				this.list = [];

				// If min search is 0 then we need to open the search right back up
				if ( this.minSearch == 0 ) {
				    this.startSearch();
				}
			},

			/**
			 * Add a selection into the array of selections
			 *
			 * @param mixed selection
			 */
			addSelection(selection) {
				if ( !this.selection ) {
					this.selection  = [];
				}
				this.selection.push(selection);
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
			    if ( this.lookup_name == '' && !this.is_multiple ) {
			        this.lookup_name = this.getSelectionLabel(this.selection[0]);
			        this.selection = [];
			        this.$emit('input', '');

			        this.$nextTick(() => {
                        this.setFocus('lookup');
					});
				}
			},

			tagSelection() {
                let tag = this.lookup_name;
                if ( !this.selection ) {
                    this.selection  = [];
                }

                this.selection.push(tag);
                this.lookup_name = '';
				this.$emit('tag-created', tag);
				this.$emit('input', this.selectionValue());
            },

			refreshSelection() {
				if ( !this.value ) {
					this.selection  = [];
				} else {
					if ( this.is_multiple && this.value instanceof Array ) {
						this.selection = this.value;
					} else if ( !this.selection ) {
						this.selection = [this.value];
					} else {
						if ( -1 == this.selection.indexOf(this.value) ) {
							this.selection.push(this.value);
						}
					}
				}
			}
		},

		watch: {
			lookup_name(newVal, oldVal) {
				if ( newVal != oldVal ) {
				    // when the lookup name changes we trigger the run lookup
					this.startSearch();
				}
			},

			items() {
				// Clear the cache if the items are changed
				this.clearCache();
			},

			list() {
			    // Auto select when 1 element is available
			    if ( this.taggable && this.list.length == 1 ) {
			        let typed_name = String(this.lookup_name).toLowerCase();
			        let list_name = String(this.getSelectionLabel(this.getItemByIndex(0))).toLowerCase();

			        // Only auto select when the typed name matches the first element
			        if ( typed_name === list_name ) {
                        this.selected_index = 0;
					}
				}
			},

			focused() {
			    if ( this.focused && this.minSearch == 0 && this.lookup_name.length == 0 ) {
			        this.startSearch();
				}
			},

			show_list() {
				// Reset the list when its closed
				if ( !this.show_list ) {
					this.resetList();
				}
			},

			value() {
				this.refreshSelection();
			}
		},

		components: {
			LoaderLine
		}
	}
</script>
