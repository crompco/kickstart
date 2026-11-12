<template>
    <ks-accordion class="col code-block-accordion">
        <ks-accordion-row :title="title">
            <pre><code
                ref="code"
                :class="lang"
            ><slot></slot></code></pre>
        </ks-accordion-row>
    </ks-accordion>
</template>

<script>
    /**
     * Removes the indent the example template adds to every line
     */
    function dedent(text) {
        const lines = text.replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
        const indent = Math.min(...lines.filter(line => line.trim()).map(line => line.match(/^\s*/)[0].length));

        return lines.map(line => line.slice(indent)).join('\n');
    }

    export default {
        name: 'CodeBlock',

        props: {
            title: {
                type: String,
                default: 'Show Code'
            },
            lang: {
                type: String,
                default: 'language-html'
            }
        },

        mounted() {
            const code = this.$refs.code;
            code.textContent = dedent(code.textContent);
        },
    };
</script>
