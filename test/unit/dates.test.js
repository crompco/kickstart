import test from 'ava';
import dates from '../../lib/dates';

// getDaysInMonth,
// 	cloneDate,
// 	subDays,
// 	subMonths,
// 	subYears,
// 	addDays,
// 	addMonths,
// 	formatDate,
// 	parseDate,

test('dates:getDaysInMonth', t => {
	let days = dates.getDaysInMonth(0, 2017);

	t.is(days.length, 31);
});


test('dates:cloneDate', t => {
	let d = new Date();
	let d_clone = dates.cloneDate(d);

	t.is(d_clone.getTime(), d.getTime());
});


test('dates:subDays', t => {
	let d = new Date(2017, 0, 1);
	let d1 = dates.subDays(d, 1);
	let d2 = dates.subDays(d, 2);
	let d3 = dates.subDays(d, 3);
	let d4 = dates.subDays(d, 32);

	t.is(d1.getTime(), (new Date(2016, 11, 31)).getTime());
	t.is(d2.getTime(), (new Date(2016, 11, 30)).getTime());
	t.is(d3.getTime(), (new Date(2016, 11, 29)).getTime());
	t.is(d4.getTime(), (new Date(2016, 10, 30)).getTime());
});

test('dates:subMonths', t => {
	let d = new Date(2017, 0, 31);
	let d1 = dates.subMonths(d, 1);
	let d2 = dates.subMonths(d, 2);
	let d3 = dates.subMonths(d, 3);
	// let d4 = dates.subMonths(d, 13);

	d1.setHours(0,0,0,0);
	d2.setHours(0,0,0,0);
	d3.setHours(0,0,0,0);
	// d4.setHours(0,0,0,0);

	t.is(d1.getTime(), (new Date(2016, 11, 31)).getTime());
	t.is(d2.getTime(), (new Date(2016, 10, 30)).getTime());
	t.is(d3.getTime(), (new Date(2016, 9, 31)).getTime());
	// t.is(d4.getTime(), (new Date(2016, 10, 30)).getTime());
});
