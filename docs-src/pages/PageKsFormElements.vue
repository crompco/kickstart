<template>
	<div class="sm-full">
		<h3>Example Form</h3>
        <div class="basic-block collapse">
            <form>
                <div class="row">
                    <div class="tab-full">
                        <div class="form-group">
                            <div class="label">Username (with an error)</div>
                            <input type="text">
                            <div class="error-msg">Username is required</div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="tab-full">
                        <div class="form-group">
                            <div class="label">Autocomplete</div>
                            <ks-autocomplete></ks-autocomplete>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="tab-half">
                        <ks-checkbox-group
                                class="form-group"
                                name="group2"
                                :options="buttonGroup"
                                :buttons="true"
                                value-key="code"
                                label-key="name"
                                v-model="values.checkbox3"
                        >
                            Checkbox Button Set
                        </ks-checkbox-group>
                    </div>
                    <div class="tab-half">
                        <ks-radio-group
                                class="form-group"
                                name="group2"
                                :options="buttonGroup"
                                :buttons="true"
                                value-key="code"
                                label-key="name"
                                v-model="values.group3"
                        >
                            Radio Button Set
                        </ks-radio-group>
                    </div>
                </div>
                <div class="row">
                    <div class="tab-half">
                        <div class="form-group">
                            <div class="label">First Name</div>
                            <input type="text">
                        </div>
                    </div>
                    <div class="tab-half">
                        <div class="form-group">
                            <div class="label">Last Name</div>
                            <input type="text">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="tab-half">
                        <div class="form-group">
                            <div class="label">Password</div>
                            <input type="password">
                        </div>
                    </div>
                    <div class="tab-half">
                        <div class="form-group">
                            <div class="label">Password Confirmation</div>
                            <input type="password">
                        </div>
                    </div>
                </div>
            </form>
            <code-block v-pre>
                &lt;form>
                    &lt;div class="row">
                        &lt;div class="tab-full">
                            &lt;div class="form-group">
                                &lt;div class="label">Username (with an error)&lt;/div>
                                &lt;input type="text">
                                &lt;div class="error-msg">Username is required&lt;/div>
                            &lt;/div>
                        &lt;/div>
                    &lt;/div>
                    &lt;div class="row">
                        &lt;div class="tab-full">
                            &lt;div class="form-group">
                                &lt;div class="label">Autocomplete&lt;/div>
                                &lt;ks-autocomplete>&lt;/ks-autocomplete>
                            &lt;/div>
                        &lt;/div>
                    &lt;/div>
                    &lt;div class="row">
                        &lt;div class="tab-half">
                            &lt;ks-checkbox-group
                                class="form-group"
                                name="group2"
                                :options="buttonGroup"
                                :buttons="true"
                                value-key="code"
                                label-key="name"
                                v-model="values.checkbox3"
                            >
                                Checkbox Button Set
                            &lt;/ks-checkbox-group>
                        &lt;/div>
                        &lt;div class="tab-half">
                            &lt;ks-radio-group
                                class="form-group"
                                name="group2"
                                :options="buttonGroup"
                                :buttons="true"
                                value-key="code"
                                label-key="name"
                                v-model="values.group3"
                            >
                                Radio Button Set
                            &lt;/ks-radio-group>
                        &lt;/div>
                    &lt;/div>
                    &lt;div class="row">
                        &lt;div class="tab-half">
                            &lt;div class="form-group">
                                &lt;div class="label">First Name&lt;/div>
                                &lt;input type="text">
                            &lt;/div>
                        &lt;/div>
                        &lt;div class="tab-half">
                            &lt;div class="form-group">
                                &lt;div class="label">Last Name&lt;/div>
                                &lt;input type="text">
                            &lt;/div>
                        &lt;/div>
                    &lt;/div>
                    &lt;div class="row">
                        &lt;div class="tab-half">
                            &lt;div class="form-group">
                                &lt;div class="label">Password&lt;/div>
                                &lt;input type="password">
                            &lt;/div>
                        &lt;/div>
                        &lt;div class="tab-half">
                            &lt;div class="form-group">
                                &lt;div class="label">Password Confirmation&lt;/div>
                                &lt;input type="password">
                            &lt;/div>
                        &lt;/div>
                    &lt;/div>
                &lt;/form>
            </code-block>
        </div>


		<div style="height: 300px;"></div>
	</div>
</template>


<script>
	import KsRadio from '../../src/components/KsRadio.vue';
    import KsRadioGroup from '../../src/components/KsRadioGroup.vue';
    import KsCheckboxGroup from '../../src/components/KsCheckboxGroup.vue';
	import KsCheckbox from '../../src/components/KsCheckbox.vue';
	import api from '../../src/helpers/api';
	import KsAutocomplete from '../../src/components/KsAutocomplete.vue';

	export default {
		name: 'PageKsFormElements',

		props: {},

		data() {

			return {
				values: {
					group1: '',
					group2: '',
					group3: '',
					radio1: 1,
					radio1a: '',
					checkbox1: [1],
					checkbox1a: [],
                    checkbox2: [],
                    checkbox3: [],
                    checkboxButtons: [],
                    radioButtons: []
				},
				radioGroup: [],
                buttonGroup: [],
			};
		},

		computed: {},

		mounted() {
			api.get('/countries.json').then((data) => {
                this.radioGroup = data.slice(0, 7);
                this.buttonGroup = data.slice(0, 3);
			});
		},

		methods: {
			change(name, checked, optionValue) {
				if ( name.match(/^checkbox.*/) ) {
					if ( !checked ) {
						this.values[name] = this.values[name].splice(this.values[name].indexOf(optionValue), 1);
					} else {
						this.values[name].push(optionValue);
					}
				} else {
					this.values[name] = checked;
				}
			}
		},

		watch: {},

		components: {
			KsRadio,
			KsRadioGroup,
			KsCheckbox,
            KsAutocomplete,
            KsCheckboxGroup
		}
	}
</script>

<style></style>
