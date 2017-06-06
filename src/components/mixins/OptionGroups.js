
export default {
    props: {
        options: {},
        valueKey: {
            type: String,
            default: ''
        },
        labelKey: {
            type: String,
            default: 'label'
        },
        buttons: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        hasObjects() {
            for ( var i in this.options ) {
                if ( this.options[i] instanceof Object ) {
                    return true;
                }
                return false;
            }
        },
        optionsList() {
            let optionsList = [];
            for ( var i in this.options ) {
                if ( this.hasObjects ) {
                    if ( this.valueKey.length ||  this.labelKey.length ) {
                        optionsList.push({
                            value: this.options[i][this.valueKey],
                            label: this.options[i][this.labelKey],
                        });
                    } else {
                        if ( !this.options[i].hasOwnProperty('value') || !this.options[i].hasOwnProperty('label') ) {
                            return [];
                        }
                        optionsList.push(this.options[i]);
                    }
                } else {
                    optionsList.push({
                        value: this.options[i],
                        label: this.options[i],
                    });
                }
            }

            return optionsList;
        }
    },
}
