import test from 'ava';
import dates from '../../lib/dates';


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
	let d3 = dates.subDays(d, 32);

	t.is(d1.getTime(), (new Date(2016, 11, 31)).getTime());
	t.is(d2.getTime(), (new Date(2016, 11, 30)).getTime());
	t.is(d3.getTime(), (new Date(2016, 10, 30)).getTime());
});

test('dates:subMonths', t => {
	let d = new Date(2017, 0, 31);
	let d1 = dates.subMonths(d, 1);
	let d2 = dates.subMonths(d, 2);
	let d3 = dates.subMonths(d, 13);

	d1.setHours(0,0,0,0);
	d2.setHours(0,0,0,0);
	d3.setHours(0,0,0,0);

	t.is(d1.getTime(), (new Date(2016, 11, 31)).getTime());
	t.is(d2.getTime(), (new Date(2016, 10, 30)).getTime());
	t.is(d3.getTime(), (new Date(2015, 11, 31)).getTime());
});

test('dates:subYears', t => {
	let d = new Date(2017, 0, 31);

	let d1 = dates.subYears(d, 1);
	let d2 = dates.subYears(d, 2);

	t.is(d1.getFullYear(), 2016);
	t.is(d2.getFullYear(), 2015);
});


test('dates:addDays', t => {
	let d = new Date(2017, 0, 1);
	let d1 = dates.addDays(d, 1);
	let d2 = dates.addDays(d, 2);
	let d3 = dates.addDays(d, 32);

	t.is(d1.getTime(), (new Date(2017, 0, 2)).getTime());
	t.is(d2.getTime(), (new Date(2017, 0, 3)).getTime());
	d3.setHours(0,0,0,0);
	t.is(d3.getTime(), (new Date(2017, 1, 2, 0, 0, 0, 0)).getTime());
});

test('dates:addMonths', t => {
	let d = new Date(2017, 0, 31);
	let d1 = dates.addMonths(d, 1);
	let d2 = dates.addMonths(d, 2);
	let d3 = dates.addMonths(d, 13);

	d1.setHours(0,0,0,0);
	d2.setHours(0,0,0,0);
	d3.setHours(0,0,0,0);

	t.is(d1.getTime(), (new Date(2017, 1, 28)).getTime());
	t.is(d2.getTime(), (new Date(2017, 2, 31)).getTime());
	t.is(d3.getTime(), (new Date(2018, 1, 28)).getTime());
});

test('dates:formatDate', t => {
	let f1 = dates.formatDate(new Date(2017, 0, 31), 'Y-m-d');
	let f2 = dates.formatDate(new Date(2017, 0, 31), 'm/d/Y');
    let f3 = dates.formatDate(new Date(2017, 0, 31), 'm d, Y');
    let f4 = dates.formatDate(new Date(2017, 0, 31), 'D m/d/Y');
    let f5 = dates.formatDate(new Date(2017, 0, 31), 'l m/d/Y');

	t.is(f1, '2017-01-31');
	t.is(f2, '01/31/2017');
    t.is(f3, '01 31, 2017');
    t.is(f4, 'Tue 01/31/2017');
    t.is(f5, 'Tuesday 01/31/2017');
});


test('dates:parseDate', t => {
	let d1 = dates.parseDate("2017-01-31", 'Y-m-d');
	let d2 = dates.parseDate("01/31/2017", 'm/d/Y');

	d1.setHours(0,0,0,0);
	d2.setHours(0,0,0,0);
	t.is(d1.getTime(), new Date(2017, 0, 31).getTime());
	t.is(d2.getTime(), new Date(2017, 0, 31).getTime());
});

test('dates:formatTime', t => {
    t.is('01:00 pm', dates.formatTime('13:00:00'));
    t.is('12:00 am', dates.formatTime('00:00:00'));
    t.is('12:30', dates.formatTime('12:30:00', 'h:i'));
    t.is('pm 12:30', dates.formatTime('12:30:00', 'a h:i'));
});


test('dates:parseTime', t => {
    t.is(13, dates.parseTime('1:00 PM').full_hour);
    t.is(14, dates.parseTime('1:14 PM').minute);
})

test('dates:diffInDays', t => {
    t.is(1, dates.diffInDays('2019-01-01', '2018-12-31'));
    t.is(30, dates.diffInDays('2019-12-31', '2019-12-01'));
})