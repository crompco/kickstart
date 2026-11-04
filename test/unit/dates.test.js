import { expect, test } from 'vitest';
import dates from '../../src/helpers/dates';


test('dates:getDaysInMonth', () => {
	let days = dates.getDaysInMonth(0, 2017);

	expect(days.length).toBe(31);
});


test('dates:cloneDate', () => {
	let d = new Date();
	let d_clone = dates.cloneDate(d);

	expect(d_clone.getTime()).toBe(d.getTime());
});


test('dates:subDays', () => {
	let d = new Date(2017, 0, 1);
	let d1 = dates.subDays(d, 1);
	let d2 = dates.subDays(d, 2);
	let d3 = dates.subDays(d, 32);

	expect(d1.getTime()).toBe((new Date(2016, 11, 31)).getTime());
	expect(d2.getTime()).toBe((new Date(2016, 11, 30)).getTime());
	expect(d3.getTime()).toBe((new Date(2016, 10, 30)).getTime());
});

test('dates:subMonths', () => {
	let d = new Date(2017, 0, 31);
	let d1 = dates.subMonths(d, 1);
	let d2 = dates.subMonths(d, 2);
	let d3 = dates.subMonths(d, 13);

	d1.setHours(0,0,0,0);
	d2.setHours(0,0,0,0);
	d3.setHours(0,0,0,0);

	expect(d1.getTime()).toBe((new Date(2016, 11, 31)).getTime());
	expect(d2.getTime()).toBe((new Date(2016, 10, 30)).getTime());
	expect(d3.getTime()).toBe((new Date(2015, 11, 31)).getTime());
});

test('dates:subYears', () => {
	let d = new Date(2017, 0, 31);

	let d1 = dates.subYears(d, 1);
	let d2 = dates.subYears(d, 2);

	expect(d1.getFullYear()).toBe(2016);
	expect(d2.getFullYear()).toBe(2015);
});


test('dates:addDays', () => {
	let d = new Date(2017, 0, 1);
	let d1 = dates.addDays(d, 1);
	let d2 = dates.addDays(d, 2);
	let d3 = dates.addDays(d, 32);

	expect(d1.getTime()).toBe((new Date(2017, 0, 2)).getTime());
	expect(d2.getTime()).toBe((new Date(2017, 0, 3)).getTime());
	d3.setHours(0,0,0,0);
	expect(d3.getTime()).toBe((new Date(2017, 1, 2, 0, 0, 0, 0)).getTime());
});

test('dates:addMonths', () => {
	let d = new Date(2017, 0, 31);
	let d1 = dates.addMonths(d, 1);
	let d2 = dates.addMonths(d, 2);
	let d3 = dates.addMonths(d, 13);

	d1.setHours(0,0,0,0);
	d2.setHours(0,0,0,0);
	d3.setHours(0,0,0,0);

	expect(d1.getTime()).toBe((new Date(2017, 1, 28)).getTime());
	expect(d2.getTime()).toBe((new Date(2017, 2, 31)).getTime());
	expect(d3.getTime()).toBe((new Date(2018, 1, 28)).getTime());
});

test('dates:formatDate', () => {
	let f1 = dates.formatDate(new Date(2017, 0, 31), 'Y-m-d');
	let f2 = dates.formatDate(new Date(2017, 0, 31), 'm/d/Y');
    let f3 = dates.formatDate(new Date(2017, 0, 31), 'm d, Y');
    let f4 = dates.formatDate(new Date(2017, 0, 31), 'D m/d/Y');
    let f5 = dates.formatDate(new Date(2017, 0, 31), 'l m/d/Y');
    let f6 = dates.formatDate(new Date(2017, 0, 31), 'm/d/y');

	expect(f1).toBe('2017-01-31');
	expect(f2).toBe('01/31/2017');
    expect(f3).toBe('01 31, 2017');
    expect(f4).toBe('Tue 01/31/2017');
    expect(f5).toBe('Tuesday 01/31/2017');
    expect(f6).toBe('01/31/17');
});


test('dates:parseDate', () => {
	let d1 = dates.parseDate("2017-01-31", 'Y-m-d');
	let d2 = dates.parseDate("01/31/2017", 'm/d/Y');

	d1.setHours(0,0,0,0);
	d2.setHours(0,0,0,0);
	expect(d1.getTime()).toBe(new Date(2017, 0, 31).getTime());
	expect(d2.getTime()).toBe(new Date(2017, 0, 31).getTime());
});

test('dates:formatTime', () => {
    expect('01:00 pm').toBe(dates.formatTime('13:00:00'));
    expect('12:00 am').toBe(dates.formatTime('00:00:00'));
    expect('12:30').toBe(dates.formatTime('12:30:00', 'h:i'));
    expect('pm 12:30').toBe(dates.formatTime('12:30:00', 'a h:i'));
});


test('dates:parseTime', () => {
    expect(13).toBe(dates.parseTime('1:00 PM').full_hour);
    expect(14).toBe(dates.parseTime('1:14 PM').minute);
})

test('dates:diffInDays', () => {
    expect(-1).toBe(dates.diffInDays('2019-01-01', '2018-12-31'));
    expect(-30).toBe(dates.diffInDays('2019-12-31', '2019-12-01'));
    expect(30).toBe(dates.diffInDays('2019-12-01', '2019-12-31'));
    expect(1).toBe(dates.diffInDays('2018-12-31', '2019-01-01'));
    expect(0).toBe(dates.diffInDays('2018-12-31', '2018-12-31'));
})