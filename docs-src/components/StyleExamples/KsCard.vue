<template>
    <div>
        <div class="sm-12">
            <div class="ks-alert info">
                    This is not a component. Just uses css classes to style
            </div>
        </div>

        <div class="row col">
            <div class="sm-8 tab-4">
                <div class="ks-card">
                    <div class="ks-card-header">
                        Foo
                    </div>
                    <div class="ks-card-body">
                        Here is the body of the card. <br>
                        Let's break it down!
                    </div>
                    <div class="ks-card-footer">
                        <button>Edit</button>
                        <button class="danger">Delete</button>
                    </div>
                </div>
            </div>
            <div class="sm-8 tab-4">
                <div class="ks-card light-card">
                    <div class="ks-card-header">
                        Foo
                    </div>
                    <div class="ks-card-body">
                        Here is the body of the card. <br>
                        Let's break it down!
                    </div>
                    <div class="ks-card-footer">
                        <button>Edit</button>
                        <button class="danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;div class="ks-card">
                        &lt;div class="ks-card-header">
                            Foo
                        &lt;/div>
                        &lt;div class="ks-card-body">
                            Here is the body of the card. &lt;br>
                            Let's break it down!
                        &lt;/div>
                        &lt;div class="ks-card-footer">
                            &lt;button>Edit&lt;/button>
                            &lt;button class="danger">Delete&lt;/button>
                        &lt;/div>
                    &lt;/div>
                </template>
            </code-block>
        </div>

        <div class="row col">
            <h2>Alternative "Light" version</h2>
            <div class="sm-8 tab-4">
                <div class="ks-card ks-light-card">
                    <div class="ks-card-header ks-light">Test</div>
                    <div class="ks-card-body">
                        Here is the body of the card. <br>
                        Let's break it down!
                    </div>
                    <div class="ks-card-footer">
                        <button>Edit</button>
                        <button class="danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;div class="ks-card ks-light-card"&gt;
                        &lt;div class="ks-card-header ks-light"&gt;Test&lt;/div&gt;
                        &lt;div class="ks-card-body"&gt;
                            Here is the body of the card. &lt;br&gt;
                            Let's break it down!
                        &lt;/div&gt;
                        &lt;div class="ks-card-footer">
                            &lt;button>Edit&lt;/button>
                            &lt;button class="danger">Delete&lt;/button>
                        &lt;/div>
                    &lt;/div&gt;
                </template>
            </code-block>
        </div>
    </div>
</template>
<script setup lang="ts">
</script>