---
title: Step Through
source: PageKsStepThrough
api: 
    props: 
        - name: steps
          type: Array
          default: []
          description: |
            An array of the steps. This will be the text used for the steps. Here is what was used in the example above.
            <pre>['Create Idea', 'Build Idea', 'Profit']</pre>
        - name: activeStep
          vmodel: true
          type: Number, String
          default: 1
          description: The active step to be used. This can be binded with v-model.
        - name: allowInteraction
          type: Boolean
          default: false
          description: When this is enabled it allows users to click the steps to navigate. It is disabled by default.
    events:
        - name: input
          description: Fired when step is modified
    methods:
        - name: completeStep()
          description: Call this to complete the active step and advance to the next step.
        - name: nextStep()
          description: Moves to the next step without completing
        - name: setStep()
          description: Sets the step to the given value
---
