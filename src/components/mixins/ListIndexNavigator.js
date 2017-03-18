import {object_get} from '../../helpers/objects';
import {escapeRegExp} from '../../helpers/strings';

export default {

	props: {
		// If true the list will be cached by term
		cacheResults: {
			type: Boolean,
			default: true
		},
		// If true run search will be called as the list reaches the end
		paginated: {
			type: Boolean,
			default: false
		},
		// The threshold to start the pagination request
		paginateThreshold: {
			type: Number,
			default: 3
		},
		// The minimum length needed to fire a search/filter
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
        /**
		 * Returns the filter used against the list
		 *
         * @returns {function(*=)}
         */
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

        /**
		 * This is the index of the last item in the list
		 *
         * @returns {number}
         */
		last_index() {
			return this.list.length -1;
		},
	},

	methods: {

        /**
		 * Move the selection up
         */
		selectUp() {
			let index = this.selected_index - 1;
			if ( !(index < 0) ) {
				this.selected_index -= 1;
			}
		},

        /**
		 * Move the selection down
         */
		selectDown() {
			let index = this.selected_index + 1;

			if ( index <= this.last_index ) {
				this.selected_index += 1;
			}
		},

        /**
		 * Retrieves the item at the current selected index
		 *
         * @returns {*}
         */
		getSelectedItem() {
			return this.getItemByIndex(this.selected_index);
		},

        /**
		 * Retrieves an item by index
		 *
         * @param index
         * @returns {*}
         */
		getItemByIndex(index) {
			index = parseInt(index);

			if ( this.list.length > index ) {
				return this.list[index];
			}

			return null;
		},

        /**
		 * Sets focus to the passed reference and fires event
		 *
         * @param ref
         */
		setFocus(ref) {
			this.$refs[ref].focus();
			this.$emit('focus');
		},

        /**
		 * Looks for the term in the cache
		 *
         * @param term
         * @returns {boolean}
         */
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

        /**
		 * Emits the search event with the given lookup name and attaches the new results
		 *
         * @param concat
         */
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

        /**
		 * Runs the filter for the given lookup text
         */
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

        /**
		 * Begins the execution of a search from the user
		 * this is triggered before runSearch or runFilter
         */
		startSearch() {
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

        /**
		 * Resets the scroll of the given reference
		 *
         * @param ref
         */
		resetList(ref) {
			this.$refs[ref].scrollTop = 0;
		},

        /**
		 * Auto scrolls the the list based on the offset of the items
		 * takes a direction for scrolling down or up
		 *
         * @param direction
         */
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

        /**
		 * Runs the next page when applicable (at the end of the list)
		 *
         * @param index
         */
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
        /**
		 * Watch the selected index in order to run the next page or to autoScroll
		 *
         * @param newVal
         * @param oldVal
         */
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
