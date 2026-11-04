import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import KsDatepicker from '../../src/components/KsDatepicker.vue';

test('Datepicker:computed', () => {
	let vm = mount(KsDatepicker, {
		propsData: {
			value: new Date(2017, 0, 1)
		},
	}).vm;

	expect(vm.display_date).toBe('01/01/2017');
	expect(vm.value_date).toBe('2017-01-01');
});
