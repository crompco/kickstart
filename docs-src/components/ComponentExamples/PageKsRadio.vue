<template>
    <div>
        <div class="basic-block">
            <div class="ks-form-group">
                <div class="ks-label">Radio buttons</div>
                <ks-radio label="PHP" name="radio1" value="1" v-model="values.radio1"></ks-radio>
                <ks-radio label="JavaScript" name="radio1" value="2" v-model="values.radio1"></ks-radio>
            </div>
            <code-block>
                <template v-pre>
                    &lt;div class="ks-form-group">
                        &lt;div class="ks-label">Which do you prefer&lt;/div>
                        &lt;ks-radio label="PHP" name="radio1" value="1" v-model="values.radio1">&lt;/ks-radio>
                        &lt;ks-radio label="JavaScript" name="radio1" value="2" v-model="values.radio1">&lt;/ks-radio>
                    &lt;/div>
                </template>
            </code-block>
        </div>
        <div class="basic-block">
            <div class="ks-form-group">
                <div class="ks-label">Radio buttons (inline)</div>
                <ks-radio :inline="true" label="PHP" name="radio2" value="1" v-model="values.radio2"></ks-radio>
                <ks-radio :inline="true" label="JavaScript" name="radio2" value="2" v-model="values.radio2"></ks-radio>
            </div>
            <code-block>
                <template v-pre>
                    &lt;div class="ks-form-group">
                        &lt;div class="ks-label">Radio buttons (inline)&lt;/div>
                        &lt;ks-radio :inline="true" label="PHP" name="radio1" value="1" v-model="values.radio1">&lt;/ks-radio>
                        &lt;ks-radio :inline="true" label="JavaScript" name="radio1" value="2" v-model="values.radio1">&lt;/ks-radio>
                    &lt;/div>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageKsRadio',

        data() {
            return {
                values: {
                    radio1: null,
                    radio2: null,
                },
            }
        },
    }
</script>
