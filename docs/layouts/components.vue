<template>
    <div>
        <client-only>
            <top-nav></top-nav>
            <ks-side-nav :fixed="false" class="vertical">
                <ul class="nav-links">
                    <li v-for="component in components" class="text-sm">
                        <NuxtLink :to="component.path">{{component.title}}</NuxtLink>
                    </li>
                </ul>
            </ks-side-nav>

            <div class="content pb-12">
                <Nuxt />
            </div>
        </client-only>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsSideNav from '../../src/components/KsSideNav.vue';
    import TopNav from '../components/TopNav';

    export default {
        name: 'components',

        data() {
            return {
                components: [],
            }
        },

        async fetch() {
            const components = await this.$content('components')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();

            this.$set(this, 'components', components);
        },

        components: {
            TopNav,
            KsSideNav,
        },
    }
</script>