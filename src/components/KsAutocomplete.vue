<template>
	<div class="autocomplete-holder"
		 :class="{ 'is-selected': has_selections, 'is-multiple': is_multiple }" @click.prevent="setFocus('lookup')">

		<!-- Selections  -->
		<span class="selection" v-if="has_selections" @click.prevent="editSelection">
			<span v-for="s in selection" class="selection-text">
				{{s}}
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
				@click.prevent="selectItem(index)"
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
			closeOnBlur: {
				type: Boolean,
				default: true
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
			taggable: {
			    type: Boolean,
				default: false
			}
		},

		data() {
			return {
				focused: false,
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
				return this.lookup_name.length >= this.minSearch;
			},
			is_multiple() {
			    return this.taggable || this.multiple;
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
				this.filter = this.labelKey;
			}
			this.$nextTick(() => {
				if ( this.focus ) {
					this.setFocus('lookup');
				}

				addEvent(this.$refs.lookup, 'blur', () => {
					setTimeout(() => {
						this.$emit('blur');
						if ( this.closeOnBlur ) {
							this.clear();
						}
					}, 200);
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

			clear() {
				this.lookup_name = '';
				this.list = [];
				this.$emit('clear');
			},

			backspace() {
				if ( this.lookup_name == '' ) {
					if ( this.has_selections && this.is_multiple ) {
						this.selection.pop();
					}
				}
			},

			selectItem(index, e) {
				if ( e && keyCode(e) == 9 ) {
			        if ( e.shiftKey ) {
						this.clear();
						return;
					}
					if ( this.is_multiple ) {
			            e.preventDefault();
					}
				}

                if ( this.taggable && index == -1 && this.lookup_name.length ) {
                    this.tagSelection();
                    return;
                } else if ( !this.list[index] ) {
                    return;
                }

				this.selected_index = index;
				this.$emit('selected', this.list[this.selected_index]);
				this.lookup_name = '';
				if ( this.selectionKey ) {
					this.addSelection();
				}
				this.list = [];
			},

			addSelection() {
				if ( !this.selection ) {
					this.selection  = [];
				}
				this.selection.push(object_get(this.list[this.selected_index], this.selectionKey));
			},

            editSelection() {
			    if ( this.lookup_name == '' && !this.is_multiple ) {
			        this.lookup_name = this.selection;
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
			        this.selected_index = 0;
				}
			}
		},

		components: {
			LoaderLine
		}
	}
</script>
