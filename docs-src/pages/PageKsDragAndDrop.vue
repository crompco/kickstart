<template>
    <div class="sm-full">
        <h3>Example Form</h3>
        <div class="basic-block collapse">
            <div class="row">

                <div class="sm-6">

                    <ks-draggable
                        v-for="item in items"
                        style="background: #CCC;width: 100px;height: 100px;"
                        @dragstart="dragging(item)" :key="item.id"
                    >
                        {{item.name}}
                    </ks-draggable>
                </div>
                <div class="sm-6">
                    <strong>Dragging</strong>
                    <pre v-if="dragItem">{{dragItem}}</pre>
                </div>
            </div>
            <div class="row">
                <div class="sm-6">
                    <ks-droppable
                        style="background: aliceblue;width: 200px;height: 200px;"
                        @drop="dropItem"
                    >
                        Drop stuff here
                    </ks-droppable>
                </div>
                <div class="sm-6">
                    <strong>Dropped</strong>
                    <pre v-if="droppedItem">{{droppedItem}}</pre>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import KsDraggable from '../../src/components/KsDraggable.vue';
    import KsDroppable from '../../src/components/KsDroppable.vue';

    export default {
        name: 'PageKsDragAndDrop',

        props: {},

        data() {

            return {
                items: [
                    {name: 'Foo', id: 1},
                    {name: 'Bar', id: 2},
                ],
                dragItem: null,
                droppedItem: null,
            };
        },

        computed: {},

        mounted() {

        },

        methods: {
            dragging(item) {
                this.dragItem = Object.assign({}, item);
            },
            dropItem() {
                this.droppedItem = Object.assign({}, this.dragItem);
            }
        },

        watch: {},

        components: {
            KsDraggable,
            KsDroppable
        }
    }
</script>

<style></style>
