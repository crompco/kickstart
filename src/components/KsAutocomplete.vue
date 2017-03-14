<template>
	<div class="autocomplete-holder">

		<!-- Selections  -->
		<span class="selection" v-if="has_selections">
			<span v-for="s in selection" class="selection-text">
				{{s}}
				<a href="#" @click.prevent="clearSelection(s)" class="clear-selection">X</a>
			</span>
		</span>

		<!-- Lookup Field -->
		<input
			v-show="!selection || multiple"
			type="text"
			name="pet"
			:placeholder="placeholder_txt"
			v-model="lookup_name"
			ref="lookup"
			@keyup.esc="clear"
			@keyup.backspace="backspace"
			@keydown.tab.prevent="selectItem(selected_index)"
			@keydown.enter.prevent="selectItem(selected_index)"
			@keydown.down.prevent="selectDown()"
			@keydown.up.prevent="selectUp()"
		>

		<!-- List -->
		<ul class="autocomplete-list"
		    v-show="lookup_name.length > 0"
		    :style="'max-height:'+this.listHeight"
		    ref="list"
		>

			<li style="height: 5px; padding: 0; margin: 0;border:0;">
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
	import LoaderLine from './KsLoaderLine.vue';
	import {object_get} from '../helpers/objects';
	import {escapeRegExp} from '../helpers/strings';
	import Vue from 'vue';
	Vue.config.keyCodes['backspace'] = 8;

	export default {
		name: 'KsAutocomplete',

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
			focus: {
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
			multiple: {
				type: Boolean,
				default: false
			},
			cacheResults: {
				Boolean,
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
			}
		},

		data() {
			return {
				lookup_name: '',
				selected_index: 0,
				selection: null,
				timer: '',
				list: [],
				loading: false,
				cache: {},
				page: 1,
				last_page: null
			};
		},

		computed: {
			has_selections() {
				if ( this.selection && this.selection.length ) {
					return true;
				}

				return false;
			},
			last_index() {
				return this.list.length -1;
			},
			placeholder_txt() {
				if ( this.has_selections ) {
					return '';
				}

				return this.placeholder;
			}
		},

		mounted() {
			if ( this.focus ) {
				this.$nextTick(() => {
					this.setFocus();
				});
			}
		},

		methods: {

			clearSelection(s) {
				if ( this.multiple ) {
					let index = this.selection.indexOf(s);
					this.selection.splice(index, 1);
				} else {
					this.selection = null;
					this.$nextTick(() => {
						this.setFocus();
					});
				}
			},

			findCache(term) {
				if ( !this.cacheResults ) {
					return false;
				}

				if ( this.page in this.cache ) {
					if ( term in this.cache[this.page] ) {
						this.selected_index = 0;
						this.list = this.cache[this.page][term];
						return true;
					}
				}

				return false;
			},

			runSearch(concat = false) {
				if ( !concat && this.findCache(this.lookup_name) ) {
					return;
				}

				this.loading = true;
				let term = this.lookup_name;
				let page = this.page;
				this.$emit('search', {
					term,
					page,
					callback: (list) => {
						this.loading = false;
						if ( this.paginated && concat) {
							if ( list.length ) {
								this.list = this.list.concat(list);
							} else {
								this.last_page = this.page;
							}
						} else {
							this.selected_index = 0;
							this.cache[term] = list;
							this.list = list;
						}
					}
				});
			},

			runFilter() {
				if ( this.findCache(this.lookup_name) ) {
					return;
				}

				let name_regex = new RegExp('^.*' + escapeRegExp(this.lookup_name) + '.*', 'i');
				this.loading = true;
				this.list = this.items.filter((item) => {
					return object_get(item, this.selectionKey, '').match(name_regex) ? true : false;
				});
				this.cache[this.lookup_name] = this.list;
				this.loading = false;
			},

			clear() {
				this.lookup_name = '';
				this.$emit('clear');
			},

			setFocus() {
				this.$refs.lookup.focus();
			},

			backspace() {
				if ( this.lookup_name == '' ) {
					if ( this.has_selections && this.multiple ) {
						this.selection.pop();
					}
				}
			},

			selectItem(index) {
				if ( !this.list[index] ) {
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

			selectUp() {
				var index = this.selected_index - 1;
				if ( !(index < 0) ) {
					this.selected_index -= 1;
				}

				if ( this.list.length > 0 ) {
					this.$nextTick(() => {
						this.autoScroll('up');
					})
				}
			},

			selectDown() {
				var index = this.selected_index + 1;
				if ( index < this.list.length ) {
					this.selected_index += 1;
				}

				if ( this.list.length > 0 ) {
					this.$nextTick(() => {
						this.autoScroll('down');
					})
				}
			},

			autoScroll(direction) {
				let li = this.$refs.list.getElementsByClassName('selected-item')[0];
				let itemOffset = li.offsetTop;
				let itemHeight = li.offsetHeight;
				let scrollTop = this.$refs.list.scrollTop;
				let offsetHeight = this.$refs.list.offsetHeight;

				if ( direction == 'down' ) {
					if ( itemOffset+itemHeight >= scrollTop + offsetHeight) {
						this.$refs.list.scrollTop += itemHeight;
					}
				} else {
					if ( itemOffset-(itemHeight/2) <= scrollTop) {
						this.$refs.list.scrollTop -= itemHeight;
					}
				}
			}

		},

		watch: {

			lookup_name() {
				if ( this.lookup_name == '' ) {
					this.list = [];
					return;
				}

				if ( this.items ) {
					this.runFilter();
					return;
				}

				if ( this.timer ) {
					clearTimeout(this.timer);
				}

				this.timer = setTimeout(() => {
					// Reset page since the search term has changed
					this.page = 1;
					this.last_page = null;
					this.runSearch();
				}, this.delay);
			},

			selected_index() {
				if ( this.paginated ) {
					if ( this.last_index - this.paginateThreshold <= this.selected_index ) {
						if ( parseInt(this.last_page || 0) > 0) {
							return;
						}

						this.page++;
						this.runSearch(true)
					}
				}
			}

		},

		components: {
			LoaderLine
		}
	}
</script>

<style lang="scss">
	.autocomplete-holder {
		position: relative;

		> input {
			border: 0;
			outline: none;
			border-bottom: 1px solid #CCC;
		}

		.autocomplete-list {
			margin: 0;
			z-index: 100;
			padding: 0;
			width: 100%;
			background: #fff;
			position: absolute;
			list-style: none;
			border: solid 1px #CCC;
			border-top: 0;
			box-shadow: 0px 2px 5px #444;
		    overflow-y: scroll;
			> li {
				will-change: transform;
				transition: all 0.2s ease-in-out;
				padding: 0.25em 0.5em 0.25em 0.2em;
				border-bottom: solid 1px #CCC;
				&:last-child {
					border: 0;
				}
				&.selected-item {
					background: darkblue;
					color: #fff;
				}
				&:hover {
					background: blue;
					color: darken(darkblue, 10%);
				}

			}
		}
	}
</style>
