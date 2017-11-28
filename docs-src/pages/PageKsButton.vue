<template>
    <div class="col sm-full">
        <h2>Buttons</h2>
        <div class="basic-block">
            <h4>Basic Button</h4>
            <ks-button @click.prevent.stop="click_count++">Basic button</ks-button>
            <pre>Click Count: {{click_count}}</pre>
            <code-block>
                &lt;ks-button @click.prevent.stop="click_count++">Basic button&lt;/ks-button>
            </code-block>
        </div>
        <div class="basic-block">
            <h4>Loading Button</h4>
            <div class="row row-collapse">
                <div class="col sm-6">
                    <ks-button
                        :spin="spinning"
                        @click.prevent="spinning = !spinning"
                    >
                        Spinning button
                    </ks-button>
                </div>
                <div class="col sm-6">
                    <ks-button @click.prevent.stop="spinning = !spinning">
                        <template v-if="spinning">Stop</template>
                        <template v-else>Start</template>
                    </ks-button>
                </div>
            </div>
            <pre>Spinning: {{spinning}}</pre>
            <code-block>
                &lt;ks-button
                    :spin="spinning"
                    @click.prevent="spinning = !spinning"
                >
                    Spinning button
                &lt;/ks-button>
            </code-block>
        </div>


        <ks-tabs>
            <ks-tab title="Props">
                <h3>Line</h3>
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>disabled</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Whether the button is disabled or not</td>
                        </tr>
                        <tr>
                            <td>danger</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Styles the button with the danger style (red)</td>
                        </tr>
                        <tr>
                            <td>outline</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Styles the button with the outline style</td>
                        </tr>
                        <tr>
                            <td>spin</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Shows the spinner on the button</td>
                        </tr>
                        <tr>
                            <td>spinColor</td>
                            <td>String</td>
                            <td>null</td>
                            <td>The color of the spinner</td>
                        </tr>
                        <tr>
                            <td>tiny</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Changes the size of the button</td>
                        </tr>
                        <tr>
                            <td>small</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Changes the size of the button</td>
                        </tr>
                        <tr>
                            <td>large</td>
                            <td>Boolean</td>
                            <td>false</td>
                            <td>Changes the size of the button</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
            <ks-tab title="Events">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Payload</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>click</td>
                            <td>clickevent</td>
                            <td>Fired when the button is clicked</td>
                        </tr>
                        <tr>
                            <td>focus</td>
                            <td>focusevent</td>
                            <td>Fired when the button is focused</td>
                        </tr>
                        <tr>
                            <td>blur</td>
                            <td>blurevent</td>
                            <td>Fired when the button is blurred</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>
    </div>
</template>

<script>

    import KsButton from '../../src/components/KsButton.vue';

    export default {
        name: 'PageButton',

        props: [],

        data() {
            return {
                spinning: false,
                click_count: 0
            }
        },

        components: {
            KsButton
        }
    }
</script>
