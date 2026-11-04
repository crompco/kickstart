export default {
    props: {
        options: {},
        valueKey: {
            type: String,
            default: 'value'
        },
        labelKey: {
            type: String,
            default: 'label'
        },
        buttons: {
            type: Boolean,
            default: false
        },
        classNames: String,
        disabled: {
            type: Boolean,
            default: false
        },
    },

    computed: {
        hasObjects() {
            const options = Object.values(this.options || {});

            return options.length > 0 && options[0] instanceof Object;
        },
        optionsList() {
            return Object.values(this.options || {}).map((option) => {
                if ( this.hasObjects ) {
                    return {
                        value: option[this.valueKey],
                        label: option[this.labelKey],
                    };
                }

                return {
                    value: option,
                    label: option,
                };
            });
        },
        groupClass() {
            const classes = {
                'option-buttons': this.buttons
            };

            if ( this.classNames ) {
                classes[this.classNames] = true;
            }

            if ( this.disabled ) {
                classes['disabled'] = true;
            }

            return classes;
        }
    },
}
