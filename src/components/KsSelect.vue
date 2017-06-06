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
    >
		<input type="hidden" :name="name" :value="value">
		<div class="ks-select-selection" @click.prevent="toggleOpen">
			<div class="ks-select-placeholder" v-if="!value">{{placeholder}}</div>
			<template v-else>
				{{selected}}
			</template>
            <span class="ks-select-deselect" v-if="showDeselect" @click.prevent.stop="clearSelection()">x</span>
            <span class="ks-select-arrow"></span>
		</div>

		<div class="ks-select-dropdown" v-show="isOpen">
			<!-- Lookup field-->
			<div class="ks-select-dropdown-input" v-show="show_search">
				<input
					type="text"
					autocomplete="off"
					ref="lookup"
					v-model="lookup_name"
				    :placeholder="placeholder"
					@keyup.esc="clear"
					:class="{ 'is-multiple': multiple }"
				>
			</div>

            <!-- Loading indicator -->
            <div style="position: relative; height: 5px;margin-top: -5px;">
                <loader-line :show="loading" :absolute="true"></loader-line>
            </div>

			<!-- Autocomplete list-->
			<ul
				ref="list"
				class="autocomplete-list"
				:style="'max-height:'+this.listHeight"
			>
				<template v-if="groupBy">
					<li v-for="(group_list, group) in groups">
						<strong class="opt-group">{{group}}</strong>
						<ul>
							<li
								v-for="(item, index) in group_list"
								:class="{ 'selected-item': item._index == selected_index }"
								@click.prevent="selectItem(item._index, $event)"
								@mouseover="setHoverIndex(item._index)"
							>
								<!-- Scoped slot -->
								<slot :item="item">{{item[this.labelKey]}}</slot>
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
						<!-- Scoped slot -->
						<slot :item="item">{{item[this.labelKey]}}</slot>
					</li>
				</template>
			</ul>
		</div>
	</div>
</template>


<script>

	import KsAutocomplete from './KsAutocomplete.vue';
	import ListIndexNavigatior from './mixins/ListIndexNavigator';
	import LoaderLine from './KsLoaderLine.vue';
	import {object_get} from '../helpers/objects';

	export default {
		name: 'KsSelect',

		mixins: [ListIndexNavigatior],

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
            }
		},

		data () {
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
                needs_new_search: true
			};
		},

		computed: {
			using_items() {
				return this.items ? true : false;
			},

			binds_objects() {
				// Try to determine what type of value the consumer expects
				// If they don't provide a value then we will assume they want objects
				if ( null === this.value || typeof this.value === "undefined" ) {
					return true;
				}

				// We will
				return typeof this.value !== 'object' ? false : true;
			},
			show_search() {
				if ( this.disableSearch ) {
					return false;
				}

				if ( !this.items ) {
					return true;
				}

				if ( this.items.length > this.searchThreshold ) {
					return true;
				}

				return false;
			},
            showDeselect() {
                return !this.multiple && this.singleDeselect && this.selected ? true : false;
            }
		},

		mounted() {
			if ( !this.itemKey ) {
				this.keyName = this.name;
			}
			if ( !this.itemFilter ) {
				this.filter = this.labelKey;
			}

			if ( this.items ) {
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

		},

		methods: {
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
			    if ( !this.isOpen ) {
			        this.isOpen = true;
			        return;
                }

                this.selectItem(this.selected_index, e);
            },
            tabOpen(e) {
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
			blurred() {
				this.close();
			},
			open() {
				this.isOpen = true;
			},
			close() {
				this.isOpen = false;
			},

			selectItem(index, e) {
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
                if ( !item[this.keyName] ) {
                    console.log('Error: Could not find key: ' + this.keyName);
                }

                // Determine what value to emit
                if ( this.binds_objects ) {
                    this.$emit('input', item);
                } else {
                    this.$emit('input', item[this.keyName]);
                }

                // Reset the select to it starting state
                this.resetSelect();
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
					this.selected = object_get(this.value, this.labelKey);
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
			value() {
				this.refreshSelected();
				if ( !this.value ) {
					this.close();
				}
			},
			items() {
				if ( this.items && this.items.length ) {
					this.list = this.items;
					this.refreshSelected();
					this.clearCache();
				}
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
