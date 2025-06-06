<template>
    <div>
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
                <code-block>
                    <template v-pre>
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
                    </template>
                </code-block>
            </div>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import KsActionMenu from "../../../src/components/KsActionMenu";

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
