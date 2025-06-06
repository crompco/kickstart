<template>
    <div>
        <h2>Flexbox</h2>

        <h4>Flex Direction</h4>
        <styles-table :classes="direction"></styles-table>

        <h4>Flex Wrap</h4>
        <styles-table :classes="wrap"></styles-table>

        <h4>Flex Align</h4>
        <styles-table :classes="align"></styles-table>

        <h4>Flex Justify Content</h4>
        <styles-table :classes="justify"></styles-table>

        <h4>Flex Align Self</h4>
        <styles-table :classes="alignSelf"></styles-table>
    </div>
</template>

<script>
    export default {
        props: {
            data: {}
        },

        computed: {
            direction() {
                return this.data?.data?.direction;
            },

            wrap() {
                return this.data?.data?.wrap;
            },

            align() {
                return this.data?.data?.align;
            },

            justify() {
                return this.data?.data?.justify;
            },

            alignSelf() {
                return this.data?.data?.['align-self'];
            },
        },
    }
</script>

