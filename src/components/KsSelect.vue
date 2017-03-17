<template>
	<div class="ks-select" @click="open">
		<input type="hidden" :name="name" :value="value">
		<div class="ks-select-selection" @click.prevent="toggleOpen">
			<div class="ks-select-placeholder" v-if="!value">{{placeholder}}</div>
			<template v-else>
				{{selected}}
			</template>
		</div>
		<ul class="ks-select-dropdown" v-show="isOpen">
			<li v-for="item in list">
				<slot :item="item"></slot>
			</li>
		</ul>
	</div>
</template>


<script>

	import KsAutocomplete from './KsAutocomplete.vue';

	export default {
		name: 'KsSelect',

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

			itemFilter: {},
			itemKey: String,
			items: {
				type: Array,
				default: null
			},
			cacheResults: {
				type: Boolean,
				default: false
			},
			paginated: {
				type: Boolean,
				default: false
			},
			paginateThreshold: {
				type: Number,
				default: 3
			},
			listHeight: {
				default: "250px"
			},
		},

		data() {
			return {
				list: [],
				selected: '',
				lastSelection: null,
				keyName: this.itemKey,
				filter: this.itemFilter,
				isOpen: false,
			};
		},

		computed: {},

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
			selectItem(item) {
				if ( !item[this.keyName] ) {
					console.log('Error: Could not find key: ' + this.keyName);
				}
				this.$emit('input', item[this.keyName]);
				this.close();
			},
			refreshSelected() {
				for ( var i in this.items ) {
					if ( this.items[i][this.keyName] == this.value ) {
						this.selected = this.items[i][this.labelKey];
						return;
					}
				}
			}
		},

		watch: {
			value() {
				this.refreshSelected();
				if ( !this.value ) {
					this.close();
				}
			},
			isOpen(open) {
				if ( open ) {

				} else {
				}
			}
		},

		components: {
			KsAutocomplete
		}
	}
</script>
