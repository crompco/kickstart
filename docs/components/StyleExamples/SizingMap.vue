<template>
    <div>
        <div v-for="type in types" class="mb-12">
            <h3>{{type.name}}</h3>

            <table class="table striped shadow">
                <tbody>
                    <template v-for="space in spacing">
                        <tr>
                            <td width="50%">.{{type.code}}-{{space.name}}</td>
                            <td><code>{{type.type}}: {{space.size}}</code></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import spacing from '../../content/style-maps/spacing.json';

    export default {
        name: 'SizingMap',

        data() {
            return {
                spacing: spacing.spacing,
                types: [
                    {name: 'Height', type: 'height', code: 'h'},
                    {name: 'Width', type: 'width', code: 'w'}
                ]
            }
        },
    }
</script>