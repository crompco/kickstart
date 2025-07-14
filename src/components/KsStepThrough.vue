<template>
    <div class="steps">
        <ul class="step-list">
            <li :class="{ 'active': index+1 == activeStep, 'completed': completed[index] }" v-for="(step, index) in steps">
                <div class="step-line"></div>
                <a href="" @click.prevent="clickStep(index+1)" :class="{ 'interactive-disabled': !allowInteraction }">
                    <div class="num" v-if="!completed[index]">{{index + 1}}</div>
                    <div class="num" v-else>&#x2714;</div>
                    <p>{{step}}</p>
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

        data() {
            return {
                completed: {}
            }
        },

        methods: {
            completeStep() {
                this.completed[this.activeStep - 1] = true;
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
