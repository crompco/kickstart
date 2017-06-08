<template>
    <div>
        <h2>Step Through</h2>

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
                <code class="language-html" v-pre>
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
                </code>
            </code-block>
        </div>

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
                            <td>steps</td>
                            <td>Array</td>
                            <td><pre>[]</pre></td>
                            <td>
                                An array of the steps. This will be the text used for the steps. Here is what was used in the example above.
                                <pre>['Create Idea', 'Build Idea', 'Profit']</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>activeStep</td>
                            <td>Number, String (v-model)</td>
                            <td><pre>1</pre></td>
                            <td>
                                The active step to be used. This can be binded with v-model.
                            </td>
                        </tr>
                        <tr>
                            <td>allowInteraction</td>
                            <td>Boolean</td>
                            <td><pre>false</pre></td>
                            <td>
                                When this is enabled it allows users to click the steps to navigate. It is disabled by default.
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
                            <td>input</td>
                            <td>Fired when step is modified</td>
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
                            <td><pre>completeStep()</pre></td>
                            <td>Call this to complete the active step and advance to the next step.</td>
                        </tr>
                        <tr>
                            <td><pre>nextStep()</pre></td>
                            <td>Moves to the next step without completing</td>
                        </tr>
                        <tr>
                            <td><pre>setStep()</pre></td>
                            <td>Sets the step to the given value</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>

    </div>
</template>

<script>

    import KsStepThrough from '../../src/components/KsStepThrough.vue'

    export default {
        name: 'PageKsStepThrough',

        props: [],

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
