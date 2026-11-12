<script>
    /**
     * KsDataColumn
     *
     * A config-only child of <ks-data-table>. It renders nothing itself; it
     * registers with the parent table, and the table builds the <th>/<td> cells
     * from its props and scoped slots.
     *
     * Slots:
     *  - default (scoped): custom cell renderer, receives { row, value }
     *  - header (scoped): custom header renderer, receives { column, sortField, sortDirection }
     */
    export default {
        name: 'KsDataColumn',

        inject: {
            ksDataTable: {
                default: null
            }
        },

        props: {
            label: {
                type: String,
                default: ''
            },
            // Key, dotted path or array of keys to read the cell value from.
            // An array joins its non-empty values with a space.
            field: {
                type: [String, Array],
                default: ''
            },
            sortable: {
                type: Boolean,
                default: false
            },
            // 'left' | 'center' | 'right'
            align: {
                type: String,
                default: null
            },
            // A number is px; a string is used as-is
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
            if ( this.ksDataTable ) {
                this.ksDataTable.registerColumn(this);
            }
        },

        beforeDestroy() {
            this.unregister();
        },

        beforeUnmount() {
            this.unregister();
        },

        methods: {
            unregister() {
                if ( this.ksDataTable ) {
                    this.ksDataTable.unregisterColumn(this);
                }
            },
        },

        render(createElement) {
            return createElement();
        }
    }
</script>
