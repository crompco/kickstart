<template>
    <div>
        <table class="ks-table striped shadow">
            <tbody>
            <template v-for="type in types">
                <tr>
                    <td class="w-1/2">.{{type.code}}</td>
                    <td><code>{{type.property}}-width: 1px;</code></td>
                </tr>
                <template v-for="space in sizing">
                    <tr>
                        <td class="w-1/2">.{{type.code}}-{{space.name}}</td>
                        <td><code>{{type.property}}-width: {{space.size}}</code></td>
                    </tr>
                </template>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'BorderSizeMap',

        data() {
            return {
                types: [
                    {'property': 'border', 'code': 'border'},
                    {'property': 'border-top', 'code': 'border-t'},
                    {'property': 'border-bottom', 'code': 'border-b'},
                    {'property': 'border-right', 'code': 'border-r'},
                    {'property': 'border-left', 'code': 'border-l'},
                ],
                sizing: [
                    {name: '0', size: '0'},
                    {name: '2', size: '2px'},
                    {name: '4', size: '4px'},
                    {name: '8', size: '8px'},
                ]
            }
        },
    }
</script>