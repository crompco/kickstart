<template>
    <div class="col sm-full">
        <h2>Buttons</h2>
        <div class="basic-block">
            <h4>Basic Button</h4>
            <ks-button @click.prevent.stop="click_count++">Basic button</ks-button>
            <pre>Click Count: {{click_count}}</pre>
            <code-block>
                <template v-pre>
                &lt;ks-button @click.prevent.stop="click_count++">Basic button&lt;/ks-button>
                </template>
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
                <template v-pre>
                &lt;ks-button
                    :spin="spinning"
                    @click.prevent="spinning = !spinning"
                >
                    Spinning button
                &lt;/ks-button>
                </template>
            </code-block>
        </div>

        <div class="basic-block">
            <h4>Loading Button smaller size</h4>
            <div class="row row-collapse">
                <div class="col sm-6">
                    <ks-button
                        :spin="spinSmall"
                        @click.prevent="spinSmall = !spinSmall"
                        spin-size="tiny"
                    >
                        &checkmark;
                    </ks-button>
                </div>
                <div class="col sm-6">
                    <ks-button @click.prevent.stop="spinSmall = !spinSmall">
                        <template v-if="spinSmall">Stop</template>
                        <template v-else>Start</template>
                    </ks-button>
                </div>
            </div>
            <pre>Spinning (small): {{spinSmall}}</pre>
            <code-block>
                <template v-pre>
                &lt;ks-button
                    :spin="spinning"
                    @click.prevent="spinSmall = !spinSmall"
                    spin-size="tiny"
                >
                    &checkmark;
                &lt;/ks-button>
                </template>
            </code-block>
        </div>

        <div class="basic-block">
            <h4>Loading Button in modal</h4>
            <div class="row">
                <ks-button @click="$refs.modal.open()">Open Modal</ks-button>
                <ks-modal ref="modal">
                    <p>Some thing that needs to load</p>
                    <div slot="footer">
                        <ks-button @click.prevent="spinModal = true" class="button" :spin="spinModal">Yes</ks-button>
                        <ks-button :outline="true" class="button outline" @click.prevent="spinModal = false">Stop</ks-button>
                    </div>
                </ks-modal>
            </div>
            <pre>Spinning: {{spinModal}}</pre>
            <code-block>
                <template v-pre>
                &lt;ks-button @click="$refs.modal.open()">Open Modal&lt;/ks-button>
                &lt;ks-modal ref="modal">
                    &lt;div slot="footer">
                        &lt;ks-button @click.prevent="spinModal = true" class="button" :spin="spinModal">Yes&lt;/ks-button>
                        &lt;ks-button :outline="true" class="button outline" @click.prevent="spinModal = false">Stop&lt;/ks-button>
                    &lt;/div>
                &lt;/ks-modal>
                </template>
            </code-block>
        </div>

        <ks-tabs>
            <ks-tab title="Props">
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
                            <td>spinSize</td>
                            <td>String</td>
                            <td>small</td>
                            <td>The size of the button spinner (small, tiny). Tiny is helpful for smaller width buttons</td>
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
                click_count: 0,
                spinning: false,
                spinSmall: false,
                spinModal: false,
            }
        },

        components: {
            KsButton
        }
    }
</script>
