import test from 'ava';
import KsDatepicker from '../../lib/KsDatepicker';
import {resetDocument, component} from '../helpers/test-bootstrap';

test('Datepicker:computed', t => {
	resetDocument();

	let vm = component(KsDatepicker, {
		value: new Date(2017, 0, 1)
	});

	t.is(vm.display_date, '01/01/2017');
	t.is(vm.value_date, '2017-01-01');
});
