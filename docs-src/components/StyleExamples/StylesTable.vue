<template>
    <table class="table striped shadow">
        <tbody>
        <template v-for="style in classes">
            <tr v-if="typeof style.map === 'undefined'">
                <td width="50%"><code>.{{ style.name }}</code></td>
                <td><code v-html="style.definition" style="white-space: pre;"></code></td>
            </tr>
            <tr v-else v-for="value in style.values">
                <td width="50%"><code>.{{ getClassName(style, value) }}</code></td>
                <td><code>{{ style.property }}: {{ value.value }}</code></td>
            </tr>
        </template>
        </tbody>
    </table>
</template>

<script>
    // External Dependencies

    // Internal Dependencies

    export default {
        name: 'StylesTable',

        props: {
            classes: {
                required: true,
                default() {
                    return [];
                },
            }
        },

        methods: {
            getClassName(style, value) {
                return `${style.prefix}-${value.name}`;
            },
        },
    }
</script>