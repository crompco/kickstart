export default {
    srcDir: `${__dirname}/docs`,

    target: 'static',

    ssr: false,

    generate: {
        dir: 'nuxt-dist',
    },

    components: [
        '~/components',
    ],

    plugins: [
        {src: '~/plugins/vue-mask.js'},
        {src: '~/plugins/kickstart.js', mode: 'client'},
        {src: '~/plugins/ks-examples.js'},
    ],

    modules: [
        '@nuxt/content',
    ],

    buildModules: [
        'nuxt-svg-loader',
    ],

    css: [
        '~/assets/sass/docs.scss',
    ],

    router: {
        linkActiveClass: 'is-active',
    },

    content: {
        markdown: {
            prism: {
                theme: 'prismjs/themes/prism-okaidia.css',
            }
        }
    }
}