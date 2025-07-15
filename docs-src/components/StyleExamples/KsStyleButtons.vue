<template>
    <div>
        <div class="basic-block">
            <div class="row">
                <div>Default</div>
                <hr>
                <div class="sm-12">
                    <button class="ks-button">
                        I'm a default button
                    </button>
                    <a href="#" class="ks-button tiny">
                        I'm a tiny button
                    </a>
                    <a href="#" class="ks-button small">
                        I'm a small button
                    </a>
                    <a href="#" class="ks-button large danger">
                        I'm a large button
                    </a>
                    <a href="#" class="ks-button large success">
                        I'm a large button
                    </a>
                </div>
            </div>
            <code-block>
                <template v-pre>
                    // Can be used with an anchor tag or button tag

                    &lt;button class="ks-button">
                        I'm a default button
                    &lt;/button>
                    &lt;a href="#" class="ks-button tiny">
                        I'm a tiny button
                    &lt;/a>
                    &lt;a href="#" class="ks-button small">
                        I'm a small button
                    &lt;/a>
                    &lt;a href="#" class="ks-button large danger">
                        I'm a large button
                    &lt;/a>
                </template>
            </code-block>
            <br>
            <div class="row">
                <div>Outline</div>
                <hr>
                <div class="sm-12">
                    <button class="ks-button outline disabled" disabled="disabled">
                        I'm a default button
                    </button>
                    <a href="#" class="ks-button outline tiny">
                        I'm a tiny button
                    </a>
                    <a href="#" class="ks-button outline small">
                        I'm a small button
                    </a>
                    <a href="#" class="ks-button outline large danger">
                        I'm a large button
                    </a>
                    <a href="#" class="ks-button outline large success">
                        I'm a large button
                    </a>
                </div>
            </div>
            <code-block class="mt-2">
                <template v-pre>
                    &lt;button class="ks-button outline disabled" disabled="disabled">
                        I'm a default button
                    &lt;/button>
                    &lt;a href="#" class="ks-button outline tiny">
                        I'm a tiny button
                    &lt;/a>
                    &lt;a href="#" class="ks-button outline small">
                        I'm a small button
                    &lt;/a>
                    &lt;a href="#" class="ks-button outline large danger">
                        I'm a large button
                    &lt;/a>
                </template>
            </code-block>
            <br>
            <div class="row">
                <div>None</div>
                <hr>
                <div class="sm-12">
                    <button class="ks-button none disabled">
                        I'm a default button
                    </button>
                    <a href="#" class="ks-button none tiny">
                        I'm a tiny button
                    </a>
                    <a href="#" class="ks-button none small">
                        I'm a small button
                    </a>
                    <a href="#" class="ks-button none large danger">
                        I'm a large button
                    </a>
                    <a href="#" class="ks-button none large success">
                        I'm a large button
                    </a>
                </div>
            </div>
            <code-block class="mt-2">
                <template v-pre>
                    &lt;button class="ks-button none disabled">
                        I'm a default button
                    &lt;/button>
                    &lt;a href="#" class="ks-button none tiny">
                        I'm a tiny button
                    &lt;/a>
                    &lt;a href="#" class="ks-button none small">
                        I'm a small button
                    &lt;/a>
                    &lt;a href="#" class="ks-button none large danger">
                        I'm a large button
                    &lt;/a>
                </template>
            </code-block>
        </div>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies

    export default {
        name: 'Buttons',
    }
</script>
