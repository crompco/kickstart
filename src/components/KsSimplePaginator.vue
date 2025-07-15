<template>
    <div class="ks-paginator" v-show="show_pagination">
        <ul class="row">
            <li>
                <a href="#"
                   @click.prevent.stop="previousPage()"
                   class="prev-page"
                   :class="{'disabled': pagination.previous_page == null}"
                >
                    <
                </a>
            </li>
            <li>
                <a href="#"
                   @click.prevent.stop="nextPage()"
                   class="next-page"
                   :class="{'disabled': pagination.next_page == null}"
                >
                    >
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies

    export default {
        name: 'KsSimplePaginator',

        props: {
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

                this.changePage(this.pagination.current_page - 1);
            },

            nextPage() {
                if ( this.pagination.next_page == null ) {
                    return;
                }

                this.changePage(this.pagination.current_page + 1);
            },

            changePage(page) {
                if ( !this.routed ) {
                    return this.$emit('input', page);
                }

                const query = Object.assign({}, this.$route.query, {[this.pageVar]: page});

                this.$router.push({
                    to: {
                        name: this.$route.name,
                    },
                    params: this.$route.params,
                    query
                });
            },
        }
    }
</script>