<template>
    <div>
        <client-only>
            <top-nav></top-nav>
            <ks-side-nav :fixed="false" class="vertical">
                <ul class="nav-links">
                    <li v-for="style in styles" class="text-sm">
                        <NuxtLink :to="style.path">{{style.title}}</NuxtLink>
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
        name: 'styles',

        data() {
            return {
                styles: [],
            }
        },

        async fetch() {
            const styles = await this.$content('styles')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();

            this.$set(this, 'styles', styles);
        },

        components: {
            KsSideNav,
            TopNav,
        },
    }
</script>