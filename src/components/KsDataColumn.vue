<script>
    /**
     * KsDataColumn
     *
     * A config-only child of <ks-data-table>. It renders nothing itself; instead it
     * registers its props (and optional scoped slots) with the parent table via
     * provide/inject, and the table builds the actual <th>/<td> cells from that config.
     *
     * Slots:
     *  - default (scoped): custom cell renderer, receives { row, value }
     *  - header (scoped): custom header renderer, receives { column, sortField, sortDirection }
     *
     * Props:
     *  - label: column header text
     *  - field: key (or array of keys) on the row to read the cell value from.
     *           When an array, non-empty values are joined with a space.
     *  - sortable: whether the header is clickable to emit a `sort` event
     *  - align: text alignment for the column ('left' | 'center' | 'right')
     *  - width: fixed column width (a number is treated as px, a string is used as-is)
     *  - tdClass / thClass: extra classes for this column's cells / header
     */
    export default {
        name: 'KsDataColumn',

        inject: ['$columns'],

        props: {
            label: {
                type: String,
                default: ''
            },
            field: {
                type: [String, Array],
                default: ''
            },
            sortable: {
                type: Boolean,
                default: false
            },
            align: {
                type: String,
                default: null // 'left' | 'center' | 'right'
            },
            width: {
                type: [String, Number],
                default: null
            },
            tdClass: {
                type: [String, Object, Array],
                default: null
            },
            thClass: {
                type: [String, Object, Array],
                default: null
            }
        },

        mounted() {
            if ( this.$columns ) {
                this.$columns.push(this);
            }
        },

        beforeDestroy() {
            if ( this.$columns ) {
                const index = this.$columns.indexOf(this);
                if ( index !== -1 ) {
                    this.$columns.splice(index, 1);
                }
            }
        },

        // Renders nothing: the parent <ks-data-table> reads this instance's
        // $props and $scopedSlots directly when building the table.
        render(createElement) {
            return createElement();
        }
    }
</script>
