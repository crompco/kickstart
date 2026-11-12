<template>
    <div class="ks-steps">
        <ul class="step-list">
            <li
                v-for="(step, index) in steps"
                :key="index"
                :class="{ 'active': index + 1 == activeStep, 'completed': completed[index] }"
            >
                <div class="step-line"></div>
                <a
                    href=""
                    :class="{ 'interactive-disabled': !allowInteraction }"
                    @click.prevent="clickStep(index + 1)"
                >
                    <div
                        v-if="!completed[index]"
                        class="num"
                    >{{ index + 1 }}</div>
                    <div
                        v-else
                        class="num"
                    >&#x2714;</div>
                    <p>{{ step }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'KsStepThrough',

        model: {
            prop: 'activeStep',
            event: 'input'
        },

        props: {
            steps: {
                type: Array,
                default() {
                    return []
                }
            },
            activeStep: {
                type: [Number, String],
                default: 1
            },
            allowInteraction: {
                type: Boolean,
                default: false
            }
        },

        emits: ['input'],

        data() {
            return {
                completed: {}
            }
        },

        methods: {
            completeStep() {
                this.completed = { ...this.completed, [this.activeStep - 1]: true };
                this.nextStep();
            },
            nextStep() {
                this.setStep(parseInt(this.activeStep) + 1);
            },
            setStep(step) {
                this.$emit('input', step);
            },
            clickStep(step) {
                if ( this.allowInteraction ) {
                    this.setStep(step)
                }
            }
        },
    }
</script>
