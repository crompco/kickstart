<template>
    <div id="app" class="kickstart-docs">
        <top-nav></top-nav>

        <div class="pb-12">
            <router-view ref="pageContent"></router-view>
        </div>
    </div>
</template>

<script>
    import TopNav from './components/TopNav.vue';

    export default {
        name: 'App',

        data() {
            return {
                showSidebar: false,
                description: 'Kickstart UI'
            };
        },

        watch: {
            '$route'() {
                this.updatePageTitle();

                this.$nextTick(() => {
                    this.$refs.pageContent.scrollTop = 0;
                });
            }
        },

        mounted() {
            this.updatePageTitle();
        },

        methods: {
            updatePageTitle() {
                // document.title = this.$route.meta.title + ' | ' + this.description;
            }
        },

        components: {
            TopNav,
        }
    };
</script>