<template>
    <div>
        <h2>Action Menu</h2>

        <div class="basic-block">
            <h3>Basic Usage</h3>
            <div class="row col">
                <div class="sm-8">
                    <ks-action-menu>
                        <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                        <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                        <a href="#" @click.prevent="action('Edit')" class="list-item disabled">Edit</a>
                        <a href="#" @click.prevent="action('Delete')" class="list-item separator danger">Delete Class Link</a>
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
                <code-block v-pre>
                    &lt;ks-action-menu>
                        &lt;a href="#" @click.prevent="action('New')" class="list-item">New&lt;/a>
                        &lt;a href="#" @click.prevent="action('Add')" class="list-item">Add&lt;/a>
                        &lt;a href="#" @click.prevent="action('Edit')" class="list-item disabled">Edit&lt;/a>
                        &lt;a href="#" @click.prevent="action('Delete')" class="list-item separator danger">Delete Class Link&lt;/a>
                    &lt;/ks-action-menu>

                    &lt;ks-action-menu>
                        &lt;div slot="menu">Menu&lt;/div>
                        &lt;a href="#" class="list-item">New&lt;/a>
                        &lt;a href="#" class="list-item">Add&lt;/a>
                        &lt;a href="#" class="list-item disabled">Edit&lt;/a>
                        &lt;a href="#" class="list-item separator danger">Delete&lt;/a>
                    &lt;/ks-action-menu>
                </code-block>
            </div>
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
                            <tr>
                                <td>actionsAttachment</td>
                                <td>String</td>
                                <td>top left</td>
                                <td>The position on the actions list that you want attached to the button/target</td>
                            </tr>
                            <tr>
                                <td>targetAttachment</td>
                                <td>String</td>
                                <td>bottom left</td>
                                <td>The position on the target that you want the actions attached to</td>
                            </tr>
                            <tr>
                                <td>openClass</td>
                                <td>String</td>
                                <td></td>
                                <td>The class to attach when the menu is opened</td>
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
                <ks-tab title="Events">
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>open</td>
                                <td>Fired when the menu is opened</td>
                            </tr>
                            <tr>
                                <td>close</td>
                                <td>Fired when the menu is closed</td>
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
