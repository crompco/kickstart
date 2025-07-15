<template>
    <div>
        <table class="ks-table striped shadow">
            <thead>
                <tr>
                    <th>Class</th>
                    <th>Value</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="size in font_sizes">
                    <td><code>.text-{{ size.name }}</code></td>
                    <td><code>{{ size.size }}</code></td>
                    <td><div :class="`text-${size.name}`">{{size.name}}</div></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import sizes from '../../content/style-maps/font-sizes.json';

    export default {
        name: 'TextFontSizeMap',

        data() {
            return {
                font_sizes: sizes.sizes,
            }
        },
    }
</script>