<template>
    <div>
        <ks-step-through
            ref="steps"
            :steps="['Create Idea', 'Build Idea', 'Profit']"
            v-model="step"
            :allow-interaction="true"
        ></ks-step-through>

        <div class="basic-block">
            <div v-if="step == 1" class="t-center">
                <p>
                    This is step one
                </p>
                <button @click.prevent="$refs.steps.completeStep()">Complete Step 1</button>
            </div>
            <div v-if="step == 2" class="t-center">
                <p>
                    Step 2 is a little different
                </p>
                <button @click.prevent="$refs.steps.completeStep()">Complete Step 2</button>
            </div>
            <div v-if="step == 3" class="t-center">
                <p>
                    Step 3 Profit!
                </p>
                <button @click.prevent="$refs.steps.completeStep()">Complete Step 3</button>
            </div>
            <div v-if="step > 3" class="t-center">
                <strong>Success!</strong>
            </div>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;ks-step-through
                        ref="steps"
                        :steps="['Create Idea', 'Build Idea', 'Profit']"
                        v-model="step"
                        :allow-interaction="true"
                    >&lt;/ks-step-through>

                    &lt;div class="basic-block">
                        &lt;div v-if="step == 1" class="t-center">
                            &lt;p>
                                This is step one
                            &lt;/p>
                            &lt;button @click.prevent="$refs.steps.completeStep()">Complete Step 1&lt;/button>
                        &lt;/div>
                        &lt;div v-if="step == 2" class="t-center">
                            &lt;p>
                                Step 2 is a little different
                            &lt;/p>
                            &lt;button @click.prevent="$refs.steps.completeStep()">Complete Step 2&lt;/button>
                        &lt;/div>
                        &lt;div v-if="step == 3" class="t-center">
                            &lt;p>
                                Step 3 Profit!
                            &lt;/p>
                            &lt;button @click.prevent="$refs.steps.completeStep()">Complete Step 3&lt;/button>
                        &lt;/div>
                        &lt;div v-if="step > 3" class="t-center">
                            &lt;strong>Success!&lt;/strong>
                        &lt;/div>
                    &lt;/div>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>

    import KsStepThrough from '../../../src/components/KsStepThrough.vue'

    export default {
        name: 'PageKsStepThrough',

        data() {
            return {
                step: 1
            }
        },

        components: {
            KsStepThrough
        }
    }
</script>
