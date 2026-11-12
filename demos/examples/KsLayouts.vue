<template>
    <div>
        <h4>Flex Basis</h4>
        <div
            class="max-h-96 shadow"
            style="overflow: scroll"
        >
            <table class="ks-table striped mb-0">
                <tbody>
                    <tr
                        v-for="space in basis"
                        :key="space.name"
                    >
                        <td class="w-1/2">.basis-{{ space.name }}</td>
                        <td><code>flex-basis: {{ space.size }}</code></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import spacing from '../data/style-maps/spacing.json';

    export default {
        computed: {
            basis() {
                return spacing.spacing
                    .concat(spacing.percent)
                    .concat([
                        {
                            name: 'auto',
                            size: 'auto'
                        },
                        {
                            name: 'full',
                            size: '100%'
                        }
                    ]);
            },
        },
    }
</script>
