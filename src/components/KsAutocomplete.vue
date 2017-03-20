<template>
	<div class="autocomplete-holder"
		 :class="{ 'is-selected': has_selections, 'is-multiple': is_multiple }" @click.prevent="setFocus('lookup')">

		<!-- Selections  -->
		<span class="selection" v-if="has_selections" @click.prevent="editSelection">
			<span v-for="s in selection" class="selection-text">
				{{getSelectionLabel(s)}}
				<a href="#" @click.prevent="clearSelection(s)" class="clear-selection">
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
			v-show="!selection || is_multiple"
			type="text"
			name="lookup_name"
			:placeholder="placeholder_txt"
			v-model="lookup_name"
			ref="lookup"
			@keyup.esc="clear"
			@keydown.backspace="backspace"
			@keydown.tab="selectItem(selected_index, $event)"
			@keydown.enter.prevent="selectItem(selected_index)"
			@keydown.down.prevent="selectDown()"
			@keydown.up.prevent="selectUp()"
			:class="{ 'is-multiple': is_multiple }"
		>

		<!-- List -->
		<ul class="autocomplete-list"
		    v-show="show_list"
		    :style="'max-height:'+this.listHeight"
		    ref="list"
		>

			<li style="padding: 0; margin: 0;border:0;">
				<loader-line :show="loading" ></loader-line>
			</li>

			<li
				v-for="(item, index) in list"
				:class="{ 'selected-item': index == selected_index }"
				@click.prevent="selectItem(index, $event)"
			>
				<!-- Scoped slot -->
				<slot :item="item"></slot>
			</li>
		</ul>
	</div>
</template>

<script>
	// Internal
	import LoaderLine from './KsLoaderLine.vue';
	import {addEvent, keyCode} from '../helpers/events';
    import {object_get} from '../helpers/objects';
    import ListIndexNavigatior from './mixins/ListIndexNavigator';


	// External
	import Vue from 'vue';
	Vue.config.keyCodes['backspace'] = 8;

	export default {
		name: 'KsAutocomplete',

		mixins: [ListIndexNavigatior],

		props: {
			items: {
				type: Array,
				default() {
					return null;
				}
			},
			placeholder: {
				default: 'Lookup ...'
			},
			delay: {
				type: Number,
				default: 100
			},
			selectionKey: {
				type: String,
				default: null
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
			this.$nextTick(() => {
			    this.initListNavigation({
					lookup: 'lookup',
					list: 'list'
				});
			});
		},

		methods: {

			clearSelection(s) {
				if ( this.is_multiple ) {
					let index = this.selection.indexOf(s);
					this.selection.splice(index, 1);
				} else {
					this.selection = null;
					this.$nextTick(() => {
						this.setFocus('lookup');
					});
				}
			},

			backspace() {
				if ( this.lookup_name == '' ) {
					if ( this.has_selections && this.is_multiple ) {
						let popped = this.selection.pop();
						this.$emit('deleted', popped);
					}
				}
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
				this.$emit('selected', selection);
				if ( this.selectionKey ) {
					this.addSelection(selection);
				}

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
			        this.selection = null;

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
            }
		},

		watch: {
			lookup_name() {
			    // when the lookup name changes we trigger the run lookup
				this.startSearch();
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

			}
		},

		components: {
			LoaderLine
		}
	}
</script>
