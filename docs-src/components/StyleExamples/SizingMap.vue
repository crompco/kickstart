<template>
    <div>
        <div>
            <ul class="mt-0">
                <li v-for="type in types">
                    <a :href="`#${type.type}`" class="text-blue-700 hover:text-blue-500">{{type.name}}</a>
                </li>
            </ul>
        </div>

        <div v-for="type in types" class="mb-12">
            <h3 :id="type.type">{{type.name}}</h3>

            <div class="max-h-96 shadow" style="overflow: scroll;">
                <table class="ks-table striped mb-0">
                    <tbody>
                        <template v-for="space in getSizes(type)">
                            <tr>
                                <td class="w-1/2">.{{type.code}}-{{space.name}}</td>
                                <td><code>{{type.type}}: {{space.size}}</code></td>
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
        name: 'SizingMap',

        data() {
            return {
                spacing: spacing.spacing,
                percent: spacing.percent,
                types: [
                    {name: 'Height', type: 'height', code: 'h', percent: 1},
                    {name: 'Min Height', type: 'min-height', code: 'min-h'},
                    {name: 'Max Height', type: 'max-height', code: 'max-h'},
                    {name: 'Width', type: 'width', code: 'w', percent: 1},
                    {name: 'Min Width', type: 'min-width', code: 'min-w'},
                    {name: 'Max Width', type: 'max-width', code: 'max-w'},
                ]
            }
        },

        methods: {
            getSizes(type) {
                if ( type?.percent ) {
                    let sizes = this.spacing.concat(this.percent);
                    if ( type.type === 'width' ) {
                        sizes.push({name: 'full', size: '100%'});
                    }

                    return sizes;
                }

                return this.spacing;
            },
        },
    }
</script>