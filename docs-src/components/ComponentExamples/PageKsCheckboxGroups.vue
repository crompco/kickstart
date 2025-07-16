<template>
    <div>
        <div class="basic-block">
            <ks-checkbox-group
                class="ks-form-group"
                name="group1"
                :options="checkboxGroup"
                value-key="code"
                label-key="name"
                v-model="values.group1"
            >
                Checkbox button groups
            </ks-checkbox-group>

            <code-block>
                <template v-pre>
                    &lt;ks-checkbox-group
                        class="ks-form-group"
                        name="group1"
                        :options="checkboxGroup"
                        value-key="code"
                        label-key="name"
                        v-model="values.group1"
                    >
                        Checkbox button groups
                    &lt;/ks-checkbox-group>
                </template>
            </code-block>
        </div>

        <div class="basic-block">
            <ks-checkbox-group
                class="ks-form-group"
                name="group2"
                :buttons="true"
                :options="buttonGroup"
                value-key="code"
                label-key="name"
                v-model="values.group2"
            >
                Checkbox button groups ( button style )
            </ks-checkbox-group>

            <code-block>
                <template v-pre>
                    &lt;ks-checkbox-group
                        class="ks-form-group"
                        name="group2"
                        :buttons="true"
                        :options="buttonGroup"
                        value-key="code"
                        label-key="name"
                        v-model="values.group2"
                    >
                        Checkbox button groups ( button style )
                    &lt;/ks-checkbox-group>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    import api from '../../../src/helpers/api.js';

    export default {
        name: 'PageKsCheckboxGroups',

        data() {
            return {
                values: {
                    group1: [],
                    group2: []
                },
                checkboxGroup: [],
                buttonGroup: [],
            }
        },

        mounted() {
            api.get('../static/countries.json').then((data) => {
                this.checkboxGroup = data.slice(0, 7);
                this.buttonGroup = data.slice(0, 5);
            });
        },
    }
</script>
