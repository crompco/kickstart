<template>
    <div>
        <div class="row">
            <div class="sm-12">
                <h2>{{data.title}}</h2>
            </div>
        </div>

        <!-- MD -->
        <div v-if="hasBody" class="row">
            <div class="sm-12">
            </div>
        </div>

        <!-- Examples -->
        <div v-if="hasSource" class="row">
            <div class="col sm-full">
                <component :is="source"></component>
            </div>
        </div>

        <!-- API -->
        <div class="row">
            <div class="sm-12">
                <ks-tabs :key="$route.path">
                    <ks-tab title="Props" v-if="props">
                        <template v-if="isGrouped" v-for="(group_props, name) in props">
                            <h3>{{name}}</h3>
                            <table class="ks-table striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Default</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="prop in group_props">
                                    <td>{{prop.name}} <span class="ks-badge" v-if="prop.vmodel || false">v-model</span></td>
                                    <td><pre>{{ prop.type }}</pre></td>
                                    <td><pre>{{ prop.default }}</pre></td>
                                    <td>{{prop.description}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </template>

                        <table class="ks-table striped" v-if="!isGrouped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="prop in props">
                                <td>{{prop.name}} <span class="ks-badge" v-if="prop.vmodel || false">v-model</span></td>
                                <td><pre>{{ prop.type }}</pre></td>
                                <td><pre>{{ prop.default }}</pre></td>
                                <td><span v-html="prop.description"></span></td>
                            </tr>
                            </tbody>
                        </table>
                    </ks-tab>
                    <ks-tab title="Events" v-if="events">
                        <template v-if="isGrouped" v-for="(group_events, name) in events">
                            <h3>{{name}}</h3>

                            <table class="ks-table striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="prop in group_events">
                                    <td><pre>{{ prop.name }}</pre></td>
                                    <td>{{prop.description}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </template>

                        <table class="ks-table striped" v-if="!isGrouped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="prop in events">
                                <td><pre>{{ prop.name }}</pre></td>
                                <td><span v-html="prop.description"></span></td>
                            </tr>
                            </tbody>
                        </table>
                    </ks-tab>
                    <ks-tab title="Methods" v-if="methods">
                        <template v-if="isGrouped" v-for="(group_methods, name) in methods">
                            <h3>{{name}}</h3>
                            <table class="ks-table striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="prop in group_methods">
                                    <td><pre>{{ prop.name }}</pre></td>
                                    <td>{{prop.description}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </template>

                        <table class="ks-table striped" v-if="!isGrouped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="prop in methods">
                                <td><pre>{{ prop.name }}</pre></td>
                                <td><span v-html="prop.description"></span></td>
                            </tr>
                            </tbody>
                        </table>
                    </ks-tab>
                    <ks-tab title="Slots" v-if="slots">
                        <template v-if="isGrouped" v-for="(group_slot, name) in slots">
                            <h3>{{name}}</h3>

                            <table class="ks-table striped">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="prop in group_slot">
                                    <td><pre>{{ prop.name }}</pre></td>
                                    <td>{{prop.description}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </template>

                        <table class="ks-table striped" v-if="!isGrouped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="prop in slots">
                                <td><pre>{{ prop.name }}</pre></td>
                                <td><span v-html="prop.description"></span></td>
                            </tr>
                            </tbody>
                        </table>
                    </ks-tab>
                </ks-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import KsTabs from '../../../src/components/KsTabs';
    import KsTab from '../../../src/components/KsTab';
    import Prism from 'prismjs';
    import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
    import $content from '../../plugins/content';

    export default {
        head() {
            return {
                title: `${this.title} | Kickstart UI`
            }
        },

        computed: {
            title() {
                return this.data?.title;
            },

            api() {
                return this.data?.api || {};
            },

            isGrouped() {
                return this.api?.grouped || false;
            },

            props() {
                const props = this.api?.props;

                if (!props) {
                    return false
                }

                if (this.isGrouped) {
                    return this.groupBy(props);
                }

                return props;
            },

            methods() {
                const methods =  this.api?.methods;

                if (!methods) {
                    return false;
                }

                if (this.isGrouped) {
                    return this.groupBy(methods);
                }

                return methods;
            },

            events() {
                const events = this.api?.events;

                if (!events) {
                    return false;
                }

                if (this.isGrouped) {
                    return this.groupBy(events);
                }

                return events;
            },

            slots() {
                const slots = this.api?.slots;

                if (!slots) {
                    return false;
                }

                if (this.isGrouped) {
                    return this.groupBy(slots);
                }

                return slots;
            },

            hasBody() {
                return this.data.body?.children.length > 0;
            },

            hasSource() {
                return this.data?.source;
            },

            source() {
                return this.data?.source
            },
        },

        data() {
            return {
                data: {},
            }
        },

        beforeRouteUpdate(to, from, next) {
            this.$set(this, 'data', {});
            this.fetchData(to.path);
            next();
        },

        beforeMount() {
            this.fetchData();
        },

        mounted() {
            setTimeout(() => {
                Prism.highlightAll();
            }, 250)
        },

        methods: {
            groupBy(arr) {
                return arr.reduce((grouped, item) => {
                    grouped[item.group] = grouped[item.group] || [];
                    grouped[item.group].push(item);

                    return grouped
                }, {});
            },

            async fetchData(path) {
                const data = await $content.get('components').fetch(path || this.$route.path);

                this.$nextTick(() => {
                    this.$set(this, 'data', data?.data || {});
                });
            },
        },

        components: {
            KsTabs,
            KsTab,
        }
    }
</script>