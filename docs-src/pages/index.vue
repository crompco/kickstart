<template>
    <div>
        <div class="sm-6">
            <h3>Components</h3>
            <table class="ks-table striped">
                <tbody>
                    <tr v-for="component in components">
                        <td><router-link :to="component.path">{{component.title}}</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="sm-6">
            <h3>Styles</h3>
            <table class="ks-table striped">
                <tbody>
                    <tr v-for="style in styles">
                        <td><router-link :to="style.path">{{style.title}}</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import $content from '../plugins/content';

    export default {
        data() {
            return {
                components: [],
                styles: [],
            }
        },

        async created() {
            this.components = await $content.get('components')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();

            this.styles = await $content.get('styles')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();
        },

        components: {

        }
    }
</script>