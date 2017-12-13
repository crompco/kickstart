<template>
    <div>
        <h2>Tooltip</h2>

        <div class="basic-block">
            <div class="row">
                <button class="button" ref="tooltipTarget" @click="active = !active">
                    Hover Over
                </button>

                <ks-tooltip target="tooltipTarget">
                    <div>Another tooltip right here</div>
                </ks-tooltip>

                <button class="button" v-ks-tooltip="'Tooltip text, add more text'" :props="{trigger: 'click'}">
                    Directive
                </button>
            </div>
        </div>
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
