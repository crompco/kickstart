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
                <div class="row">
                    <div class="tab-half">
                        <div class="form-group">
                            <div class="label">Text</div>
                            <input type="text">
                        </div>
                        <div class="form-group">
                            <div class="label">Datepicker</div>
                            <ks-datepicker></ks-datepicker>
                        </div>
                    </div>
                    <div class="tab-half">
                        <div class="form-group">
                            <div class="label">select</div>
                            <ks-select name="foo" label-key="foo"></ks-select>
                        </div>
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


        <h3>Location Form</h3>
        <form class="basic-block">
            <div class="row">
                <div class="tab-half">
                    <div class="form-group">
                        <div class="label">Address</div>
                        <input type="text" name="address1" placeholder="Address 1">
                        <input type="text" name="address2" placeholder="Address 2">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tab-half">
                    <div class="form-group">
                        <div class="label">City</div>
                        <input type="text" name="city" placeholder="City">
                    </div>
                </div>
                <div class="tab-half">
                    <div class="form-group">
                        <div class="label">State</div>
                        <ks-select
                            name="state"
                            :items="states"
                            placeholder="Select State..."
                            label-key="state_name"
                            v-model="location.state"
                        ></ks-select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="tab-half">
                    <div class="form-group">
                        <div class="label">Zip</div>
                        <input type="text" name="zip" placeholder="Zip Code">
                    </div>
                </div>
                <div class="tab-half">
                    <div class="form-group">
                        <div class="label">Country</div>
                        <ks-select
                            name="country"
                            :items="countries"
                            label-key="country_name"
                            v-model="location.country"
                        ></ks-select>
                    </div>
                </div>
            </div>
            <ks-button>submit</ks-button>
        </form>

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
	import states from '../../src/helpers/states';

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
                location: {
                    address1: '',
                    address2: '',
                    city: '',
                    state: null,
                    zip: '',
                    country: null,
                },
				radioGroup: [],
                buttonGroup: [],
                states: states,
                countries: [
                    {
                        country: 'United States',
                        country_name: 'United States'
                    },
                    {
                        country: 'Canada',
                        country_name: "Canada"
                    }
                ]
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
