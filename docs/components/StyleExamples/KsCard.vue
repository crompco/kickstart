<template>
    <div>
        <div class="row col">
            <div class="sm-8 tab-4">
                <div class="ks-card">
                    <div class="card-header">
                        Foo
                    </div>
                    <div class="card-body">
                        Here is the body of the card. <br>
                        Let's break it down!
                    </div>
                    <div class="card-footer">
                        <button>Edit</button>
                        <button class="danger">Delete</button>
                    </div>
                </div>
            </div>
            <div class="sm-8 tab-4">
                <div class="ks-card light-card">
                    <div class="card-header">
                        Foo
                    </div>
                    <div class="card-body">
                        Here is the body of the card. <br>
                        Let's break it down!
                    </div>
                    <div class="card-footer">
                        <button>Edit</button>
                        <button class="danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert info">
            This is not a component. Just uses css classes to style
        </div>

        <div class="row">
            <code-block>
                <template v-pre>
                    &lt;div class="ks-card">
                        &lt;div class="card-header">
                            Foo
                        &lt;/div>
                        &lt;div class="card-body">
                            Here is the body of the card. &lt;br>
                            Let's break it down!
                        &lt;/div>
                        &lt;div class="card-footer">
                            &lt;button>Edit&lt;/button>
                            &lt;button class="danger">Delete&lt;/button>
                        &lt;/div>
                    &lt;/div>
                </template>
            </code-block>
        </div>
    </div>
</template>
