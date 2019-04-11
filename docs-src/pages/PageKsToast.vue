<template>
    <div>
        <h2>Toast</h2>

        <div class="basic-block">
            <button class="button" @click="show('success')">Show Toast (Success)</button>
            <button class="button" @click="show('info')">Show Toast (Info)</button>
            <button class="button" @click="show('error')">Show Toast (Error)</button>
            <button class="button" @click="show('warning')">Show Toast (Warning)</button>
        </div>

        <div class="row">
            <code-block>
                &lt;!-- Success -->
                &lt;ks-toast
                    message="This is an success toast"
                    type="success"
                >&lt;/ks-toast>

                &lt;!-- Info -->
                &lt;ks-toast
                    message="This is an info toast"
                >&lt;/ks-toast>

                &lt;!-- Error -->
                &lt;ks-toast
                    message="This is an error toast"
                    type="error"
                >&lt;/ks-toast>

                &lt;!-- Warning -->
                &lt;ks-toast
                    message="This is an warning toast"
                    type="warning"
                >&lt;/ks-toast>
            </code-block>
        </div>

        <div class="alert info">
            There are multiple ways to use this components. There is a property on the vue instance if you use kickstart as a plugin.
        </div>
        <div class="row">
            <code-block lang="language-js">
                this.$toast({
                    type: 'success',
                    message: 'Success message',
                    position: 'top-right',
                    duration: 2500,
                    limit: 3
                });

                Vue.toast({
                    type: 'success',
                    message: 'Success message',
                    position: 'top-right',
                    duration: 2500,
                    limit: 3
                });

                // This will default to an info toast
                this.$toast('info message');
                Vue.toast('info message');
            </code-block>
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
            <ks-tab title="Methods">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>show</td>
                            <td>Show the toast. Or if the limit has been reached the toast will be added to the queue.</td>
                        </tr>
                        <tr>
                            <td>close</td>
                            <td>Closes the toast message.</td>
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
                    message: `This is an <strong class="tiny-text">${type}</strong> toast`,
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
