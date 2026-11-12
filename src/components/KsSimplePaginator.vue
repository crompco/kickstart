<template>
    <div
        v-show="show_pagination"
        class="ks-paginator"
    >
        <ul class="row">
            <li>
                <a
                    href="#"
                    class="prev-page"
                    :class="{'disabled': pagination.previous_page == null}"
                    @click.prevent.stop="previousPage()"
                >
                    &lt;
                </a>
            </li>
            <li>
                <a
                    href="#"
                    class="next-page"
                    :class="{'disabled': pagination.next_page == null}"
                    @click.prevent.stop="nextPage()"
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
        name: 'KsSimplePaginator',

        mixins: [RoutedPagination],

        props: {
            pagination: {
                type: Object,
                default() {
                    return {
                        current_page: 0,
                        limit: 10,
                        next_page: null,
                        previous_page: null,
                    }
                }
            }
        },

        computed: {
            is_first_page() {
                return this.pagination.current_page == 1 || this.pagination.previous_page == null;
            },

            show_pagination() {
                return this.pagination.previous_page != null || this.pagination.next_page != null;
            },
        },

        methods: {
            previousPage() {
                if ( this.pagination.previous_page == null ) {
                    return;
                }

                this.changePage(parseInt(this.pagination.current_page) - 1);
            },

            nextPage() {
                if ( this.pagination.next_page == null ) {
                    return;
                }

                this.changePage(parseInt(this.pagination.current_page) + 1);
            },
        }
    }
</script>
