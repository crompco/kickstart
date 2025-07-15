<template>
    <div>
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
                <ks-button @click="openModal">Open Modal</ks-button>
                <ks-modal ref="modal">
                    <p>Some thing that needs to load</p>
                    <div slot="footer">
                        <ks-button @click.prevent="spinModal = true" :spin="spinModal">Yes</ks-button>
                        <ks-button :outline="true" @click.prevent="spinModal = false">Stop</ks-button>
                    </div>
                </ks-modal>
            </div>
            <pre>Spinning: {{spinModal}}</pre>
            <code-block>
                <template v-pre>
                    &lt;ks-button @click="$refs.modal.open()">Open Modal&lt;/ks-button>
                    &lt;ks-modal ref="modal">
                        &lt;div slot="footer">
                            &lt;ks-button @click.prevent="spinModal = true" :spin="spinModal">Yes&lt;/ks-button>
                            &lt;ks-button :outline="true" @click.prevent="spinModal = false">Stop&lt;/ks-button>
                        &lt;/div>
                    &lt;/ks-modal>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    import KsButton from '../../../src/components/KsButton.vue';

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

        methods: {
            openModal(e) {
                e.preventDefault();

                this.$refs.modal.open()
            },
        },

        components: {
            KsButton
        }
    }
</script>
