<template>
    <div>
        <ks-side-nav :fixed="false" class="vertical">
            <ul class="nav-links">
                <li v-for="component in components" class="text-sm">
                    <router-link :to="component.path">{{component.title}}</router-link>
                </li>
            </ul>
        </ks-side-nav>

        <div class="ks-content pb-12">
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
        name: 'components',

        data() {
            return {
                components: [],
            }
        },

        async beforeMount() {
            this.components = await $content.get('components')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();
        },

        components: {
            TopNav,
            KsSideNav,
        },
    }
</script>