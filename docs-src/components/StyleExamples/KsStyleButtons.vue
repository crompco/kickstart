<template>
    <div>
        <div class="basic-block">
            <div class="row">
                <div>Default</div>
                <hr>
                <div class="sm-12">
                    <button class="ks-button">
                        I'm a default button
                    </button>
                    <a href="#" class="ks-button tiny">
                        I'm a tiny button
                    </a>
                    <a href="#" class="ks-button small">
                        I'm a small button
                    </a>
                    <a href="#" class="ks-button large danger">
                        I'm a large button
                    </a>
                    <a href="#" class="ks-button large success">
                        I'm a large button
                    </a>
                </div>
            </div>
            <code-block>
                <template v-pre>
                    // Can be used with an anchor tag or button tag

                    &lt;button class="ks-button">
                        I'm a default button
                    &lt;/button>
                    &lt;a href="#" class="ks-button tiny">
                        I'm a tiny button
                    &lt;/a>
                    &lt;a href="#" class="ks-button small">
                        I'm a small button
                    &lt;/a>
                    &lt;a href="#" class="ks-button large danger">
                        I'm a large button
                    &lt;/a>
                </template>
            </code-block>
            <br>
            <div class="row">
                <div>Outline</div>
                <hr>
                <div class="sm-12">
                    <button class="ks-button outline disabled" disabled="disabled">
                        I'm a default button
                    </button>
                    <a href="#" class="ks-button outline tiny">
                        I'm a tiny button
                    </a>
                    <a href="#" class="ks-button outline small">
                        I'm a small button
                    </a>
                    <a href="#" class="ks-button outline large danger">
                        I'm a large button
                    </a>
                    <a href="#" class="ks-button outline large success">
                        I'm a large button
                    </a>
                </div>
            </div>
            <code-block class="mt-2">
                <template v-pre>
                    &lt;button class="ks-button outline disabled" disabled="disabled">
                        I'm a default button
                    &lt;/button>
                    &lt;a href="#" class="ks-button outline tiny">
                        I'm a tiny button
                    &lt;/a>
                    &lt;a href="#" class="ks-button outline small">
                        I'm a small button
                    &lt;/a>
                    &lt;a href="#" class="ks-button outline large danger">
                        I'm a large button
                    &lt;/a>
                </template>
            </code-block>
            <br>
            <div class="row">
                <div>None</div>
                <hr>
                <div class="sm-12">
                    <button class="ks-button none disabled">
                        I'm a disabled button
                    </button>
                    <a href="#" class="ks-button none tiny">
                        I'm a tiny button
                    </a>
                    <a href="#" class="ks-button none small">
                        I'm a small button
                    </a>
                    <a href="#" class="ks-button none large danger">
                        I'm a large button
                    </a>
                    <a href="#" class="ks-button none large success">
                        I'm a large button
                    </a>
                </div>
            </div>
            <code-block class="mt-2">
                <template v-pre>
                    &lt;button class="ks-button none disabled">
                        I'm a disabled button
                    &lt;/button>
                    &lt;a href="#" class="ks-button none tiny">
                        I'm a tiny button
                    &lt;/a>
                    &lt;a href="#" class="ks-button none small">
                        I'm a small button
                    &lt;/a>
                    &lt;a href="#" class="ks-button none large danger">
                        I'm a large button
                    &lt;/a>
                </template>
            </code-block>
            <div>
                <table class="ks-table striped shadow">
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Hover Class</th>
                            <th>Value</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="color in colors">
                            <template v-if="typeof color.colors === 'string'">
                                <tr>
                                    <td><code>.bg-{{color.name}} (.text-red-500)</code></td>
                                    <td></td>
                                    <td><code>{{color.colors}}</code></td>
                                    <td>
                                        <button :class="`ks-button bg-${color.name} text-red-500`">{{color.name}}</button>
                                    </td>
                                </tr>
                            </template>
                            <template v-else v-for="(hex, weight) in color.colors">
                                <tr>
                                    <td>
                                        <code>.bg-{{color.name}}-{{weight}}</code>
                                    </td>
                                    <td>
                                        <code>.hover:bg-{{color.name}}-{{getHoverWeight(weight)}}</code>
                                    </td>
                                    <td><code>{{hex}}</code></td>
                                    <td>
                                        <button :class="`ks-button bg-${color.name}-${weight} hover:bg-${color.name}-${getHoverWeight(weight)}`">
                                            bg-{{color.name}}-{{weight}}
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </template>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import colors from '../../content/style-maps/colors.json';

    export default {
        name: 'Buttons',

        data() {
            return {
                colors: colors.colors,
            }
        },

        methods: {
            getHoverWeight(weight) {
                if ( weight === '900' ) {
                    return parseInt(weight) - 100;
                }

                return parseInt(weight) + 100;
            }
        }
    }
</script>
