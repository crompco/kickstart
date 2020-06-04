import test from 'ava';
import KsTimepicker from '../../lib/KsTimepicker';
import {resetDocument, component} from '../helpers/test-bootstrap';

test('Timepicker:computed', t => {
	resetDocument();

	let vm = component(KsTimepicker, {
		// value: '08:30 am',
		minTime: '08:30 am'
	});

	t.is(vm.timeOptions[0], '08:30 am');
});
