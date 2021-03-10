<template>
    <div>
        <top-nav></top-nav>

        <div class="sm-6">
            <h3>Components</h3>
            <table class="table striped">
                <tbody>
                    <tr v-for="component in components">
                        <td><NuxtLink :to="component.path">{{component.title}}</NuxtLink></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="sm-6">
            <h3>Styles</h3>
            <table class="table striped">
                <tbody>
                    <tr v-for="style in styles">
                        <td><NuxtLink :to="style.path">{{style.title}}</NuxtLink></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import TopNav from '@/components/TopNav';

    export default {
        async fetch() {
            this.components = await this.$content('components')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();

            this.styles = await this.$content('styles')
                .only(['title', 'path'])
                .sortBy('title')
                .fetch();
        },

        data() {
            return {
                components: [],
                styles: [],
            }
        },

        components: {
            TopNav,
        }
    }
</script>