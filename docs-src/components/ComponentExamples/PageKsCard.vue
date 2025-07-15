<template>
    <div>
        <div class="row col">
            <div class="sm-8 tab-4">
                <ks-card header="Foo">
                    Here is the body of the card. <br>
                    Let's break it down!
                    <template v-slot:footer>
                        <button>Edit</button>
                        <button class="danger">Delete</button>
                    </template>
                </ks-card>
            </div>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;ks-card header="Foo">
                        Here is the body of the card. &lt;br>
                        Let's break it down!
                        &lt;template v-slot:footer>
                            &lt;button>Edit&lt;/button>
                            &lt;button class="danger">Delete&lt;/button>
                        &lt;/template>
                    &lt;/ks-card>
                </template>
            </code-block>
        </div>

        <div class="row col">
            <h2>Alternative "Light" version</h2>
            <div class="sm-8 tab-4">
                <ks-card header="Light Version" :light="true">
                    Here is the body of the card. <br>
                    Let's break it down!
                    <template v-slot:footer>
                        <button>Edit</button>
                        <button class="danger">Delete</button>
                    </template>
                </ks-card>
            </div>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;ks-card header="Light Version" :light="true">
                        Here is the body of the card. &lt;br>
                        Let's break it down!
                        &lt;template v-slot:footer>
                            &lt;button>Edit&lt;/button>
                            &lt;button class="danger">Delete&lt;/button>
                        &lt;/template>
                    &lt;/ks-card>
                </template>
            </code-block>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>