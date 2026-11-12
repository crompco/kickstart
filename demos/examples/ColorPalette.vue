<template>
    <div class="color-palette">
        <div
            v-for="color in palette"
            :key="color.name"
            class="color-palette-row"
        >
            <div class="color-palette-name bold capitalize">{{ color.name }}</div>
            <div class="color-palette-swatches">
                <div
                    v-for="swatch in color.swatches"
                    :key="swatch.shade"
                    :title="`${color.name}-${swatch.shade} ${swatch.hex}`"
                    class="color-palette-swatch"
                    :style="{ backgroundColor: swatch.hex, color: swatch.text }"
                >
                    <span class="bold">{{ swatch.shade }}</span>
                    <span class="color-palette-hex">{{ swatch.hex }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // Internal Dependencies
    import colors from '../data/style-maps/colors.json';

    /**
     * Relative luminance of a #rrggbb color (WCAG 2)
     */
    function luminance(hex) {
        const [r, g, b] = [1, 3, 5]
            .map(start => parseInt(hex.slice(start, start + 2), 16) / 255)
            .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));

        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * White or near-black text, whichever has more contrast on the swatch
     */
    function textColor(hex) {
        const background = luminance(hex);
        const on_white = 1.05 / (background + 0.05);
        const on_dark = (background + 0.05) / (luminance('#111827') + 0.05);

        return on_white > on_dark ? '#ffffff' : '#111827';
    }

    export default {
        name: 'ColorPalette',

        computed: {
            palette() {
                return colors.colors
                    .filter(color => typeof color.colors === 'object')
                    .map(color => ({
                        name: color.name,
                        swatches: Object.entries(color.colors).map(([shade, hex]) => ({
                            shade,
                            hex,
                            text: textColor(hex),
                        })),
                    }));
            },
        },
    }
</script>

<style>
    .color-palette-row + .color-palette-row {
        margin-top: 0.75rem;
    }

    .color-palette-name {
        margin-bottom: 0.25rem;
    }

    .color-palette-swatches {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
        gap: 0.25rem;
    }

    .color-palette-swatch {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: 3.5rem;
        padding: 0.25rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        line-height: 1.2;
    }

    .color-palette-hex {
        font-family: monospace;
        font-size: 0.625rem;
        opacity: 0.85;
    }
</style>
