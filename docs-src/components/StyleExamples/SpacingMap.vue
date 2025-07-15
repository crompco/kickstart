<template>
    <div>
        <div v-for="type in types" class="mb-12">
            <h3>{{type.name}}</h3>

            <div class="max-h-96 shadow" style="overflow: scroll;">
                <table class="table striped mb-0">
                    <tbody>
                        <template v-for="space in spacing">
                            <tr>
                                <td class="w-1/2"><code>.{{type.code}}-{{space.name}}</code></td>
                                <td><code>{{type.type}}: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}};</code></td>
                            </tr>
                        </template>
                        <template v-for="space in spacing">
                            <tr>
                                <td class="w-1/2"><code>.{{type.code}}t-{{space.name}}</code></td>
                                <td><code>{{type.type}}-top: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}};</code></td>
                            </tr>
                        </template>
                        <template v-for="space in spacing">
                            <tr>
                                <td class="w-1/2"><code>.{{type.code}}b-{{space.name}}</code></td>
                                <td><code>{{type.type}}-bottom: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}};</code></td>
                            </tr>
                        </template>
                        <template v-for="space in spacing">
                            <tr>
                                <td class="w-1/2"><code>.{{type.code}}r-{{space.name}}</code></td>
                                <td><code>{{type.type}}-right: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}};</code></td>
                            </tr>
                        </template>
                        <template v-for="space in spacing">
                            <tr>
                                <td class="w-1/2"><code>.{{type.code}}l-{{space.name}}</code></td>
                                <td><code>{{type.type}}-left: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}};</code></td>
                            </tr>
                        </template>
                        <template v-for="space in spacing">
                            <tr>
                                <td class="w-1/2"><code>.{{type.code}}y-{{space.name}}</code></td>
                                <td>
                                    <code>
                                        {{type.type}}-top: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}}; <br>
                                        {{type.type}}-bottom: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}};
                                    </code>
                                </td>
                            </tr>
                        </template>
                        <template v-for="(space, index) in spacing">
                            <tr v-if="type.code === 'm' && index === 0">
                                <td class="w-1/2"><code>.mx-auto</code></td>
                                <td>
                                    <code>
                                        margin-left: auto; <br>
                                        margin-right: auto;
                                    </code>
                                </td>
                            </tr>
                            <tr>
                                <td class="w-1/2"><code>.{{type.code}}x-{{space.name}}</code></td>
                                <td>
                                    <code>
                                        {{type.type}}-left: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}}; <br>
                                        {{type.type}}-right: <span v-if="type.prefix">{{type.prefix}}</span>{{space.size}};
                                    </code>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import spacing from '../../content/style-maps/spacing.json';

    export default {
        name: 'SpacingMap',

        data() {
            return {
                spacing: spacing.spacing,
                types: [
                    {name: 'Padding', type: 'padding', code: 'p'},
                    {name: 'Margin', type: 'margin', code: 'm'},
                    {name: 'Negative Margin', type: 'margin', code: '-m', prefix: '-'}
                ]
            }
        },
    }
</script>