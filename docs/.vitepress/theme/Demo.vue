<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { withBase } from 'vitepress';

const props = defineProps({
    // Example component name in demos/examples
    name: {
        type: String,
        required: true,
    },
    // Lowest frame height in px; modals and dropdowns need room inside the frame
    minHeight: {
        type: [Number, String],
        default: 150,
    },
});

const frame = ref(null);
const content_height = ref(0);

const src = computed(() => withBase(`/demos/index.html#/${props.name}`));
const height = computed(() => Math.max(content_height.value, Number(props.minHeight)));

function onMessage(event) {
    const data = event.data || {};

    if ( data.type === 'ks-demo-height' && frame.value && event.source === frame.value.contentWindow ) {
        content_height.value = data.height;
    }
}

onMounted(() => window.addEventListener('message', onMessage));
onBeforeUnmount(() => window.removeEventListener('message', onMessage));
</script>

<template>
    <div class="ks-demo-frame">
        <iframe
            ref="frame"
            :src="src"
            :title="`${name} example`"
            :style="{ height: `${height}px` }"
            loading="lazy"
        ></iframe>
        <a
            :href="src"
            target="_blank"
            rel="noopener"
        >Open the example in a new tab</a>
    </div>
</template>
