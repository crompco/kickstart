<template>
    <div>
        <div
            v-for="state in states"
            :key="state.name"
            class="state-colors-row"
        >
            <div :class="['ks-alert', state.name]">
                <strong class="capitalize">{{ state.name }}</strong> {{ state.shades }}
            </div>
            <span :class="['ks-badge', state.name]">{{ state.name }}</span>
        </div>

        <div class="state-colors-buttons">
            <button class="ks-button outline success">Success</button>
            <button class="ks-button outline danger">Danger</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'StateColors',

        data() {
            return {
                states: [
                    { name: 'success', shades: 'green-700 on green-100, border green-200' },
                    { name: 'info', shades: 'blue-700 on blue-100, border blue-200' },
                    { name: 'warning', shades: 'yellow-800 on yellow-100, border yellow-200' },
                    { name: 'error', shades: 'red-700 on red-100, border red-200' },
                ],
            };
        },
    }
</script>

<style>
    .state-colors-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .state-colors-row .ks-alert {
        flex: 1;
        margin-bottom: 0;
    }

    .state-colors-row + .state-colors-row,
    .state-colors-buttons {
        margin-top: 0.5rem;
    }

    .state-colors-buttons {
        display: flex;
        gap: 0.5rem;
    }
</style>
