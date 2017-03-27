<template>
	<div>
		<h2>Modal</h2>

		<div class="callout">
			<button class="button" @click.prevent="openModal('modal1')">
				Simple Modal
			</button>

			<ks-modal title="Simple Modal" ref="modal1">
				<p>
					This is a simple modal with just a title and content
				</p>
			</ks-modal>

			<button class="button" @click.prevent="openModal('modal2')">
				Modal with buttons
			</button>

			<ks-modal title="Modal with buttons" ref="modal2">
				<p>
					This is a simple modal with just a title and content
				</p>
				<div slot="footer">
					<button class="button">Yes</button>
					<button class="button" @click.prevent="closeModal('modal2')">Cancel</button>
				</div>
			</ks-modal>


			<button class="button" @click.prevent="openModal('modal3')">
				Modal without header
			</button>

			<ks-modal title="Modal without header" :show-header="false" ref="modal3">
				<p>
					This is a simple modal without a title and only content
				</p>
				<em>
					Click on the mask to close
				</em>
			</ks-modal>

			<button class="button" @click.prevent="openModal('modal4')">
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
					<button class="button" @click.prevent="closeModal('modal4')">Cancel</button>
				</div>
			</ks-modal>


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
									<td>closeOnEscape</td>
									<td>Boolean</td>
									<td><pre>true</pre></td>
									<td>Whether to close the modal when the user presses the 'escape' key</td>
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
									<td><pre>close</pre></td>
									<td>used to close the modal</td>
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
	</div>
</template>


<script>

	import KsModal from '../../src/components/KsModal.vue';
	import KsTabs from '../../src/components/KsTabs.vue';
	import KsTab from '../../src/components/KsTab.vue';

	export default {
		name: 'PageKsModal',

		props: {},

		data() {
			return {};
		},

		computed: {},

		mounted() {

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
			KsTab
		}
	}
</script>
