<template>
    <div>
        <div class="basic-block">
            <button class="button" @click="show('success')">Show Toast (Success)</button>
            <button class="button" @click="show('info')">Show Toast (Info)</button>
            <button class="button" @click="show('error')">Show Toast (Error)</button>
            <button class="button" @click="show('warning')">Show Toast (Warning)</button>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
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
                </template>
            </code-block>
        </div>

        <div class="alert info">
            There are multiple ways to use this components. There is a property on the vue instance if you use kickstart as a plugin.
        </div>
        <div class="row">
            <code-block lang="language-js">
                <template v-pre>
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
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsTabs from '../../../src/components/KsTabs.vue';
    import KsTab from '../../../src/components/KsTab.vue';

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
