<template>
    <div
        v-show="total_pages > 1"
        class="ks-paginator"
    >
        <ul class="row">
            <li>
                <a
                    href="#"
                    class="prev-page"
                    :class="{ 'disabled': is_first_page }"
                    @click.prevent.stop="goToPage(current_page - 1)"
                >
                    &lt;
                </a>
            </li>

            <template v-if="show_lower_range">
                <li>
                    <a
                        href="#"
                        @click.prevent.stop="goToPage(first_page)"
                    >
                        {{ first_page }}
                    </a>
                </li>
                <li
                    v-if="pages[0] != first_page + 1"
                    class="dot-pages"
                >
                    ...
                </li>
            </template>

            <li
                v-for="page in pages"
                :key="page"
            >
                <a
                    href="#"
                    class="page-link"
                    :class="{ 'current-page': page == current_page }"
                    @click.prevent.stop="goToPage(page)"
                >
                    {{ page }}
                </a>
            </li>

            <template v-if="show_upper_range">
                <li
                    v-if="pages[pages.length - 1] != last_page - 1"
                    class="dot-pages"
                >
                    ...
                </li>
                <li>
                    <a
                        href="#"
                        @click.prevent.stop="goToPage(last_page)"
                    >
                        {{ last_page }}
                    </a>
                </li>
            </template>

            <li>
                <a
                    href="#"
                    class="next-page"
                    :class="{ 'disabled': is_last_page }"
                    @click.prevent.stop="goToPage(current_page + 1)"
                >
                    &gt;
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import RoutedPagination from './mixins/RoutedPagination';

    export default {
        name: 'KsPaginator',

        mixins: [RoutedPagination],

        props: {
            limit: {
                type: Number,
                default: 5
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
                return parseInt(this.pagination.current_page) || 0;
            },
            total_pages() {
                return parseInt(this.pagination.total_pages) || 0;
            },
            first_page() {
                return 1;
            },
            is_first_page() {
                return this.current_page <= this.first_page;
            },
            last_page() {
                return this.total_pages;
            },
            is_last_page() {
                return this.current_page >= this.last_page;
            },
            more_than_limit() {
                return this.last_page > this.limit;
            },
            pages() {
                const chunk = Math.round(this.limit / 2);
                let start = this.current_page - chunk;

                start = Math.min(start, this.last_page - this.limit);
                start = Math.max(start, 0);

                const pages = [];
                for ( let i = start; i < this.total_pages && pages.length < this.limit; i++ ) {
                    pages.push(i + 1);
                }

                return pages;
            },
            show_upper_range() {
                return this.more_than_limit
                    && this.pages[this.pages.length - 1] < this.last_page;
            },
            show_lower_range() {
                return this.more_than_limit
                    && this.pages[0] > this.first_page;
            },
        },

        methods: {
            goToPage(page) {
                if ( page <= 0 || page > this.last_page ) {
                    return;
                }

                this.changePage(page);
            },
        },
    }
</script>
