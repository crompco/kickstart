<template>
    <div>
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
                    <code-block>
                        <template v-pre>
                            &lt;ks-checkbox label="Check Me" name="single" :value="true" v-model="values.single" :switch-style="true">&lt;/ks-checkbox>
                        </template>
                    </code-block>
                </div>
                <div class="sm-6">
                    <div class="form-group">
                        <div class="label">Checkbox buttons</div>
                        <ks-checkbox label="PHP" name="checkbox1" value="1" v-model="values.checkbox1"></ks-checkbox>
                        <ks-checkbox label="JavaScript" name="checkbox1" value="2" v-model="values.checkbox1"></ks-checkbox>
                    </div>
                    <code-block>
                        <template v-pre>
                            &lt;div class="form-group">
                                &lt;div class="label">Checkbox buttons&lt;/div>
                                &lt;ks-checkbox label="PHP" name="checkbox1" value="1" v-model="values.checkbox1">&lt;/ks-checkbox>
                                &lt;ks-checkbox label="JavaScript" name="checkbox1" value="2" v-model="values.checkbox1">&lt;/ks-checkbox>
                            &lt;/div>
                        </template>
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
            <code-block>
                <template v-pre>
                    &lt;div class="form-group">
                        &lt;div class="label">Checkbox buttons (inline)&lt;/div>
                        &lt;ks-checkbox :inline="true" label="PHP" name="checkbox2" value="1" v-model="values.checkbox2">&lt;/ks-checkbox>
                        &lt;ks-checkbox :inline="true" label="JavaScript" name="checkbox2" value="2" v-model="values.checkbox2">&lt;/ks-checkbox>
                    &lt;/div>
                </template>
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
    </div>
</template>

<script>
    export default {
        name: 'PageKsCheckbox',

        data() {
            return {
                values: {
                    single: 0,
                    checkbox1: [],
                    checkbox2: [],
                },
                disable_switch: false
            }
        },
    }
</script>
