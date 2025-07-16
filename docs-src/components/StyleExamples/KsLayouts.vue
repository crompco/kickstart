<template>
    <div>
        <h2>Flexbox</h2>

        <h4>Flex</h4>
        <styles-table :classes="flex"></styles-table>

        <h4>Flex Direction</h4>
        <styles-table :classes="direction"></styles-table>

        <h4>Flex Wrap</h4>
        <styles-table :classes="wrap"></styles-table>

        <h4>Flex Align</h4>
        <styles-table :classes="align"></styles-table>

        <h4>Flex Content</h4>
        <styles-table :classes="content"></styles-table>

        <h4>Flex Justify Content</h4>
        <styles-table :classes="justify"></styles-table>

        <h4>Flex Align Self</h4>
        <styles-table :classes="alignSelf"></styles-table>

        <h4>Flex Basis</h4>
        <div class="max-h-96 shadow" style="overflow: scroll">
            <table class="ks-table striped mb-0">
                <tbody>
                    <template v-for="space in basis">
                        <tr>
                            <td class="w-1/2">.basis-{{space.name}}</td>
                            <td><code>flex-basis: {{space.size}}</code></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import spacing from '../../content/style-maps/spacing.json';

    export default {
        props: {
            data: {}
        },

        computed: {
            flex() {
                return this.data?.data?.flex;
            },

            direction() {
                return this.data?.data?.direction;
            },

            wrap() {
                return this.data?.data?.wrap;
            },

            align() {
                return this.data?.data?.align;
            },

            content() {
                return this.data?.data?.content;
            },

            justify() {
                return this.data?.data?.justify;
            },

            alignSelf() {
                return this.data?.data?.['align-self'];
            },

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

