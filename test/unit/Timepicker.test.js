import test from 'ava';
import KsTimepicker from '../../lib/KsTimepicker';
import {resetDocument, component} from '../helpers/test-bootstrap';

test('Timepicker:computed', t => {
	resetDocument();

	let vm = component(KsTimepicker, {
		minTime: '08:30 am',
		timeStep: '15',
		maxTime: '9:15 am'
	});

	t.deepEqual(vm.timeOptions, [
		'08:30 am',
		'08:45 am',
		'09:00 am',
		'09:15 am'
	]);
});

test('Timepicker:filterDisplayValue 24-hour Military Input', t => {
	resetDocument();

	let vm = component(KsTimepicker, {
		minTime: '00:00',
		timeStep: '30',
		maxTime: '11:30 pm',
		timeFiormat: 'H:i',
		displayFormat: 'H:i a'
	});

	vm.lookup_name = '0900';

	t.true(vm.filterDisplayValue('09:00 am'));
	t.false(vm.filterDisplayValue('09:45 pm'));
	t.false(vm.filterDisplayValue('09:15 pm'));
	t.false(vm.filterDisplayValue('08:45 pm'));

	vm.lookup_name = '900'
	t.true(vm.filterDisplayValue('09:00 am'));

	vm.lookup_name = '0930'
	t.true(vm.filterDisplayValue('09:30 am'));

	vm.lookup_name = '930'
	t.true(vm.filterDisplayValue('09:30 am'));

	vm.lookup_name = '1200'
	t.true(vm.filterDisplayValue('12:00 pm'));

	vm.lookup_name = '0000'
	t.true(vm.filterDisplayValue('00:00 am'));

	vm.lookup_name = '000'
	t.true(vm.filterDisplayValue('00:00 am'));
});

test('Timepicker:filterDisplayValue matches left to right', t => {
	resetDocument();

	let vm = component(KsTimepicker, {
		minTime: '10:00 am',
		timeStep: '15',
		displayFormat: 'h:i a'
	});

	vm.lookup_name = '1';
	t.true(vm.filterDisplayValue('01:00 pm'));
	t.false(vm.filterDisplayValue('02:10 pm'));
	t.false(vm.filterDisplayValue('00:10 pm'));

	vm.lookup_name = '1:';
	t.true(vm.filterDisplayValue('1:00 pm'));
	t.true(vm.filterDisplayValue('01:00 pm'));

	vm.lookup_name = '01';
	t.true(vm.filterDisplayValue('01:00 am'));
	t.true(vm.filterDisplayValue('01:00 pm'));
	t.false(vm.filterDisplayValue('10:01 pm'));

	vm.lookup_name = '01:';
	t.true(vm.filterDisplayValue('01:00 am'));
	t.true(vm.filterDisplayValue('01:00 pm'));
	t.false(vm.filterDisplayValue('10:01 pm'));
});
