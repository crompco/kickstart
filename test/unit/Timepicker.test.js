import { afterEach, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import KsTimepicker from '../../src/components/KsTimepicker.vue';
import { flushPromises } from '../helpers/layout';

test('Timepicker:computed', () => {
	let vm = mount(KsTimepicker, {
		propsData: {
			minTime: '08:30 am',
			timeStep: '15',
			maxTime: '9:15 am'
		},
	}).vm;

	expect(vm.timeOptions).toEqual([
		'08:30 am',
		'08:45 am',
		'09:00 am',
		'09:15 am'
	]);
});

test('Timepicker:filterDisplayValue 24-hour Military Input', () => {
	let vm = mount(KsTimepicker, {
		propsData: {
			minTime: '00:00',
			timeStep: '30',
			maxTime: '11:30 pm',
			timeFormat: 'H:i',
			displayFormat: 'H:i a'
		},
	}).vm;

	vm.lookup_name = '0900';

	expect(vm.filterDisplayValue('09:00 am')).toBe(true);
	expect(vm.filterDisplayValue('09:45 pm')).toBe(false);
	expect(vm.filterDisplayValue('09:15 pm')).toBe(false);
	expect(vm.filterDisplayValue('08:45 pm')).toBe(false);

	vm.lookup_name = '900'
	expect(vm.filterDisplayValue('09:00 am')).toBe(true);

	vm.lookup_name = '0930'
	expect(vm.filterDisplayValue('09:30 am')).toBe(true);

	vm.lookup_name = '930'
	expect(vm.filterDisplayValue('09:30 am')).toBe(true);

	vm.lookup_name = '1200'
	expect(vm.filterDisplayValue('12:00 pm')).toBe(true);

	vm.lookup_name = '0000'
	expect(vm.filterDisplayValue('00:00 am')).toBe(true);

	vm.lookup_name = '000'
	expect(vm.filterDisplayValue('00:00 am')).toBe(true);
});

test('Timepicker:filterDisplayValue matches left to right', () => {
	let vm = mount(KsTimepicker, {
		propsData: {
			minTime: '10:00 am',
			timeStep: '15',
			displayFormat: 'h:i a'
		},
	}).vm;

	vm.lookup_name = '1';
	expect(vm.filterDisplayValue('01:00 pm')).toBe(true);
	expect(vm.filterDisplayValue('02:10 pm')).toBe(false);
	expect(vm.filterDisplayValue('00:10 pm')).toBe(false);

	vm.lookup_name = '1:';
	expect(vm.filterDisplayValue('1:00 pm')).toBe(true);
	expect(vm.filterDisplayValue('01:00 pm')).toBe(true);

	vm.lookup_name = '01';
	expect(vm.filterDisplayValue('01:00 am')).toBe(true);
	expect(vm.filterDisplayValue('01:00 pm')).toBe(true);
	expect(vm.filterDisplayValue('10:01 pm')).toBe(false);

	vm.lookup_name = '01:';
	expect(vm.filterDisplayValue('01:00 am')).toBe(true);
	expect(vm.filterDisplayValue('01:00 pm')).toBe(true);
	expect(vm.filterDisplayValue('10:01 pm')).toBe(false);
});

test('Timepicker:min/max time can be null', () => {
	let vm = mount(KsTimepicker, {
		propsData: {
			minTime: null,
			maxTime: null,
		},
	}).vm;

	expect(vm.timeOptions[0]).toEqual('04:00 am');
	expect(vm.timeOptions[vm.timeOptions.length - 1]).toEqual('11:30 pm')
});
describe('KsTimepicker', () => {
	let wrapper = null;

	function mountPicker(template, data) {
		wrapper = mount({ template, components: { KsTimepicker }, data: () => data }, { attachTo: document.body });
		return wrapper;
	}

	afterEach(() => {
		if ( wrapper ) {
			wrapper.destroy();
			wrapper = null;
		}
		document.body.innerHTML = '';
	});

	test('end of day adds 23:59 once', () => {
		const vm = mount(KsTimepicker, { propsData: { minTime: '23:00', timeStep: 1, endOfDay: true } }).vm;

		expect(vm.timeOptions[vm.timeOptions.length - 1]).toBe('11:59 pm');
		expect(new Set(vm.timeOptions).size).toBe(vm.timeOptions.length);
	});

	test('24:00 is midnight and keeps keys unique', () => {
		const vm = mount(KsTimepicker, { propsData: { minTime: '00:00', maxTime: '24:00', timeStep: 60 } }).vm;

		expect(vm.timeOptions[0]).toBe('12:00 am');
		expect(vm.timeOptions).toContain('12:00 pm');
		expect(new Set(vm.timeOptions).size).toBe(vm.timeOptions.length);
	});

	test('options stay on the step boundaries of the hour', () => {
		const vm = mount(KsTimepicker, { propsData: { minTime: '08:10', maxTime: '09:00', timeStep: 30 } }).vm;

		expect(vm.timeOptions).toEqual(['08:30 am', '09:00 am']);
	});

	test('a 24 hour lookup matches its time', () => {
		const vm = mount(KsTimepicker, { propsData: { minTime: '00:00' } }).vm;

		vm.lookup_name = '1300';
		expect(vm.filterDisplayValue('01:00 pm')).toBe(true);
		expect(vm.filterDisplayValue('01:00 am')).toBe(false);

		vm.lookup_name = '1';
		expect(vm.filterDisplayValue('02:10 pm')).toBe(false);
	});

	test('selects the first option at index 0', async () => {
		mountPicker('<ks-timepicker v-model="time" min-time="08:00" max-time="09:00"></ks-timepicker>', { time: '' });
		const picker = wrapper.findComponent(KsTimepicker);

		picker.vm.isOpen = true;
		await flushPromises();
		expect(picker.vm.dropdown_positioner).not.toBeNull();

		picker.vm.selectItemAtIndex(0);
		await flushPromises();

		expect(wrapper.vm.time).toBe('08:00');
		expect(picker.vm.isOpen).toBe(false);
		expect(picker.vm.dropdown_positioner).toBeNull();
	});

	test('a typed 24 hour time is kept', async () => {
		mountPicker('<ks-timepicker v-model="time"></ks-timepicker>', { time: '' });
		const picker = wrapper.findComponent(KsTimepicker);

		picker.vm.isOpen = true;
		picker.vm.display_value = '1437';
		picker.vm.validateDisplayValue();
		await flushPromises();

		expect(wrapper.vm.time).toBe('14:37');
		expect(wrapper.find('input[type="text"]').element.value).toBe('02:37 pm');
	});

	test('Enter keeps a typed 24 hour time that is not in the list', async () => {
		mountPicker('<ks-timepicker v-model="time"></ks-timepicker>', { time: '' });
		const input = wrapper.find('input[type="text"]');

		input.element.focus();
		await flushPromises();
		await input.setValue('1437');
		await input.trigger('keyup', { key: '7' });
		expect(wrapper.findAll('li').length).toBe(0);

		await input.trigger('keydown', { key: 'Enter' });
		await flushPromises();

		expect(wrapper.vm.time).toBe('14:37');
		expect(input.element.value).toBe('02:37 pm');
	});

	test('an invalid typed time resets and an empty one clears', async () => {
		mountPicker('<ks-timepicker v-model="time"></ks-timepicker>', { time: '09:00' });
		const picker = wrapper.findComponent(KsTimepicker);
		await flushPromises();

		picker.vm.display_value = '99:99';
		picker.vm.validateDisplayValue();
		await flushPromises();
		expect(picker.vm.display_value).toBe('09:00 am');
		expect(wrapper.vm.time).toBe('09:00');

		picker.vm.display_value = '';
		picker.vm.validateDisplayValue();
		await flushPromises();
		expect(wrapper.vm.time).toBe('');
	});
});
