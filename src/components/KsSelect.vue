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
					@keydown.backspace="backspace"

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
				<li
					v-for="(item, index) in list"
					:class="{ 'selected-item': index == selected_index }"
					@click.prevent="selectItem(index)"
					@mouseover="setHoverIndex(index)"

				>
					<!-- Scoped slot -->
					<slot :item="item"></slot>
				</li>
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
		},

		data () {
			return {
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

            value_index() {
			    // This currently only works properly with the
                //&& this.using_items
			    if ( this.value && !this.multiple ) {
			        if ( this.binds_objects ) {
			            return this.list.indexOf(this.value);
                    }

                    // When not using objects we need to iterate over the list to determine the values index
                    for ( var i in this.list ) {
			            if ( this.list[i][this.keyName] == this.value ) {
			                return i;
                        }
                    }
                }

                return -1;
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

				let item = this.getItemByIndex(index);
				if ( !item[this.keyName] ) {
					console.log('Error: Could not find key: ' + this.keyName);
				}

				if ( this.binds_objects ) {
					this.$emit('input', item);
				} else {
					this.$emit('input', item[this.keyName]);
				}

				this.resetList();
				this.selected_index = 0;
				this.lookup_name = '';
				this.close();
				this.$el.focus();
			},

			backspace() {

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
						    if ( this.list.length == 0 || this.needs_new_search ) {
                                this.startSearch(this.value_index);
                                this.needs_new_search = false;
                            } else {
						        this.selected_index = this.value_index;
                                this.initListScrollTo(this.selected_index);
                            }
						}
					});
                }
			},
            value_index() {
			    if ( this.value_index > 0 ) {
                    // updating the selected index
                    this.startIndex = this.value_index;
                } else {
			        this.startIndex = 0;
                }
            }
		},

		components: {
			KsAutocomplete,
			LoaderLine
		}
	}
</script>
