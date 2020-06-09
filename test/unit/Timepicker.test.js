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
