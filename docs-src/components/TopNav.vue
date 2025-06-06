<template>
    <ks-top-nav :has-sidebar="true">
        <div class="brand text-xl">Kickstart</div>
        <div class="collapse">
            <ul class="dropdown right pr-4">
                <li class="pr-2">
                    <router-link :to="componentsLink">Components</router-link>
                </li>
                <li>
                    <router-link :to="stylesLink">Styles</router-link>
                </li>
            </ul>
        </div>
    </ks-top-nav>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import $content from '../plugins/content';
    import KsTopNav from '../../src/components/KsTopNav';

    export default {
        name: 'TopNav',

        computed: {
            componentsLink() {
                return this.component?.path || '';
            },

            stylesLink() {
                return this.style?.path || '';
            },
        },

        data() {
            return {
                component: {},
                style: {},
            }
        },

        async mounted() {
            const component = await this.getFirst('components');
            const style = await this.getFirst('styles');

            this.$set(this, 'component', component[0]);
            this.$set(this, 'style', style[0]);
        },

        methods: {
            async getFirst(type) {
                return $content.get(type)
                    .only(['title', 'path'])
                    .sortBy('title')
                    .fetch();
            }
        },

        components: {
            KsTopNav,
        },
    }
</script>