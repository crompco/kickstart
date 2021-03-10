<template>
    <div>
        <div class="row">
            <div class="sm-12">
                <h2>{{data.title}}</h2>
            </div>
        </div>

        <div v-if="hasClasses" class="row">
            <div class="sm-12">
                <styles-table :classes="classes"></styles-table>
            </div>
        </div>

        <div v-if="hasBody" class="row">
            <div class="sm-12">
                <nuxt-content :document="data"></nuxt-content>
            </div>
        </div>

        <div v-if="hasSource" class="row" ref="source">
            <div class="col sm-full">
                <component :is="source"></component>
            </div>
        </div>
    </div>
</template>

<script>
    // External Dependencies
    import Prism from 'prismjs';
    import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

    // Internal Dependencies

    export default {
        layout: 'styles',

        async asyncData({route, $content}) {
            const data = await $content(`styles/${route.params.name}`).fetch();

            return {
                data,
            }
        },

        head() {
            return {
                title: `${this.title} | Kickstart UI`
            }
        },

        computed: {
            title() {
                return this.data?.title;
            },

            classes() {
                return this.data?.api?.classes || [];
            },

            hasClasses() {
                return this.classes.length > 0;
            },

            hasBody() {
                return this.data?.body?.children.length > 0;
            },

            hasSource() {
                return this.data?.source || false;
            },

            source() {
                return this.data?.source
            },
        },

        mounted() {
            if (this.hasSource) {
                setTimeout(() => {
                        Prism.highlightAll();
                }, 250)
            }
        },

        updated() {
            console.log('UPDATE _NAME')
        },

        methods: {
            getClassName(style, value) {
                return `${style.prefix}-${value.name}`;
            },
        },

        watch: {
            'data.content'() {
                console.log('watching data.content')
            },
        }
    }
</script>