<template>
    <div>
        <div class="row col">
            <h2>Basic Example</h2>
            <p>
                Wrap any content in a <code>ks-draggable</code> to make it draggable, and a
                <code>ks-droppable</code> to create a drop zone. Use the <code>dragstart</code>
                event to capture data about the item being dragged, then read that data back when
                the <code>drop</code> event fires.
            </p>
        </div>

        <div class="callout">
            <div class="basic-block">
            <div class="row">
                <div class="sm-6">
                    <strong style="display:block;margin-bottom:4px;">Items</strong>
                    <ks-draggable
                        v-for="item in items"
                        :key="item.id"
                        :style="[itemStyle, { opacity: activeDrag === item ? 0.4 : 1 }]"
                        @dragstart="onDragStart(item, $event)"
                        @dragend="onDragEnd"
                    >
                        {{ item.name }}
                    </ks-draggable>

                    <strong style="display:block;margin:12px 0 4px;">Drop zone</strong>
                    <ks-droppable :style="dropZoneStyle" @drop="onDrop">
                        <template v-if="droppedItems.length">
                            <div v-for="(item, i) in droppedItems" :key="i" :style="droppedItemStyle">
                                {{ item.name }}
                            </div>
                        </template>
                        <span v-else style="color:#718096;">Drop items here</span>
                    </ks-droppable>
                </div>

                <div class="sm-6">
                    <strong style="display:block;margin-bottom:4px;">Currently dragging</strong>
                    <div :style="outputStyle">
                        <pre v-if="dragItem">{{ dragItem }}</pre>
                        <p v-else style="color:#718096;">Nothing is being dragged.</p>
                    </div>

                    <strong style="display:block;margin:12px 0 4px;">Last dropped</strong>
                    <div :style="outputStyle">
                        <pre v-if="lastDropped">{{ lastDropped }}</pre>
                        <p v-else style="color:#718096;">Nothing has been dropped yet.</p>
                    </div>
                </div>
            </div>
            </div>

            <code-block>
                <template v-pre>
                    &lt;!-- template --&gt;
                    &lt;ks-draggable
                        v-for="item in items"
                        :key="item.id"
                        @dragstart="onDragStart(item, $event)"
                        @dragend="onDragEnd"
                    &gt;
                        {{ item.name }}
                    &lt;/ks-draggable&gt;

                    &lt;ks-droppable @drop="onDrop"&gt;
                        Drop items here
                    &lt;/ks-droppable&gt;

                    &lt;!-- currently dragging --&gt;
                    &lt;pre v-if="dragItem"&gt;{{ dragItem }}&lt;/pre&gt;

                    // script
                    data() {
                        return {
                            items: [
                                { name: 'Foo', id: 1 },
                                { name: 'Bar', id: 2 },
                            ],
                            dragItem: null,
                            lastDropped: null,
                            droppedItems: [],
                        };
                    },

                    methods: {
                        // Track which item is being dragged on dragstart.
                        onDragStart(item, event) {
                            this.dragItem = { ...item };
                            // The native event is emitted too, so you can use dataTransfer:
                            event.dataTransfer.setData('text/plain', JSON.stringify(item));
                        },
                        onDragEnd() {
                            this.dragItem = null;
                        },
                        // Read the tracked drag data back on drop.
                        onDrop() {
                            if (!this.dragItem) return;
                            this.lastDropped = { ...this.dragItem };
                            this.droppedItems.push({ ...this.dragItem });
                        },
                    },
                </template>
            </code-block>
        </div>

        <div class="row col">
            <h2>Restricting drops with <code>accept</code></h2>
            <p>
                The <code>accept</code> prop on <code>ks-droppable</code> can be a function that
                decides — based on the current drag data — whether the drop zone should react. Here
                only <strong>fruit</strong> items are accepted; dragging a vegetable over the zone
                does nothing.
            </p>
        </div>

        <div class="callout">
            <div class="basic-block">
            <div class="row">
                <div class="sm-6">
                    <strong style="display:block;margin-bottom:4px;">Items</strong>
                    <ks-draggable
                        v-for="item in foods"
                        :key="item.id"
                        :style="[itemStyle, { opacity: activeDrag === item ? 0.4 : 1 }]"
                        @dragstart="onDragStart(item, $event)"
                        @dragend="onDragEnd"
                    >
                        {{ item.name }} <em style="color:#718096;">({{ item.type }})</em>
                    </ks-draggable>

                    <strong style="display:block;margin:12px 0 4px;">Fruit only</strong>
                    <ks-droppable :style="dropZoneStyle" :accept="acceptFruit" @drop="onDropFruit">
                        <template v-if="basket.length">
                            <div v-for="(item, i) in basket" :key="i" :style="droppedItemStyle">
                                {{ item.name }}
                            </div>
                        </template>
                        <span v-else style="color:#718096;">Drop fruit here</span>
                    </ks-droppable>
                </div>

                <div class="sm-6">
                    <strong style="display:block;margin-bottom:4px;">Currently dragging</strong>
                    <div :style="outputStyle">
                        <pre v-if="dragItem">{{ dragItem }}</pre>
                        <p v-else style="color:#718096;">Nothing is being dragged.</p>
                    </div>
                </div>
            </div>
            </div>

            <code-block>
                <template v-pre>
                    &lt;!-- template --&gt;
                    &lt;ks-draggable
                        v-for="item in foods"
                        :key="item.id"
                        @dragstart="onDragStart(item, $event)"
                        @dragend="onDragEnd"
                    &gt;
                        {{ item.name }} ({{ item.type }})
                    &lt;/ks-draggable&gt;

                    &lt;ks-droppable :accept="acceptFruit" @drop="onDropFruit"&gt;
                        Drop fruit here
                    &lt;/ks-droppable&gt;

                    // script
                    data() {
                        return {
                            foods: [
                                { name: 'Apple', id: 1, type: 'fruit' },
                                { name: 'Banana', id: 2, type: 'fruit' },
                                { name: 'Carrot', id: 3, type: 'vegetable' },
                            ],
                            dragItem: null,
                            basket: [],
                        };
                    },

                    methods: {
                        // Track the dragged item on dragstart so accept() can inspect it.
                        onDragStart(item, event) {
                            this.dragItem = { ...item };
                            event.dataTransfer.setData('text/plain', JSON.stringify(item));
                        },
                        onDragEnd() {
                            this.dragItem = null;
                        },
                        // accept is called on dragover/drop; return false to ignore the item.
                        acceptFruit() {
                            return this.dragItem &amp;&amp; this.dragItem.type === 'fruit';
                        },
                        onDropFruit() {
                            this.basket.push({ ...this.dragItem });
                        },
                    },
                </template>
            </code-block>
        </div>
    </div>
</template>


<script>
    import KsDraggable from '../../../src/components/KsDraggable.vue';
    import KsDroppable from '../../../src/components/KsDroppable.vue';

    export default {
        name: 'PageKsDragAndDrop',

        data() {

            return {
                items: [
                    { name: 'Foo', id: 1 },
                    { name: 'Bar', id: 2 },
                ],
                foods: [
                    { name: 'Apple', id: 1, type: 'fruit' },
                    { name: 'Banana', id: 2, type: 'fruit' },
                    { name: 'Carrot', id: 3, type: 'vegetable' },
                ],
                dragItem: null,
                activeDrag: null,
                lastDropped: null,
                droppedItems: [],
                basket: [],

                itemStyle: {
                    display: 'inline-block',
                    padding: '10px 16px',
                    margin: '0 8px 8px 0',
                    background: '#e2e8f0',
                    border: '1px solid #cbd5e0',
                    borderRadius: '4px',
                    cursor: 'move',
                },
                dropZoneStyle: {
                    minHeight: '100px',
                    marginTop: '4px',
                    padding: '12px',
                    background: 'aliceblue',
                    border: '2px dashed #90cdf4',
                    borderRadius: '4px',
                },
                droppedItemStyle: {
                    padding: '6px 10px',
                    margin: '4px 0',
                    background: '#fff',
                    border: '1px solid #cbd5e0',
                    borderRadius: '4px',
                },
                // Fixed height so the p <-> pre swap on dragstart can't reflow the row.
                outputStyle: {
                    height: '120px',
                    overflow: 'auto',
                },
            };
        },

        methods: {
            onDragStart(item, event) {
                this.dragItem = Object.assign({}, item);
                this.activeDrag = item;
                event.dataTransfer.setData('text/plain', JSON.stringify(item));
            },
            onDragEnd() {
                this.dragItem = null;
                this.activeDrag = null;
            },
            onDrop() {
                if ( !this.dragItem ) {
                    return;
                }
                this.lastDropped = Object.assign({}, this.dragItem);
                this.droppedItems.push(Object.assign({}, this.dragItem));
            },
            acceptFruit() {
                return this.dragItem && this.dragItem.type === 'fruit';
            },
            onDropFruit() {
                if ( !this.dragItem ) {
                    return;
                }
                this.basket.push(Object.assign({}, this.dragItem));
            },
        },

        components: {
            KsDraggable,
            KsDroppable
        }
    }
</script>
