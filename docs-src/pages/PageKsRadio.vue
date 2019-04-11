<template>
    <div>
        <h2>Radio Buttons</h2>
        <div class="basic-block">
            <div class="form-group">
                <div class="label">Radio buttons</div>
                <ks-radio label="PHP" name="radio1" value="1" v-model="values.radio1"></ks-radio>
                <ks-radio label="JavaScript" name="radio1" value="2" v-model="values.radio1"></ks-radio>
            </div>
            <code-block>
                <template v-pre>
                    &lt;div class="form-group">
                        &lt;div class="label">Which do you prefer&lt;/div>
                        &lt;ks-radio label="PHP" name="radio1" value="1" v-model="values.radio1">&lt;/ks-radio>
                        &lt;ks-radio label="JavaScript" name="radio1" value="2" v-model="values.radio1">&lt;/ks-radio>
                    &lt;/div>
                </template>
            </code-block>
        </div>
        <div class="basic-block">
            <div class="form-group">
                <div class="label">Radio buttons (inline)</div>
                <ks-radio :inline="true" label="PHP" name="radio2" value="1" v-model="values.radio2"></ks-radio>
                <ks-radio :inline="true" label="JavaScript" name="radio2" value="2" v-model="values.radio2"></ks-radio>
            </div>
            <code-block>
                <template v-pre>
                    &lt;div class="form-group">
                        &lt;div class="label">Radio buttons (inline)&lt;/div>
                        &lt;ks-radio :inline="true" label="PHP" name="radio1" value="1" v-model="values.radio1">&lt;/ks-radio>
                        &lt;ks-radio :inline="true" label="JavaScript" name="radio1" value="2" v-model="values.radio1">&lt;/ks-radio>
                    &lt;/div>
                </template>
            </code-block>
        </div>

        <div class="row row-collapse">
            <ks-tabs class="col sm-full">
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
                                <td>checked <span class="v-model">v-model</span></td>
                                <td><pre>[String, Boolean]</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>
                                    The v-model binded prop on the radio input. Should be provided via v-model.
                                    If only the prop is sent then you would need to listen for the input
                                    event to update the prop
                                </td>
                            </tr>
                            <tr>
                                <td>name</td>
                                <td><pre>String</pre></td>
                                <td><pre>''</pre></td>
                                <td>The name given to the input field</td>
                            </tr>
                            <tr>
                                <td>label</td>
                                <td><pre>String</pre></td>
                                <td><pre>''</pre></td>
                                <td>The label to be used for the radio button</td>
                            </tr>
                            <tr>
                                <td>value</td>
                                <td><pre>[String, Number]</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>
                                    The actual value of the radio button
                                </td>
                            </tr>
                            <tr>
                                <td>disabled</td>
                                <td><pre>Boolean</pre></td>
                                <td><pre>false</pre></td>
                                <td>
                                    Whether the radio is disabled or not
                                </td>
                            </tr>
                            <tr>
                                <td>inline</td>
                                <td><pre>Boolean</pre></td>
                                <td><pre>false</pre></td>
                                <td>
                                    If set true the radio will be displayed inline
                                </td>
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
                                <td><pre>input</pre></td>
                                <td>This is fired when the checked value is changed</td>
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
                                <td><pre>toggle()</pre></td>
                                <td>Toggles the value of the radio</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>
            </ks-tabs>
        </div>

        <h2>Radio Button Groups</h2>

        <div class="basic-block">
            <ks-radio-group
                class="form-group"
                name="group1"
                :options="radioGroup"
                value-key="code"
                label-key="name"
                v-model="values.group1"
            >
                Radio button groups
            </ks-radio-group>

            <code-block>
                &lt;ks-radio-group
                    class="form-group"
                    name="group1"
                    :options="radioGroup"
                    value-key="code"
                    label-key="name"
                    v-model="values.group1"
                >
                    Radio button groups
                &lt;/ks-radio-group>
            </code-block>
        </div>

        <div class="basic-block">
            <ks-radio-group
                class="form-group"
                name="group2"
                :buttons="true"
                :options="buttonGroup"
                value-key="code"
                label-key="name"
                v-model="values.group2"
            >
                Radio button groups ( button style ) with custom button template
                <div slot="AF">Afghanistan Man</div>
            </ks-radio-group>

            <code-block>
                &lt;ks-radio-group
                    class="form-group"
                    name="group2"
                    :buttons="true"
                    :options="buttonGroup"
                    value-key="code"
                    label-key="name"
                    v-model="values.group2"
                >
                    Radio button groups ( button style )
                    &lt;div slot="AF">Afghanistan Man&lt;/div>
                &lt;/ks-radio-group>
            </code-block>
        </div>

        <div class="row row-collapse">
            <ks-tabs class="col sm-full">
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
                                <td>value <span class="v-model">v-model</span></td>
                                <td><pre>[String, Boolean]</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>
                                    The v-model binded prop on the radio input. Should be provided via v-model.
                                    If only the prop is sent then you would need to listen for the input
                                    event to update the prop
                                </td>
                            </tr>
                            <tr>
                                <td>label</td>
                                <td><pre>String</pre></td>
                                <td><pre>''</pre></td>
                                <td>The label to be used for the radio button</td>
                            </tr>
                            <tr>
                                <td>name <span class="required">*</span></td>
                                <td><pre>String</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>
                                    The actual value of the radio button
                                </td>
                            </tr>
                            <tr>
                                <td>options</td>
                                <td><pre>Array</pre></td>
                                <td><pre>[]</pre></td>
                                <td>
                                    An array of objects <pre>[{Option1}, {Options2}...]</pre>
                                </td>
                            </tr>
                            <tr>
                                <td>valueKey</td>
                                <td><pre>[String, Number]</pre></td>
                                <td><pre>'value'</pre></td>
                                <td>
                                    The key to use in the Object options for the checkbox value
                                </td>
                            </tr>
                            <tr>
                                <td>labelKey</td>
                                <td><pre>[String, Number]</pre></td>
                                <td><pre>'label'</pre></td>
                                <td>
                                    The key to use in the Object options for the checkbox label
                                </td>
                            </tr>
                            <tr>
                                <td>classNames</td>
                                <td><pre>String</pre></td>
                                <td><pre>''</pre></td>
                                <td>
                                    Additional class names to attacht to the group
                                </td>
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
                            <td><pre>input</pre></td>
                            <td>This is fired when the checked value is changed</td>
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
                            <td><pre>selectRadio(value)</pre></td>
                            <td>Selects the radio with the given value</td>
                        </tr>
                        </tbody>
                    </table>
                </ks-tab>
            </ks-tabs>
        </div>
    </div>
</template>

<script>
    import api from '../../src/helpers/api.js';

    export default {
        name: 'PageKsRadio',

        props: [],

        data() {
            return {
                values: {
                    radio1: null,
                    radio2: null,
                    group1: null,
                    group2: null
                },
                radioGroup: [],
                buttonGroup: [],
            }
        },

        mounted() {
            api.get('/countries.json').then((data) => {
                this.radioGroup = data.slice(0, 7);
                this.buttonGroup = data.slice(0, 3);
            });
        },
        components: {}
    }
</script>
