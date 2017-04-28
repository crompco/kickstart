<template>
    <div>
        <h2>Action Menu</h2>

        <div class="row">
            <div class="sm-half">
                <ks-action-menu>
                    <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                    <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                    <a href="#" @click.prevent="action('Edit')" class="list-item">Edit</a>
                    <a href="#" @click.prevent="action('Delete')" class="list-item separator">Delete</a>
                </ks-action-menu>
            </div>
            <div class="sm-half">
                <ks-action-menu>
                    <div slot="menu">Menu</div>
                    <a href="#" @click.prevent="action('New')" class="list-item">New</a>
                    <a href="#" @click.prevent="action('Add')" class="list-item">Add</a>
                    <a href="#" @click.prevent="action('Edit')" class="list-item">Edit</a>
                    <a href="#" @click.prevent="action('Delete')" class="list-item separator">Delete</a>
                </ks-action-menu>
            </div>
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