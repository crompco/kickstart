<template>
	<div class="ks-select">
		<input type="hidden" :name="name" :value="value">
		<div class="ks-select-selection" @click.prevent="toggleOpen">
			<div class="ks-select-placeholder" v-if="!value">{{placeholder}}</div>
			<template v-else>
				{{selected}}
			</template>
		</div>

		<div class="ks-select-dropdown" v-show="isOpen">
			<!-- Lookup field-->
			<div class="ks-select-dropdown-input" v-show="show_search">
				<input
					type="text"
					ref="lookup"
					v-model="lookup_name"
				    :placeholder="placeholder"
					@keyup.esc="clear"
					@keydown.backspace="backspace"
					@keydown.tab="selectItem(selected_index)"
					@keydown.enter.prevent="selectItem(selected_index)"
					@keydown.down.prevent="selectDown()"
					@keydown.up.prevent="selectUp()"
					:class="{ 'is-multiple': multiple }"
				>
			</div>

			<!-- Autocomplete list-->
			<ul
				ref="list"
				class="autocomplete-list"
				:style="'max-height:'+this.listHeight"
			>
				<li style="padding: 0; margin: 0;border:0;" v-if="!list.length">
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
	</div>
</template>


<script>

	import KsAutocomplete from './KsAutocomplete.vue';
	import ListIndexNavigatior from './mixins/ListIndexNavigator';
	import LoaderLine from './KsLoaderLine.vue';

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
			itemFilter: {},
			itemKey: String,
			items: {
				type: Array,
				default: null
			},
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
				selected: '',
				startIndex: 0,
				selected_index: 0,
				keyName: this.itemKey,
				filter: this.itemFilter,
				isOpen: false,
			};
		},

		computed: {
			using_items() {
				return this.items ? true : false;
			},
			show_search() {
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
		},

		methods: {
			toggleOpen() {
				this.isOpen = !this.isOpen;
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

			selectItem(i) {
				let item = this.getItemByIndex(i);
				if ( !item[this.keyName] ) {
					console.log('Error: Could not find key: ' + this.keyName);
				}
				this.$emit('input', item[this.keyName]);

				this.resetList('list');
				this.selected_index = 0;
				this.close();
			},

			clear() {
				this.lookup_name = '';
				this.close();
			},

			backspace() {

			},

			refreshSelected() {
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
				this.runLookup();
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
				}
			},
			isOpen(open, oldOpen) {
				if ( open ) {
					this.$nextTick(() => {
						this.setFocus('lookup');
						if ( oldOpen != open ) {
							this.runLookup();
						}
					});
				} else {
				}
			}
		},

		components: {
			KsAutocomplete,
			LoaderLine
		}
	}
</script>
