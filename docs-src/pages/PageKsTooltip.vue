<template>
    <div>
        <h2>Tooltip</h2>

        <div class="basic-block">
            <div class="row col row-collapse">
                <div class="sm-6">
                    <button class="button" ref="tooltipTarget" @click="active = !active">
                        Hover Over
                    </button>

                    <ks-tooltip target="tooltipTarget">
                        <div>Another tooltip right here</div>
                        <h2>Title tag</h2>
                        <button class="button">iButton</button>
                    </ks-tooltip>
                </div>

                <div class="sm-6">
                    <button class="button" v-ks-tooltip="'Tooltip text, add more text'" :props="{trigger: 'click'}">
                        Directive
                    </button>
                </div>
            </div>
            <div class="row col">
                <code-block>
                    <template v-pre>
                        &lt;button class="button" ref="tooltipTarget" @click="active = !active">
                            Hover Over
                        &lt;/button>

                        &lt;ks-tooltip target="tooltipTarget">
                            &lt;div>Another tooltip right here&lt;/div>
                            &lt;h2>Title tag&lt;/h2>
                            &lt;button class="button">iButton&lt;/button>
                        &lt;/ks-tooltip>

                        &lt;button class="button" v-ks-tooltip="'Tooltip text, add more text'" :props="{trigger: 'click'}">
                            Directive
                        &lt;/button>
                    </template>
                </code-block>
            </div>
        </div>
        <div class="basic-block">
            <p>Example using a slot</p>
            <div class="row col">
                <ks-button>
                    Tooltip (click)
                    <ks-tooltip trigger="click">
                        <p>
                            A tooltip triggered on click
                        </p>
                    </ks-tooltip>
                </ks-button>
            </div>
            <div class="row">
                <code-block>
                    <template v-pre>
                        &lt;ks-button>
                            Tooltip (click)
                            &lt;ks-tooltip trigger="click">
                                &lt;p>
                                    A tooltip triggered on click
                                &lt;/p>
                            &lt;/ks-tooltip>
                        &lt;/ks-button>
                    </template>

                </code-block>
            </div>
        </div>

        <ks-tabs>
            <ks-tab title="Props">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>isActive</td>
                            <td>Boolean</td>
                            <td>true</td>
                            <td>Whether the tooltip is active or not. When false tooltip will not trigger</td>
                        </tr>
                        <tr>
                            <td>trigger</td>
                            <td>String</td>
                            <td>hover</td>
                            <td>The trigger for showing the tooltip. hover, click</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>String</td>
                            <td></td>
                            <td>The width of the tooltip window. (auto by default)</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>String</td>
                            <td></td>
                            <td>The height of the tooltip window. (auto by default)</td>
                        </tr>
                        <tr>
                            <td>target</td>
                            <td>String</td>
                            <td></td>
                            <td>
                                The target ref name from the tooltips parent component.
                                if left blank it will assume the parent is the target
                            </td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
            <ks-tab title="Methods">
                <table class="table striped">
                    <thead>
                        <tr>
                            <th>Method</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>showTooltip</td>
                            <td>Shows the tooltip.</td>
                        </tr>
                        <tr>
                            <td>triggerHide</td>
                            <td>Hides the tooltip.</td>
                        </tr>
                        <tr>
                            <td>toggleTooltip</td>
                            <td>Toggles the tooltip</td>
                        </tr>
                    </tbody>
                </table>
            </ks-tab>
        </ks-tabs>
    </div>
</template>

<script>
    import KsTooltip from '../../src/components/KsTooltip';

    export default {
        name: 'PageKsTooltip',

        data() {
            return {
              active: false
            }
        },

        components: {
            KsTooltip
        }
    }
</script>
