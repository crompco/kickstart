<template>
    <div class="ks-demo">
        <component
            :is="example"
            v-if="example"
        ></component>
        <p v-else-if="name">
            Unknown example "{{ name }}"
        </p>
        <ul v-else>
            <li
                v-for="example_name in names"
                :key="example_name"
            >
                <a :href="`#/${example_name}`">{{ example_name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
    const examples = import.meta.glob('./examples/*.vue');

    function exampleName(path) {
        return path.replace('./examples/', '').replace('.vue', '');
    }

    const loaders = Object.fromEntries(Object.entries(examples).map(([path, loader]) => [exampleName(path), loader]));

    export default {
        name: 'DemoApp',

        data() {
            return {
                name: '',
            };
        },

        computed: {
            names() {
                return Object.keys(loaders).sort();
            },
            example() {
                const loader = loaders[this.name];

                return loader ? () => loader() : null;
            },
        },

        mounted() {
            this.readHash();
            window.addEventListener('hashchange', this.readHash);

            this.resize_observer = new ResizeObserver(() => this.postHeight());
            // The kickstart base styles give body the viewport height, so watch the content
            this.resize_observer.observe(this.$el);
        },

        beforeDestroy() {
            window.removeEventListener('hashchange', this.readHash);
            this.resize_observer.disconnect();
        },

        methods: {
            readHash() {
                this.name = window.location.hash.replace(/^#\/?/, '');
            },
            postHeight() {
                if ( window.parent !== window ) {
                    window.parent.postMessage({
                        type: 'ks-demo-height',
                        name: this.name,
                        height: Math.max(this.$el.offsetHeight, document.documentElement.scrollHeight),
                    }, '*');
                }
            },
        },
    };
</script>
