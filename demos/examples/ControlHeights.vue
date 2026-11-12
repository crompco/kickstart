<template>
    <div>
        <p>
            Each control sits in a <code>.ks-form-group</code>, aligned to the top of the row.
            The table measures the rendered controls in this page, and updates when they resize.
        </p>

        <div class="control-heights-row">
            <div
                v-for="control in controls"
                :key="control.name"
                ref="cells"
                class="control-heights-cell ks-form-group"
            >
                <div class="ks-label">{{ control.label }}</div>
                <div class="control-heights-measure">
                    <input
                        v-if="control.name === 'input'"
                        type="text"
                        value="Text"
                    >
                    <ks-datepicker
                        v-else-if="control.name === 'datepicker'"
                        v-model="date"
                    ></ks-datepicker>
                    <ks-timepicker
                        v-else-if="control.name === 'timepicker'"
                        v-model="time"
                    ></ks-timepicker>
                    <ks-select
                        v-else-if="control.name === 'select'"
                        name="code"
                        label-key="name"
                        :items="items"
                        v-model="selected"
                    ></ks-select>
                    <ks-autocomplete
                        v-else-if="control.name === 'autocomplete'"
                        selection-key="name"
                        :items="items"
                        v-model="lookup"
                    ></ks-autocomplete>
                    <ks-autocomplete
                        v-else-if="control.name === 'autocomplete-multiple'"
                        selection-key="name"
                        :items="items"
                        :multiple="true"
                        v-model="lookups"
                    ></ks-autocomplete>
                    <ks-radio-group
                        v-else-if="control.name === 'option-buttons'"
                        name="size"
                        :buttons="true"
                        :options="items"
                        value-key="code"
                        label-key="name"
                        v-model="size"
                    ></ks-radio-group>
                    <ks-button v-else-if="control.name === 'button'">Button</ks-button>
                    <ks-checkbox
                        v-else-if="control.name === 'checkbox'"
                        v-model="checked"
                    >Checkbox</ks-checkbox>
                </div>
            </div>
        </div>

        <table class="ks-table bordered">
            <thead>
                <tr>
                    <th>Control</th>
                    <th>Height</th>
                    <th>Margin below</th>
                    <th>Difference from text input</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="row in measurements"
                    :key="row.name"
                >
                    <td>{{ row.label }}</td>
                    <td>{{ row.height }}px</td>
                    <td>{{ row.margin }}px</td>
                    <td :class="{ 'text-red-500': row.difference !== 0 }">{{ row.difference }}px</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    const CONTROLS = [
        { name: 'input', label: 'Text input' },
        { name: 'datepicker', label: 'KsDatepicker' },
        { name: 'timepicker', label: 'KsTimepicker' },
        { name: 'select', label: 'KsSelect' },
        { name: 'autocomplete', label: 'KsAutocomplete' },
        { name: 'autocomplete-multiple', label: 'KsAutocomplete (multiple, one selected)' },
        { name: 'option-buttons', label: 'Option buttons' },
        { name: 'button', label: 'KsButton' },
        { name: 'checkbox', label: 'KsCheckbox' },
    ];

    const round = value => Math.round(value * 100) / 100;

    export default {
        name: 'ControlHeights',

        data() {
            return {
                controls: CONTROLS,
                items: [
                    { code: 'S', name: 'Small' },
                    { code: 'M', name: 'Medium' },
                    { code: 'L', name: 'Large' },
                ],
                date: '',
                time: '',
                selected: '',
                lookup: '',
                lookups: [{ code: 'M', name: 'Medium' }],
                size: 'M',
                checked: false,
                measurements: [],
                resize_observer: null,
            };
        },

        mounted() {
            this.resize_observer = new ResizeObserver(() => this.measure());
            this.$refs.cells.forEach(cell => this.resize_observer.observe(cell));
            this.measure();
        },

        beforeDestroy() {
            this.resize_observer.disconnect();
        },

        methods: {
            /**
             * Height of each control's root element and the margin below it
             */
            measure() {
                const rows = this.$refs.cells.map((cell, index) => {
                    const control = cell.querySelector('.control-heights-measure').firstElementChild;
                    const style = getComputedStyle(control);

                    return {
                        ...CONTROLS[index],
                        height: round(control.getBoundingClientRect().height),
                        margin: round(parseFloat(style.marginBottom)),
                    };
                });
                const input_height = rows[0].height;

                this.measurements = rows.map(row => ({ ...row, difference: round(row.height - input_height) }));
            },
        },
    };
</script>

<style>
    .control-heights-row {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 1rem;
        margin-top: 1rem;
    }

    .control-heights-cell {
        flex: 0 0 12rem;
    }

    .control-heights-measure {
        display: flow-root;
    }
</style>
