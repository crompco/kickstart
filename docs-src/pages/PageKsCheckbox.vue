<template>
    <div>
        <h2>Checkbox Buttons</h2>
        <div class="basic-block">
            <div class="row row-collapse">
                <div class="sm-6">
                    <div class="right">
                        <ks-button v-model="disable_switch" @click.prevent="disable_switch = !disable_switch">Disable</ks-button>
                    </div>
                    <div class="form-group">
                        <div class="label">Single Checkbox</div>
                        <ks-checkbox
                            label="Check Me"
                            name="single"
                            :value="true"
                            v-model="values.single"
                            :switch-style="true"
                            :disabled="disable_switch"
                        ></ks-checkbox>
                        <pre>{{typeof values.single}} {{values.single}}</pre>
                    </div>
                    <code-block v-pre>
                        &lt;ks-checkbox label="Check Me" name="single" :value="true" v-model="values.single" :switch-style="true">&lt;/ks-checkbox>
                    </code-block>
                </div>
                <div class="sm-6">
                    <div class="form-group">
                        <div class="label">Checkbox buttons</div>
                        <ks-checkbox label="PHP" name="checkbox1" value="1" v-model="values.checkbox1"></ks-checkbox>
                        <ks-checkbox label="JavaScript" name="checkbox1" value="2" v-model="values.checkbox1"></ks-checkbox>
                    </div>
                    <code-block v-pre>
                        &lt;div class="form-group">
                            &lt;div class="label">Checkbox buttons&lt;/div>
                            &lt;ks-checkbox label="PHP" name="checkbox1" value="1" v-model="values.checkbox1">&lt;/ks-checkbox>
                            &lt;ks-checkbox label="JavaScript" name="checkbox1" value="2" v-model="values.checkbox1">&lt;/ks-checkbox>
                        &lt;/div>
                    </code-block>
                </div>
            </div>
        </div>
        <div class="basic-block">
            <div class="form-group">
                <div class="label">Checkbox buttons (inline)</div>
                <ks-checkbox :inline="true" label="PHP" name="checkbox2" value="1" v-model="values.checkbox2"></ks-checkbox>
                <ks-checkbox :inline="true" label="JavaScript" name="checkbox2" value="2" v-model="values.checkbox2"></ks-checkbox>
            </div>
            <code-block v-pre>
                &lt;div class="form-group">
                    &lt;div class="label">Checkbox buttons (inline)&lt;/div>
                    &lt;ks-checkbox :inline="true" label="PHP" name="checkbox2" value="1" v-model="values.checkbox2">&lt;/ks-checkbox>
                    &lt;ks-checkbox :inline="true" label="JavaScript" name="checkbox2" value="2" v-model="values.checkbox2">&lt;/ks-checkbox>
                &lt;/div>
            </code-block>

        </div>

        <div class="alert info">
            <strong>v-model usage:</strong>
            <p>
                If you bind an *Array* as your v-model then the component will automatically add/remove the value from
                the array when it is changed.
            </p>
            - or -
            <p>
                If you bind a String, Number, or NULL then it will just bind the value directly
            </p>
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
                                <td><pre>[Array, String, Boolean]</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>
                                    The v-model binded prop on the checkbox input. Should be provided via v-model.
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
                                <td>The label to be used for the checkbox button</td>
                            </tr>
                            <tr>
                                <td>value</td>
                                <td><pre>[String, Number]</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>
                                    The actual value of the checkbox button
                                </td>
                            </tr>
                            <tr>
                                <td>disabled</td>
                                <td><pre>Boolean</pre></td>
                                <td><pre>false</pre></td>
                                <td>
                                    Whether the checkbox is disabled or not
                                </td>
                            </tr>
                            <tr>
                                <td>inline</td>
                                <td><pre>Boolean</pre></td>
                                <td><pre>false</pre></td>
                                <td>
                                    If set true the checkbox will be displayed inline
                                </td>
                            </tr>
                            <tr>
                                <td>switchStyle</td>
                                <td><pre>Boolean</pre></td>
                                <td><pre>false</pre></td>
                                <td>
                                    If set to true the checkbox will use a switch style instead of a check
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
                                <td>Toggles the value of the checkbox</td>
                            </tr>
                        </tbody>
                    </table>
                </ks-tab>
            </ks-tabs>
        </div>

        <h2>Checkbox Button Groups</h2>

        <div class="basic-block">
            <ks-checkbox-group
                class="form-group"
                name="group1"
                :options="checkboxGroup"
                value-key="code"
                label-key="name"
                v-model="values.group1"
            >
                Checkbox button groups
            </ks-checkbox-group>

            <code-block v-pre>
                &lt;ks-checkbox-group
                    class="form-group"
                    name="group1"
                    :options="checkboxGroup"
                    value-key="code"
                    label-key="name"
                    v-model="values.group1"
                >
                    Checkbox button groups
                &lt;/ks-checkbox-group>
            </code-block>
        </div>

        <div class="basic-block">
            <ks-checkbox-group
                class="form-group"
                name="group2"
                :buttons="true"
                :options="buttonGroup"
                value-key="code"
                label-key="name"
                v-model="values.group2"
            >
                Checkbox button groups ( button style )
            </ks-checkbox-group>

            <code-block v-pre>
                &lt;ks-checkbox-group
                    class="form-group"
                    name="group2"
                    :buttons="true"
                    :options="buttonGroup"
                    value-key="code"
                    label-key="name"
                    v-model="values.group2"
                >
                    Checkbox button groups ( button style )
                &lt;/ks-checkbox-group>
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
                                <td><pre>Array</pre></td>
                                <td><pre>[]</pre></td>
                                <td>
                                    The v-model binded prop on the checkbox input. Should be provided via v-model.
                                    If only the prop is sent then you would need to listen for the input
                                    event to update the prop
                                </td>
                            </tr>
                            <tr>
                                <td>label</td>
                                <td><pre>String</pre></td>
                                <td><pre>''</pre></td>
                                <td>The label to be used for the checkbox button</td>
                            </tr>
                            <tr>
                                <td>name <span class="required">*</span></td>
                                <td><pre>String</pre></td>
                                <td><pre>NULL</pre></td>
                                <td>
                                    The actual value of the checkbox button
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
            </ks-tabs>
        </div>
    </div>
</template>

<script>
    import api from '../../src/helpers/api.js';

    export default {
        name: 'PageKsCheckbox',

        props: [],

        data() {
            return {
                values: {
                    single: 0,
                    checkbox1: [],
                    checkbox2: [],
                    group1: [],
                    group2: []
                },
                checkboxGroup: [],
                buttonGroup: [],
                disable_switch: false
            }
        },

        mounted() {
            api.get('/countries.json').then((data) => {
                this.checkboxGroup = data.slice(0, 7);
                this.buttonGroup = data.slice(0, 5);
            });
        },
        components: {}
    }
</script>
