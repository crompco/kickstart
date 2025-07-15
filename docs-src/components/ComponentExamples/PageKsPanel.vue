<template>
    <div>
        <div class="row col">
            <div class="sm-8 tab-4">
                <ks-panel header="Foo">
                    Here is the body of the panel. <br>
                    Let's break it down!
                    <template v-slot:footer>
                        <ks-button>Edit</ks-button>
                        <ks-button class="danger">Delete</ks-button>
                    </template>
                </ks-panel>
            </div>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;ks-panel header="Foo">
                        Here is the body of the panel. &lt;br>
                        Let's break it down!
                        &lt;template v-slot:footer>
                            &lt;ks-button>Edit&lt;/ks-button>
                            &lt;ks-button class="danger">Delete&lt;/ks-button>
                        &lt;/template>
                    &lt;/ks-panel>
                </template>
            </code-block>
        </div>

        <div class="row col">
            <h2>Alternative "Light" version</h2>
            <div class="sm-8 tab-4">
                <ks-panel header="Light Version" :light="true">
                    Here is the body of the panel. <br>
                    Let's break it down!
                    <template v-slot:footer>
                        <ks-button>Edit</ks-button>
                        <ks-button class="danger">Delete</ks-button>
                    </template>
                </ks-panel>
            </div>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;ks-panel header="Light Version" :light="true">
                        Here is the body of the panel. &lt;br>
                        Let's break it down!
                        &lt;template v-slot:footer>
                            &lt;ks-button>Edit&lt;/ks-button>
                            &lt;ks-button class="danger">Delete&lt;/ks-button>
                        &lt;/template>
                    &lt;/ks-panel>
                </template>
            </code-block>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>