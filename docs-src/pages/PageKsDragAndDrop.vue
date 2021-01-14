<template>
    <div class="col sm-full">
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
                        :accept="accepts"
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

        <ks-tabs>
            <ks-tab title="Props">
                <h2>KsDraggable</h2>
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
                            <td>Tag</td>
                            <td><pre>String</pre></td>
                            <td><pre>div</pre></td>
                            <td>What tag should be, this uses vue <code>component</code> <code>:is="tag"</code></td>
                        </tr>
                        <tr>
                            <td>Disabled</td>
                            <td><pre>Boolean</pre></td>
                            <td><pre>false</pre></td>
                            <td>To make the draggable not drag.</td>
                        </tr>
                        <tr>
                            <td>activeClass</td>
                            <td><pre>String</pre></td>
                            <td><pre>dragging</pre></td>
                            <td>What the html class is for the draggable element</td>
                        </tr>
                    </tbody>
                </table>
                <h2>KsDroppable</h2>
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
                            <td>tag</td>
                            <td><pre>String</pre></td>
                            <td><pre>div</pre></td>
                            <td>What tag should be, this uses vue <code>component</code> <code>:is="tag"</code></td>
                        </tr>
                        <tr>
                            <td>activeClass</td>
                            <td><pre>String</pre></td>
                            <td><pre>drop-zone-active</pre></td>
                            <td>What the html class is for the droppable element</td>
                        </tr>
                        <tr>
                            <td>inactiveClass</td>
                            <td><pre>String</pre></td>
                            <td><pre>''</pre></td>
                            <td>What the html class is for the droppable element when there isn't a draggable element hovering over</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td><pre>Boolean</pre></td>
                            <td><pre>false</pre></td>
                            <td>Disables droppable area for allowing draggable elements to drop</td>
                        </tr>
                        <tr>
                            <td>accept</td>
                            <td><pre>Boolean, Function</pre></td>
                            <td><pre>true</pre></td>
                            <td>Opposite of disabled prop. This can be a function that allows the parent component to have more control over the droppable area should allow draggable elements</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
            <ks-tab title="Events">
                <h2>KsDraggable</h2>
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><pre>dragstart</pre></td>
                            <td>When the ks-draggable element starts to drag. This event emits the mouse event.</td>
                        </tr>
                        <tr>
                            <td><pre>dragend</pre></td>
                            <td>When the ks-draggable element stops drag. This event emits the mouse event.</td>
                        </tr>
                    </tbody>
                </table>
                <h2>KsDroppable</h2>
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><pre>drop</pre></td>
                            <td>When the ks-droppable element gets an elements dropped on it. This event emits the mouse event.</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>
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
            },
            accepts() {
                return this.dragItem.id !== 2;
            },
        },

        watch: {},

        components: {
            KsDraggable,
            KsDroppable
        }
    }
</script>

<style></style>
