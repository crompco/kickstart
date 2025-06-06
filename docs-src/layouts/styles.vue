<template>
    <div>
        <ks-side-nav :fixed="false" class="vertical">
            <ul class="nav-links">
                <li v-for="style in styles" class="text-sm">
                    <router-link :to="style.path">{{style.title}}</router-link>
                </li>
            </ul>
        </ks-side-nav>

        <div class="content pb-12">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import $content from '../plugins/content';
    import KsSideNav from '../../src/components/KsSideNav.vue';
    import TopNav from '../components/TopNav';

    export default {
        name: 'styles',

        data() {
            return {
                styles: [],
            }
        },

        async beforeMount() {
            this.styles = await $content.get('styles')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();
        },

        components: {
            KsSideNav,
            TopNav,
        },
    }
</script>