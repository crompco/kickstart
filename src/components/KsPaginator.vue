<template>
    <div class="pagination" v-show="total_pages > 1">

        <ul class="row">
            <li>
                <a href="#"
                   @click.prevent.stop="changePage(current_page-1)"
                   class="prev-page"
                >
                    &lt;
                </a>
            </li>

            <template v-if="show_lower_range">
                <li>
                    <a href="#"
                       @click.prevent.stop="changePage(first_page)"
                    >
                        {{first_page}}
                    </a>
                </li>
                <li class="dot-pages" v-if="pages[0] != first_page+1">
                    ...
                </li>
            </template>

            <li v-for="page in pages">
                <a href="#"
                   @click.prevent.stop="changePage(page)"
                   class="page-link"
                   :class="{ 'current-page': page == pagination.current_page }"
                >
                    {{page}}
                </a>
            </li>

            <template v-if="show_upper_range">
                <li class="dot-pages" v-if="pages[limit-1] != last_page-1">
                    ...
                </li>
                <li>
                    <a href="#"
                       @click.prevent.stop="changePage(last_page)"
                    >
                        {{last_page}}
                    </a>
                </li>
            </template>

            <li>
                <a href="#"
                   @click.prevent.stop="changePage(current_page+1)"
                   class="next-page"
                >
                    &gt;
                </a>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: 'KsPaginator',

        props: {
            limit: {
                type: Number,
                default: 5
            },
            routed: {
                type: Boolean,
                default: false
            },
            pageVar: {
                type: String,
                default: 'page'
            },
            pagination: {
                type: Object,
                default() {
                    return {
                        total_count: 0,
                        total_pages: 0,
                        current_page: 0,
                        limit: 10
                    }
                }
            }
        },

        computed: {
            current_page() {
                return this.pagination.current_page;
            },
            total_pages() {
                return this.pagination.total_pages;
            },
            first_page() {
                return 1;
            },
            is_first_page() {
                return this.current_page == this.first_page;
            },
            last_page() {
                return this.total_pages;
            },
            is_last_page() {
                return this.current_page == this.last_page;
            },
            more_than_limit() {
                return this.last_page > this.limit;
            },
            pages() {
                let pages = [];
                let chunk = Math.round(this.limit / 2);
                let start = this.current_page - chunk;

                while (start + this.limit > this.last_page) {
                    start--;
                }

                start = start < 0 ? 0 : start;


                let j = 0;
                for (var i = start; i < this.pagination.total_pages && j < this.limit; i++) {
                    pages.push(i + 1);
                    j++;
                }

                return pages;
            },
            show_upper_range() {
                return this.more_than_limit
                    && this.pages[this.limit - 1] < this.last_page;
            },
            show_lower_range() {
                return this.more_than_limit
                    && this.pages[0] > this.first_page;
            },
        },

        data() {
            return {}
        },

        methods: {
            changePage(page) {
                if (page <= 0 || page > this.last_page) {
                    return;
                }

                // If not router than wae just emit an event for the page change
                if (!this.routed) {
                    this.$emit('input', page);
                    return;
                }

                let query = this.$route.query;
                query[this.pageVar] = page;

                this.$router.push({
                    to: {
                        name: this.$route.name,
                    },
                    params: this.$route.params,
                    query
                })
            }
        },

        components: {}
    }
</script>
