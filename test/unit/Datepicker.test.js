import test from 'ava';
import KsDatepicker from '../../lib/KsDatepicker';
import {resetDocument, component} from '../helpers/test-bootstrap';

test('Datepicker:computed', t => {
	resetDocument();

	let vm = component(KsDatepicker, {
		value: new Date(2017, 0, 1)
	});
	console.log(vm.$el);
	t.is(vm.display_date, '01/01/2017');
})
