<template>
	<div class="ks-checkbox-group" :class="groupClass">
		<label class="ks-checkbox-group-title label">
			<slot>{{label}}</slot>
		</label>
		<div class="checkbox">
			<template v-for="option in optionsList">
				<ks-checkbox
					:name="name"
					:value="option.value"
					:label="option.label"
					:checked="value"
                    @input="$emit('input', $event)"
				></ks-checkbox>
			</template>
		</div>
	</div>
</template>


<script>
	import KsCheckbox from './KsCheckbox.vue';
	import OptionGroups from './mixins/OptionGroups';

	export default {
		name: 'KsCheckboxGroup',

        mixins: [OptionGroups],

		model: {
			prop: 'value'
		},

		props: {
			value: {
			    default() {
			        return [];
                }
            },
			label: String,
			name: {
				type: String,
				required: true
			},
		},

		components: {
			KsCheckbox
		}
	}
</script>

<style></style>
