import {object_get} from '../../helpers/objects';
import {escapeRegExp} from '../../helpers/strings';

export default {

	props: {
		cacheResults: {
			type: Boolean,
			default: true
		},
		paginated: {
			type: Boolean,
			default: false
		},
		paginateThreshold: {
			type: Number,
			default: 3
		},
		focus: {
			type: Boolean,
			default: false
		},
		minSearch: {
			type: Number,
			default: 1
		},
	},

	data() {
		return {
			loading: false,
			lookup_name: '',
			list: [],
			startIndex: -1,
			selected_index: -1,
			cache: {},
			page: 1,
			last_page: null,
		};
	},

	computed: {
		filter_function() {
			let name_regex = new RegExp('^.*' + escapeRegExp(''+this.lookup_name) + '.*', 'i');

			let filter = this.filter;
			if ( !filter && this.selectionKey ) {
				filter = this.selectionKey;
			}
			if ( typeof filter == 'function' ) {
				return filter;
			}

			return (item) => {
				return object_get(item, filter, '').match(name_regex) ? true : false;
			};
		},
		last_index() {
			return this.list.length -1;
		},
	},

	methods: {

		selectUp() {
			let index = this.selected_index - 1;
			if ( !(index < 0) ) {
				this.selected_index -= 1;
			}
		},

		selectDown() {
			let index = this.selected_index + 1;

			if ( index <= this.last_index ) {
				this.selected_index += 1;
			}
		},

		getSelectedItem() {
			if ( !this.list[this.selected_index] ) {
				return null;
			}

			return this.list[this.selected_index];
		},

		getItemByIndex(index) {
			index = parseInt(index);

			if ( this.list.length > index ) {
				return this.list[index];
			}

			return null;
		},

		setFocus(ref) {
			this.$refs[ref].focus();
			this.$emit('focus');
		},

		findCache(term) {
			if ( !this.cacheResults ) {
				return false;
			}

			if ( this.page in this.cache ) {
				if ( term in this.cache[this.page] ) {
					this.selected_index = this.startIndex;
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
						this.selected_index = this.startIndex;
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

			this.loading = true;

			if ( !this.lookup_name ) {
				this.list = this.items;
			} else {
				this.list = this.items.filter(this.filter_function);
				this.cache[this.lookup_name] = this.list;
			}

			this.loading = false;
		},

		runLookup() {
			this.selected_index = this.startIndex;
			if ( this.lookup_name.length < this.minSearch ) {
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

		resetList(ref) {
			this.$refs[ref].scrollTop = 0;

		},

		autoScroll(direction) {
			let li = this.$refs.list.getElementsByClassName('selected-item')[0];
			if ( !li ) {
				return;
			}
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
		},

		runNextPage(index) {
			if ( this.last_index - this.paginateThreshold <= index ) {
				if ( !(parseInt(this.last_page || 0) > 0)) {
					this.page++;
					this.runSearch(true)
				}
			}
		},
	},

	watch: {
		selected_index(newVal, oldVal) {
			if ( this.paginated ) {
				this.runNextPage(this.selected_index);
			}

			// Auto scroll
			if ( this.list.length > 0 && newVal != oldVal ) {
				this.$nextTick(() => {
                    this.autoScroll(newVal > oldVal ? 'down' : 'up');
				});
			}
		}
	}
}
