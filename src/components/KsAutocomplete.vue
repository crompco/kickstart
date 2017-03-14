<template>
	<div class="autocomplete-holder" style="position: relative;">
		<span class="selection" v-if="has_selections">
			<span v-for="s in selection" class="selection-text">
				{{s}}
				<a href="#" @click.prevent="clearSelection(s)" class="clear-selection">X</a>
			</span>
		</span>
		<input
			v-show="!selection || multiple"
			type="text"
			name="pet"
			:placeholder="placeholder"
			v-model="lookup_name"
			ref="lookup"
			@keyup.esc="clear"
			@keydown.tab.prevent="selectItem(selected_index)"
			@keydown.enter.prevent="selectItem(selected_index)"
			@keydown.down.prevent="selectDown()"
			@keydown.up.prevent="selectUp()"
		>
		<ul class="autocomplete-list" v-show="lookup_name.length > 0">
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
			}
		},

		data() {
			return {
				lookup_name: '',
				selected_index: 0,
				selection: null,
				timer: '',
				list: [],
				loading: false
			};
		},

		computed: {
			has_selections() {
				if ( this.selection && this.selection.length ) {
					return true;
				}

				return false;
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
			runSearch() {
				console.log('running search');
				this.loading = true;
				this.$emit('search', {
					term: this.lookup_name,
					callback: (list) => {
						this.loading = false;
						this.selected_index = 0;
						this.list = list;
					}
				});
			},
			runFilter() {
				console.log('running filter');
				let name_regex = new RegExp('^.*' + escapeRegExp(this.lookup_name) + '.*', 'i');
				this.loading = true;
				this.list = this.items.filter((item) => {
					return object_get(item, this.selectionKey, '').match(name_regex) ? true : false;
				});
				this.loading = false;
			},
			clear() {
				this.lookup_name = '';
				this.$emit('clear');
			},
			setFocus() {
				this.$refs.lookup.focus();
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
			},
			selectDown() {
				var index = this.selected_index + 1;
				if ( index < this.list.length ) {
					this.selected_index += 1;
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
					this.runSearch();
				}, this.delay);
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

				.img, .img-label {
					display: inline-block;
					vertical-align: middle;
				}


				.img {
					width: 60px;
					height: 50px;
					overflow: hidden;
					position: relative;
					img, .empty-img {
						height: 50px;
						width: auto;
					}
					.empty-img {
						background: #CCC;
						line-height: 50px;
						text-align: center;
						.icon-camera {
							color: #444;
						}
					}
					img {
						position: absolute;
						top: 50%;
						left: 50%;
						// @include translate(-50%, -50%);
						//transform: translate(-50%, -50%);
					}
				}
				.img-label {
					padding-left: 0.25em;
				}
			}
		}
	}
</style>
