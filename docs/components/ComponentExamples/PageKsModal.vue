<template>
    <div>
        <!-- Simple Modal -->
        <div class="basic-block">

            <div class="row">
                <div class="col sm-full med-half">
                    <button class="button" @click.prevent="$refs.modal1.open()">
                        Simple Modal
                    </button>

                    <ks-modal title="Simple Modal" ref="modal1">
                        <p>
                            This is a simple modal with just a title and content
                        </p>
                    </ks-modal>
                    <code-block>
                        <template v-pre>
                            &lt;button class="button" @click.prevent="$refs.modal1.open()">
                                Simple Modal
                            &lt;/button>

                            &lt;ks-modal title="Simple Modal" ref="modal1">
                                &lt;p>
                                    This is a simple modal with just a title and content
                                &lt;/p>
                            &lt;/ks-modal>
                        </template>
                    </code-block>
                </div>
                <div class="col sm-full med-half">
                    <button class="button" @click.prevent="openModal2()">
                        Modal with buttons
                    </button>

                    <ks-modal title="Modal with buttons" ref="modal2" >
                        <ks-loader-spin size="medium" :show="showLoader"></ks-loader-spin>
                        <p v-show="!showLoader">
                            This is a simple modal with just a title and content
                        </p>
                        <div slot="footer">
                            <button class="button">Yes</button>
                            <button class="button" @click.prevent="$refs.modal2.close()">Cancel</button>
                        </div>
                    </ks-modal>

                    <code-block>
                        <template v-pre>
                            &lt;button class="button" @click.prevent="$refs.modal2.open()">
                                Modal with buttons
                            &lt;/button>

                            &lt;ks-modal title="Modal with buttons" ref="modal2" >
                                &lt;p>
                                    This is a simple modal with just a title and content
                                &lt;/p>
                                &lt;div slot="footer">
                                    &lt;button class="button">Yes&lt;/button>
                                    &lt;button class="button" @click.prevent="$refs.modal2.close()">Cancel&lt;/button>
                                &lt;/div>
                            &lt;/ks-modal>
                        </template>
                    </code-block>
                </div>

                <!-- Danger button modal -->
                <div class="col sm-full med-half">
                    <button class="button danger" @click.prevent="$refs.modal_danger.open()">
                        Danger Modal
                    </button>

                    <ks-modal title="Modal Danger" ref="modal_danger" :danger="true">
                        <p>
                            Be careful with this action!
                        </p>
                        <div slot="footer">
                            <button class="button danger">Yes, Delete</button>
                            <button class="button" @click.prevent="$refs.modal_danger.close()">Cancel</button>
                        </div>
                    </ks-modal>

                    <code-block>
                        <template v-pre>
                            &lt;button class="button danger" @click.prevent="$refs.modal_danger.open()">
                                Danger Modal
                            &lt;/button>

                            &lt;ks-modal title="Modal Danger" ref="modal_danger" :danger="true">
                                &lt;p>
                                    Be careful with this action!
                                &lt;/p>
                                &lt;div slot="footer">
                                    &lt;button class="button danger">Yes, Delete&lt;/button>
                                    &lt;button class="button" @click.prevent="$refs.modal_danger.close()">Cancel&lt;/button>
                                &lt;/div>
                            &lt;/ks-modal>
                        </template>
                    </code-block>
                </div>
                <div class="col sm-full med-half">
                    <button class="button" @click.prevent="$refs.modal3.open()">
                        Modal without header
                    </button>

                    <ks-modal :show-header="false" ref="modal3">
                        <p>
                            This is a simple modal without a title and only content
                        </p>
                        <em>
                            Click on the mask to close
                        </em>
                    </ks-modal>

                    <code-block>
                        <template v-pre>
                            &lt;button class="button" @click.prevent="$refs.modal3.open()">
                                Modal without header
                            &lt;/button>

                            &lt;ks-modal :show-header="false" ref="modal3">
                                &lt;p>
                                    This is a simple modal without a title and only content
                                &lt;/p>
                                &lt;em>
                                    Click on the mask to close
                                &lt;/em>
                            &lt;/ks-modal>
                        </template>
                    </code-block>
                </div>
                <div class="col sm-full med-half">
                    <button class="button" @click.prevent="$refs.modal4.open()">
                        Modal with a lot of content
                    </button>

                    <ks-modal title="Modal with buttons" ref="modal4">
                        <div>

                            <p>
                                Lorem ipsum dolor sit amet, quo virtute admodum persecuti in.
                                Eu ullum vivendo est, praesent dignissim ut quo, sed inermis conclusionemque te.
                                Has an epicuri appellantur. Vel eu argumentum persequeris.
                                Ex sed quas atomorum, et consul epicuri vituperata vel. Mel ex dicit bonorum reprehendunt.
                                Accumsan constituam te vim, ut malis soleat doming est.
                            </p>

                            <p>
                                Per in quis iisque perpetua, ut probo delectus his. Purto novum repudiandae id vix,
                                eam ei dolores perpetua. In sea summo ridens iudicabit, tota dicunt vel in. Dolores
                                conclusionemque no mei, ut duo dolorum consetetur, mel cu diam oporteat. Vel cu graeci audire.
                                Idque menandri oportere ut per, id usu ipsum elitr, sed no eirmod necessitatibus.
                            </p>

                            <p>
                                His ex putant postulant, te epicurei theophrastus vim, probatus recusabo ius id. Mel
                                integre impedit maiorum at, nam modus nullam et. Eam ne neglegentur suscipiantur,
                                duo percipit oportere ei. Facete doctus comprehensam et his, phaedrum reprehendunt ex pro,
                                ea has laoreet voluptaria. Erant officiis in qui, eam ei inani corrumpit. At quo recusabo
                                consequuntur, vim te mazim quaeque, cu pri natum invidunt.
                            </p>

                            <br/>
                            <p>
                                Purto veniam sed in, ut pro ridens appetere, nam in odio eleifend. Mel no ullum eruditi
                                concludaturque, qui cotidieque comprehensam id, in per partem facilisi volutpat.
                                Choro eruditi ea nam, discere tacimates ex vim. Pro populo lucilius erroribus in,
                                te erat animal offendit vim. No his brute debitis definiebas. Cibo natum ex est.
                            </p>

                            <p>
                                Quot petentium cu mel, everti temporibus cu pri. Te eum summo theophrastus.
                                Ancillae interpretaris an pri, elit omnis utroque eu sea, est porro aperiam hendrerit ne.
                                Virtute blandit at pri, est dissentias dissentiunt no. Vel cu malis dissentiet,
                                at ius inimicus conceptam referrentur.
                            </p>

                            <p>
                                Lorem ipsum dolor sit amet, quo virtute admodum persecuti in.
                                Eu ullum vivendo est, praesent dignissim ut quo, sed inermis conclusionemque te.
                                Has an epicuri appellantur. Vel eu argumentum persequeris.
                                Ex sed quas atomorum, et consul epicuri vituperata vel. Mel ex dicit bonorum reprehendunt.
                                Accumsan constituam te vim, ut malis soleat doming est.
                            </p>

                            <p>
                                Per in quis iisque perpetua, ut probo delectus his. Purto novum repudiandae id vix,
                                eam ei dolores perpetua. In sea summo ridens iudicabit, tota dicunt vel in. Dolores
                                conclusionemque no mei, ut duo dolorum consetetur, mel cu diam oporteat. Vel cu graeci audire.
                                Idque menandri oportere ut per, id usu ipsum elitr, sed no eirmod necessitatibus.
                            </p>

                            <br/>
                            <p>
                                His ex putant postulant, te epicurei theophrastus vim, probatus recusabo ius id. Mel
                                integre impedit maiorum at, nam modus nullam et. Eam ne neglegentur suscipiantur,
                                duo percipit oportere ei. Facete doctus comprehensam et his, phaedrum reprehendunt ex pro,
                                ea has laoreet voluptaria. Erant officiis in qui, eam ei inani corrumpit. At quo recusabo
                                consequuntur, vim te mazim quaeque, cu pri natum invidunt.
                            </p>

                            <p>
                                Purto veniam sed in, ut pro ridens appetere, nam in odio eleifend. Mel no ullum eruditi
                                concludaturque, qui cotidieque comprehensam id, in per partem facilisi volutpat.
                                Choro eruditi ea nam, discere tacimates ex vim. Pro populo lucilius erroribus in,
                                te erat animal offendit vim. No his brute debitis definiebas. Cibo natum ex est.
                            </p>

                            <p>
                                Quot petentium cu mel, everti temporibus cu pri. Te eum summo theophrastus.
                                Ancillae interpretaris an pri, elit omnis utroque eu sea, est porro aperiam hendrerit ne.
                                Virtute blandit at pri, est dissentias dissentiunt no. Vel cu malis dissentiet,
                                at ius inimicus conceptam referrentur.
                            </p>
                        </div>
                        <div slot="footer">
                            <button class="button">Yes</button>
                            <button class="button" @click.prevent="$refs.modal4.close()">Cancel</button>
                        </div>
                    </ks-modal>

                    <code-block>
                        <template v-pre>
                            &lt;button class="button" @click.prevent="$refs.modal4.open()">
                                Modal with a lot of content
                            &lt;/button>

                            &lt;ks-modal title="Modal with buttons" ref="modal4">
                                &lt;div>

                                    &lt;p>
                                    Lorem ipsum dolor sit amet, quo virtute admodum persecuti in.
                                    Eu ullum vivendo est, praesent dignissim ut quo, sed inermis conclusionemque te.
                                    Has an epicuri appellantur. Vel eu argumentum persequeris.
                                    Ex sed quas atomorum, et consul epicuri vituperata vel. Mel ex dicit bonorum reprehendunt.
                                    Accumsan constituam te vim, ut malis soleat doming est.
                                    &lt;/p>

                                    ...
                                &lt;/div>
                                &lt;div slot="footer">
                                    &lt;button class="button">Yes&lt;/button>
                                    &lt;button class="button" @click.prevent="$refs.modal4.close()">Cancel&lt;/button>
                                &lt;/div>
                            &lt;/ks-modal>
                        </template>
                    </code-block>
                </div>
                <div class="col sm-full med-half">
                    <button class="button" @click.prevent="$refs.modal5.open()">
                        Modal with Select
                    </button>

                    <ks-modal title="Modal with buttons" ref="modal5" >
                        <p>
                            This is a simple modal with a select.
                        </p>

                        <p>
                            Adding more text to push the modal down
                        </p>
                        <p>
                            to test behaviour at the bottom of the modal.
                        </p>

                        <ks-select
                            name="code"
                            :items="countries"
                            label-key="name"
                            v-model="country_code"
                            list-height="250px"
                        >
                            <template v-slot="{item}">{{item.name}}</template>
                        </ks-select>
                        <div slot="footer">
                            <button class="button error">Yes</button>
                            <button class="button" @click.prevent="$refs.modal5.close()">Cancel</button>
                        </div>
                    </ks-modal>

                    <code-block>
                        <template v-pre>
                            &lt;button class="button" @click.prevent="$refs.modal5.open()">
                                Modal with Select
                            &lt;/button>

                            &lt;ks-modal title="Modal with buttons" ref="modal5" >
                                &lt;p>
                                    This is a simple modal with a select
                                &lt;/p>

                                &lt;ks-select
                                    name="code"
                                    :items="countries"
                                    label-key="name"
                                    v-model="country_code"
                                    list-height="150px"
                                >
                                    &lt;template v-slot="{item}">{{item.name}}&lt;/template>
                                &lt;/ks-select>
                                &lt;div slot="footer">
                                    &lt;button class="button error">Yes&lt;/button>
                                    &lt;button class="button" @click.prevent="$refs.modal5.close()">Cancel&lt;/button>
                                &lt;/div>
                            &lt;/ks-modal>
                        </template>
                    </code-block>

                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import KsModal from '../../../src/components/KsModal.vue';
    import KsTabs from '../../../src/components/KsTabs.vue';
    import KsTab from '../../../src/components/KsTab.vue';
    import KsSelect from '../../../src/components/KsSelect.vue';
    import api from '../../../src/helpers/api';
    import KsLoaderSpin from '../../../src/components/KsLoaderSpin.vue';

    export default {
        name: 'PageKsModal',

        data() {
            return {
                countries: [],
                country_code: '',
                showLoader: false,
            };
        },

        mounted() {
            api.get('/countries.json').then((data) => {
                this.countries = data;
            });
        },

        methods: {
            openModal(modal) {
                this.$refs[modal].open();
            },
            closeModal(modal) {
                this.$refs[modal].close();
            },
            openModal2() {
                this.showLoader = true
                this.$refs.modal2.open()

                setTimeout(() => {
                    this.showLoader = false
                }, 200);
            }
        },

        components: {
            KsModal,
            KsTabs,
            KsTab,
            KsSelect,
            KsLoaderSpin,
        }
    }
</script>
