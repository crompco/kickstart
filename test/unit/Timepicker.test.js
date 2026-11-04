import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import KsTimepicker from '../../src/components/KsTimepicker.vue';

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