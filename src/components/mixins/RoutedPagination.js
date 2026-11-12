/**
 * Page changes either emit input or, when routed, push the page into the route query
 */
export default {
    props: {
        routed: {
            type: Boolean,
            default: false
        },
        pageVar: {
            type: String,
            default: 'page'
        },
    },

    emits: ['input'],

    methods: {
        changePage(page) {
            if ( !this.routed ) {
                this.$emit('input', page);
                return;
            }

            this.$router.push({
                path: this.$route.path,
                query: {
                    ...this.$route.query,
                    [this.pageVar]: page,
                },
            });
        },
    },
};
