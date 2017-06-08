<template>
    <div>
        <h2>Action Menu</h2>

        <div class="row col">
            <div class="sm-8">
                <ks-action-menu>
                    <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                    <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                    <a href="#" @click.prevent="action('Edit')" class="list-item">Edit</a>
                    <a href="#" @click.prevent="action('Delete')" class="list-item separator">Delete</a>
                </ks-action-menu>
            </div>
            <div class="sm-4 t-right">
                <ks-action-menu>
                    <div slot="menu">Menu</div>
                    <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                    <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                    <a href="#" @click.prevent="action('Edit')" class="list-item">Edit</a>
                    <a href="#" @click.prevent="action('Delete')" class="list-item separator">Delete</a>
                </ks-action-menu>
            </div>
        </div>

        <div class="row col">
            <code-block>
                <code class="language-html" v-pre>
                    &lt;ks-action-menu>
                        &lt;div slot="menu">Menu&lt;/div>
                        &lt;a href="#" class="list-item">New&lt;/a>
                        &lt;a href="#" class="list-item">Add&lt;/a>
                        &lt;a href="#" class="list-item">Edit&lt;/a>
                        &lt;a href="#" class="list-item separator">Delete&lt;/a>
                    &lt;/ks-action-menu>
                </code>
            </code-block>
        </div>

        <div class="row">
            <ks-tabs>
                <ks-tab title="Props">
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Prop</th>
                                <th>Type</th>
                                <th>Default</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>show</td>
                                <td>Boolean</td>
                                <td>false</td>
                                <td>This will open the menu</td>
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
                                <td>toggle</td>
                                <td>This will toggle the open state of the menu</td>
                            </tr>
                            <tr>
                                <td>close</td>
                                <td>This will close the menu</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>
                <ks-tab title="Slots">
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Slot</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>menu</td>
                                <td>This slot will change the button from the hamburger menu</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>
            </ks-tabs>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsActionMenu from "../../src/components/KsActionMenu";

    export default {
        name: 'PageKsActionMenu',

        methods: {
            action(who) {
                console.log('WHO: ', who);
            }
        },

        components: {
            KsActionMenu
        }
    }
</script>