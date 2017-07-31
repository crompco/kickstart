<template>
	<div>
		<h2>Modal</h2>

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
                    <code-block v-pre>
                            &lt;button class="button" @click.prevent="$refs.modal1.open()">
                                Simple Modal
                            &lt;/button>

                            &lt;ks-modal title="Simple Modal" ref="modal1">
                                &lt;p>
                                    This is a simple modal with just a title and content
                                &lt;/p>
                            &lt;/ks-modal>
                    </code-block>
                </div>
                <div class="col sm-full med-half">
                    <button class="button" @click.prevent="$refs.modal2.open()">
                        Modal with buttons
                    </button>

                    <ks-modal title="Modal with buttons" ref="modal2" >
                        <p>
                            This is a simple modal with just a title and content
                        </p>
                        <div slot="footer">
                            <button class="button">Yes</button>
                            <button class="button" @click.prevent="$refs.modal2.close()">Cancel</button>
                        </div>
                    </ks-modal>

                    <code-block v-pre>
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

                    <code-block v-pre>
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

                    <code-block v-pre>
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

                    <code-block v-pre>
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
                    </code-block>
                </div>
                <div class="col sm-full med-half">
                    <button class="button" @click.prevent="$refs.modal5.open()">
                        Modal with Select
                    </button>

                    <ks-modal title="Modal with buttons" ref="modal5" >
                        <p>
                            This is a simple modal with a select
                        </p>

                        <ks-select
                            name="code"
                            :items="countries"
                            label-key="name"
                            v-model="country_code"
                            list-height="150px"
                        >
                            <template scope="props">{{props.item.name}}</template>
                        </ks-select>
                        <div slot="footer">
                            <button class="button error">Yes</button>
                            <button class="button" @click.prevent="$refs.modal5.close()">Cancel</button>
                        </div>
                    </ks-modal>

                    <code-block v-pre>
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
                                    &lt;template scope="props">{{props.item.name}}&lt;/template>
                                &lt;/ks-select>
                                &lt;div slot="footer">
                                    &lt;button class="button error">Yes&lt;/button>
                                    &lt;button class="button" @click.prevent="$refs.modal5.close()">Cancel&lt;/button>
                                &lt;/div>
                            &lt;/ks-modal>
                    </code-block>

                </div>
            </div>
        </div>

		<div>
			<ks-tabs>
				<ks-tab title="Props">
					<table class="table striped">
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Default</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>title</td>
								<td>String</td>
								<td><pre>''</pre></td>
								<td>The title of the Modal. Displayed in the title bar.</td>
							</tr>
							<tr>
								<td>showHeader</td>
								<td>Boolean</td>
								<td><pre>false</pre></td>
								<td>Weather to show the header/titlebar</td>
							</tr>
							<tr>
								<td>showClose</td>
								<td>Boolean</td>
								<td><pre>true</pre></td>
								<td>Whether to show the close(x) button in the header/titlebar</td>
							</tr>
							<tr>
								<td>maxWidth</td>
								<td>String</td>
								<td><pre>'50%'</pre></td>
								<td>The maximum width that should be allowed for the modal</td>
							</tr>
                            <tr>
                                <td>minWidth</td>
                                <td>String</td>
                                <td><pre>NULL</pre></td>
                                <td>The minimum width that should be allowed for the modal</td>
                            </tr>
                            <tr>
                                <td>maxHeight</td>
                                <td>String</td>
                                <td><pre>NULL</pre></td>
                                <td>The maximum height that should be allowed for the modal</td>
                            </tr>
                            <tr>
                                <td>minHeight</td>
                                <td>String</td>
                                <td><pre>NULL</pre></td>
                                <td>The minimum height that should be allowed for the modal</td>
                            </tr>
							<tr>
								<td>closeOnEscape</td>
								<td>Boolean</td>
								<td><pre>true</pre></td>
								<td>Whether to close the modal when the user presses the 'escape' key</td>
							</tr>
                            <tr>
                                <td>danger</td>
                                <td>Boolean</td>
                                <td><pre>false</pre></td>
                                <td>Whether to add the danger styling to the modal</td>
                            </tr>
                            <tr>
                                <td>loading</td>
                                <td>Boolean</td>
                                <td><pre>false</pre></td>
                                <td>Whether to show a loading bar in the modal</td>
                            </tr>
						</tbody>
					</table>
				</ks-tab>

				<ks-tab title="Events">
					<table class="table striped events-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>open</td>
								<td>Fired when the modal is opened</td>
							</tr>
							<tr>
								<td>close</td>
								<td>Fired when the modal is closed</td>
							</tr>
						</tbody>
					</table>
				</ks-tab>

				<ks-tab title="Methods">
					<table class="table striped methods-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><pre>open()</pre></td>
								<td>used to open the modal</td>
							</tr>
                            <tr>
                                <td><pre>close()</pre></td>
                                <td>used to close the modal</td>
                            </tr>
                            <tr>
                                <td><pre>loadingOn()</pre></td>
                                <td>show loading bar</td>
                            </tr>
							<tr>
								<td><pre>loadingOff()</pre></td>
								<td>hide loading bar</td>
							</tr>
						</tbody>
					</table>
				</ks-tab>
                <ks-tab title="Slots">
                    <table class="table striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>default</td>
                                <td>This will be the content of the modal</td>
                            </tr>
                            <tr>
                                <td>header</td>
                                <td>This will be the header title. If you pass a title prop this isn't needed.</td>
                            </tr>
                            <tr>
                                <td>footer</td>
                                <td>This is where the buttons will be located or anything else that will be shown on the bottom of the modal.</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>
			</ks-tabs>
		</div>

		<!-- Need this to simulate the scrolling effect -->
		<div style="height: 1800px;">
			<br/>
		</div>
	</div>
</template>


<script>

	import KsModal from '../../src/components/KsModal.vue';
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';
	import KsSelect from '../../src/components/KsSelect.vue';
	import api from '../../src/helpers/api';

	export default {
		name: 'PageKsModal',

		props: {},

		data() {
			return {
			    countries: [],
				country_code: ''
			};
		},

		computed: {},

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
			}
		},

		watch: {},

		components: {
			KsModal,
			KsTabs,
			KsTab,
			KsSelect
		}
	}
</script>
