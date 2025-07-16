<template>
    <div>
        <div class="basic-block">
            <div class="row col row-collapse">
                <div class="sm-6">
                    <button class="ks-button" ref="tooltipTarget" @click="active = !active">
                        Hover Over
                    </button>

                    <ks-tooltip target="tooltipTarget">
                        <div>Another tooltip right here</div>
                        <h2>Title tag</h2>
                        <button class="ks-button">iButton</button>
                    </ks-tooltip>
                </div>

                <div class="sm-6">
                    <button class="ks-button" v-ks-tooltip="'Tooltip text, add more text'" :props="{trigger: 'click'}">
                        Directive
                    </button>
                </div>
            </div>
            <div class="row col">
                <code-block>
                    <template v-pre>
                        &lt;button class="ks-button" ref="tooltipTarget" @click="active = !active">
                            Hover Over
                        &lt;/button>

                        &lt;ks-tooltip target="tooltipTarget">
                            &lt;div>Another tooltip right here&lt;/div>
                            &lt;h2>Title tag&lt;/h2>
                            &lt;button class="ks-button">iButton&lt;/button>
                        &lt;/ks-tooltip>

                        &lt;button class="ks-button" v-ks-tooltip="'Tooltip text, add more text'" :props="{trigger: 'click'}">
                            Directive
                        &lt;/button>
                    </template>
                </code-block>
            </div>
        </div>

        <div class="basic-block">
            <div class="row col row-collapse">
                <div class="sm-12">
                    <button class="ks-button">
                        Hover Over (Delayed)
                        <ks-tooltip :hover-delay="500">
                            <div>Another tooltip right here (delayed)</div>
                            <h2>Title tag</h2>
                            <button class="ks-button">iButton</button>
                        </ks-tooltip>
                    </button>
                </div>
            </div>
            <div class="row col">
                <code-block>
                    <template v-pre>
                        &lt;button class="ks-button">
                            Hover Over (Delayed)
                            &lt;ks-tooltip :hover-delay="500">
                                &lt;div>Another tooltip right here (delayed)&lt;/div>
                                &lt;h2>Title tag&lt;/h2>
                                &lt;button class="ks-button">iButton&lt;/button>
                            &lt;/ks-tooltip>
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
    </div>
</template>

<script>
    import KsTooltip from '../../../src/components/KsTooltip';

    export default {
        name: 'PageKsTooltip',

        data() {
            return {
                active: false,
            };
        },

        components: {
            KsTooltip,
        },
    };
</script>
