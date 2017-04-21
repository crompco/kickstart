<template>
    <div>
        <h2>Toast</h2>

        <div class="basic-block">
            <button class="button" @click="show('success')">Show Toast (Success)</button>
            <button class="button" @click="show('info')">Show Toast (Info)</button>
            <button class="button" @click="show('error')">Show Toast (Error)</button>
            <button class="button" @click="show('warning')">Show Toast (Warning)</button>
        </div>

        <ks-tabs>
            <ks-tab title="Props">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>message</td>
                            <td>String</td>
                            <td>''</td>
                            <td>The message that the toast will display</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>String</td>
                            <td>info</td>
                            <td>The type of message. Options are the same as alerts. (info, warning, error, success)</td>
                        </tr>
                        <tr>
                            <td>position</td>
                            <td>String</td>
                            <td>top-right</td>
                            <td>Where the toast should appear. Options are top-right, top, top-left, bottom-right, bottom, bottom-left</td>
                        </tr>
                        <tr>
                            <td>duration</td>
                            <td>Number</td>
                            <td>2500</td>
                            <td>How long the toast should appear. If 0 is passed the toast will require the user to click to close</td>
                        </tr>
                        <tr>
                            <td>limit</td>
                            <td>Number</td>
                            <td>3</td>
                            <td>The number of toast that are on screen at once</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>

    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsTabs from '../../src/components/KsTabs.vue';
    import KsTab from '../../src/components/KsTab.vue';

    export default {
        name: 'PageKsToast',

        methods: {
            show(type = 'info') {
                this.$toast({
                    message: `This is an ${type} toast`,
                    type: type,
                    limit: 4
                });
            }
        },

        components: {
            KsTabs,
            KsTab
        }
    }
</script>