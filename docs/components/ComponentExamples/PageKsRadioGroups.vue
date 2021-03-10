<template>
    <div>
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

        <div class="basic-block">
            <div class="row">
                <p>Radio button group with no label</p>
            </div>
            <ks-radio-group
                class="form-group"
                name="group1"
                :options="radioGroup"
                value-key="code"
                label-key="name"
                v-model="values.group1"
            ></ks-radio-group>

            <code-block>
                &lt;ks-radio-group
                    class="form-group"
                    name="group1"
                    :options="radioGroup"
                    value-key="code"
                    label-key="name"
                    v-model="values.group1"
                >&lt;/ks-radio-group>
            </code-block>
        </div>


        <div class="basic-block">
            <div class="row">
                <p>Radio button group with slot buttons</p>
            </div>
            <ks-radio-group
                class="form-group"
                name="group1"
                :options="radioGroup"
                value-key="code"
                label-key="name"
                v-model="values.group1"
            >
                <span slot="AW">Foo (Actually Aruba)</span>
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
                    &lt;span slot="AW">Foo (Actually Aruba)&lt;/span>
                &lt;/ks-radio-group>
            </code-block>
        </div>
    </div>
</template>

<script>
    import api from '../../../src/helpers/api.js';

    export default {
        name: 'PageKsRadioGroups',

        data() {
            return {
                values: {
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
    }
</script>
