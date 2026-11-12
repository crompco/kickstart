---
title: Step Through
---

# Step Through

<Demo name="PageKsStepThrough" />

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| <code>steps</code> | <code>Array</code> | <code>[]</code> | An array of the steps. This will be the text used for the steps. Here is what was used in the example above. <pre>['Create Idea', 'Build Idea', 'Profit']</pre> |
| <code>activeStep</code> <Badge type="tip" text="v-model" /> | <code>Number, String</code> | <code>1</code> | The active step to be used. This can be binded with v-model. |
| <code>allowInteraction</code> | <code>Boolean</code> | <code>False</code> | When this is enabled it allows users to click the steps to navigate. It is disabled by default. |

## Events

| Name | Description |
| --- | --- |
| <code>input</code> | Fired when step is modified |

## Methods

| Name | Description |
| --- | --- |
| <code>completeStep()</code> | Call this to complete the active step and advance to the next step. |
| <code>nextStep()</code> | Moves to the next step without completing |
| <code>setStep()</code> | Sets the step to the given value |
