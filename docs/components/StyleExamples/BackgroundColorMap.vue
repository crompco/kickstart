<template>
    <div>
        <table class="table striped shadow">
            <thead>
            <tr>
                <th>Class</th>
                <th>Value</th>
                <th>Example</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="color in colors">
                <template v-if="typeof color.colors === 'string'">
                    <tr>
                        <td><code>.bg-{{color.name}}</code></td>
                        <td><code>{{color.colors}}</code></td>
                        <td><div :class="`bg-${color.name}`">&nbsp;</div></td>
                    </tr>
                </template>
                <template v-else v-for="(hex, weight) in color.colors">
                    <tr>
                        <td><code>.bg-{{color.name}}-{{weight}}</code></td>
                        <td><code>{{hex}}</code></td>
                        <td><div :class="`bg-${color.name}-${weight}`">&nbsp;</div></td>
                    </tr>
                </template>
            </template>
            </tbody>

        </table>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import colors from '../../content/style-maps/colors.json';

    export default {
        name: 'BackgroundColorMap',

        data() {
            return {
                colors: colors.colors,
            }
        },
    }
</script>