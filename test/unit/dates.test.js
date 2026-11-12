import { describe, expect, test, vi } from 'vitest';
import dates, { LOCAL, UTC } from '../../src/helpers/dates';

const utc = (year, month, day, hour = 0, minute = 0) => new Date(Date.UTC(year, month, day, hour, minute));

describe('getDaysInMonth', () => {
    test('returns local midnights by default', () => {
        const days = dates.getDaysInMonth(0, 2017);

        expect(days.length).toBe(31);
        expect(days[0].getTime()).toBe(new Date(2017, 0, 1).getTime());
        expect(days[30].getDate()).toBe(31);
    });

    test('handles leap years', () => {
        expect(dates.getDaysInMonth(1, 2016).length).toBe(29);
        expect(dates.getDaysInMonth(1, 2017).length).toBe(28);
    });

    test('returns midnights in the given time zone', () => {
        const days = dates.getDaysInMonth(2, 2024, UTC);

        expect(days[0].toISOString()).toBe('2024-03-01T00:00:00.000Z');
        expect(days.every(day => day.getUTCHours() === 0)).toBe(true);
    });
});

test('cloneDate', () => {
    const d = new Date();
    const d_clone = dates.cloneDate(d);

    expect(d_clone.getTime()).toBe(d.getTime());
    expect(d_clone).not.toBe(d);
});

describe('day arithmetic', () => {
    test('subDays crosses months and years in UTC', () => {
        const d = utc(2017, 0, 1);

        expect(dates.subDays(d, 1).getTime()).toBe(utc(2016, 11, 31).getTime());
        expect(dates.subDays(d, 2).getTime()).toBe(utc(2016, 11, 30).getTime());
        expect(dates.subDays(d, 32).getTime()).toBe(utc(2016, 10, 30).getTime());
    });

    test('addDays crosses months in UTC', () => {
        const d = utc(2017, 0, 1);

        expect(dates.addDays(d, 1).getTime()).toBe(utc(2017, 0, 2).getTime());
        expect(dates.addDays(d, 32).getTime()).toBe(utc(2017, 1, 2).getTime());
    });

    test('keeps the clock time across DST in a named zone', () => {
        // 2024-03-10 is the spring DST change in New York
        const before = dates.makeDate({ year: 2024, month: 2, day: 9, hour: 9 }, 'America/New_York');
        const after = dates.addDays(before, 2, 'America/New_York');

        expect(dates.dateParts(after, 'America/New_York')).toMatchObject({ year: 2024, month: 2, day: 11, hour: 9 });
        expect(after.getTime() - before.getTime()).toBe(47 * 3600000);
    });

    test('works on local dates with the local zone', () => {
        const d = new Date(2017, 0, 1);

        expect(dates.addDays(d, 31, LOCAL).getTime()).toBe(new Date(2017, 1, 1).getTime());
        expect(dates.subDays(d, 1, LOCAL).getTime()).toBe(new Date(2016, 11, 31).getTime());
    });
});

describe('month and year arithmetic', () => {
    test('subMonths clamps to the end of the month', () => {
        const d = utc(2017, 0, 31);

        expect(dates.subMonths(d, 1).getTime()).toBe(utc(2016, 11, 31).getTime());
        expect(dates.subMonths(d, 2).getTime()).toBe(utc(2016, 10, 30).getTime());
        expect(dates.subMonths(d, 13).getTime()).toBe(utc(2015, 11, 31).getTime());
    });

    test('addMonths clamps to the end of the month', () => {
        const d = utc(2017, 0, 31);

        expect(dates.addMonths(d, 1).getTime()).toBe(utc(2017, 1, 28).getTime());
        expect(dates.addMonths(d, 2).getTime()).toBe(utc(2017, 2, 31).getTime());
        expect(dates.addMonths(d, 13).getTime()).toBe(utc(2018, 1, 28).getTime());
        expect(dates.addMonths(d, 25).getTime()).toBe(utc(2019, 1, 28).getTime());
    });

    test('keeps the clock time', () => {
        expect(dates.addMonths(utc(2017, 0, 15, 13, 45), 1).getTime()).toBe(utc(2017, 1, 15, 13, 45).getTime());
    });

    test('works on local dates with the local zone', () => {
        const d = new Date(2017, 0, 31);

        expect(dates.addMonths(d, 1, LOCAL).getTime()).toBe(new Date(2017, 1, 28).getTime());
        expect(dates.subMonths(d, 13, LOCAL).getTime()).toBe(new Date(2015, 11, 31).getTime());
    });

    test('subYears and addYears clamp Feb 29', () => {
        const leap_day = utc(2016, 1, 29);

        expect(dates.subYears(leap_day, 1).getTime()).toBe(utc(2015, 1, 28).getTime());
        expect(dates.addYears(leap_day, 4).getTime()).toBe(utc(2020, 1, 29).getTime());
        expect(dates.subYears(utc(2017, 0, 31), 2).getUTCFullYear()).toBe(2015);
    });

    test('dateModify reports an invalid increment', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        const d = utc(2017, 0, 1);

        expect(dates.dateModify(d, 'fortnight', 1).getTime()).toBe(d.getTime());
        expect(error).toHaveBeenCalledOnce();
    });
});

describe('formatDate', () => {
    test('formats every token in UTC', () => {
        const d = utc(2017, 0, 31);

        expect(dates.formatDate(d, 'Y-m-d')).toBe('2017-01-31');
        expect(dates.formatDate(d, 'm/d/Y')).toBe('01/31/2017');
        expect(dates.formatDate(d, 'm d, Y')).toBe('01 31, 2017');
        expect(dates.formatDate(d, 'D m/d/Y')).toBe('Tue 01/31/2017');
        expect(dates.formatDate(d, 'l m/d/Y')).toBe('Tuesday 01/31/2017');
        expect(dates.formatDate(d, 'm/d/y')).toBe('01/31/17');
        expect(dates.formatDate(d, 'Y-m-1')).toBe('2017-01-1');
    });

    test('does not format text that a token inserted', () => {
        expect(dates.formatDate(utc(2017, 0, 30), 'l D')).toBe('Monday Mon');
    });

    test('round trips a date string in any zone', () => {
        expect(dates.formatDate('2017-01-31', 'm/d/Y', 'Y-m-d')).toBe('01/31/2017');
        expect(dates.formatDate('01/31/2017', 'Y-m-d', 'm/d/Y', dates.defaultLocale, LOCAL)).toBe('2017-01-31');
        expect(dates.formatDate('2017-01-31', 'D', 'Y-m-d', dates.defaultLocale, 'Asia/Tokyo')).toBe('Tue');
    });

    test('formats in the given time zone', () => {
        const d = utc(2017, 0, 31, 23);

        expect(dates.formatDate(d, 'Y-m-d')).toBe('2017-01-31');
        expect(dates.formatDate(d, 'Y-m-d', 'Y-m-d', dates.defaultLocale, 'Asia/Tokyo')).toBe('2017-02-01');
        expect(dates.formatDate(d, 'Y-m-d', 'Y-m-d', dates.defaultLocale, 'America/Chicago')).toBe('2017-01-31');
    });

    test('formats local dates with the local zone', () => {
        expect(dates.formatDate(new Date(2017, 0, 31), 'Y-m-d', 'Y-m-d', dates.defaultLocale, LOCAL)).toBe('2017-01-31');
    });

    test('returns an empty string for an invalid date', () => {
        expect(dates.formatDate('', 'm/d/Y')).toBe('');
        expect(dates.formatDate(new Date(NaN))).toBe('');
    });
});

describe('parseDate', () => {
    test('returns local midnight by default', () => {
        expect(dates.parseDate('2017-01-31', 'Y-m-d').getTime()).toBe(new Date(2017, 0, 31).getTime());
        expect(dates.parseDate('01/31/2017', 'm/d/Y').getTime()).toBe(new Date(2017, 0, 31).getTime());
    });

    test('ignores a time after the date', () => {
        expect(dates.parseDate('2017-01-31 13:45:00', 'Y-m-d H:i:s').getTime()).toBe(new Date(2017, 0, 31).getTime());
    });

    test('returns midnight in the given time zone', () => {
        expect(dates.parseDate('2017-01-31', 'Y-m-d', UTC).toISOString()).toBe('2017-01-31T00:00:00.000Z');
        expect(dates.parseDate('2017-07-04', 'Y-m-d', 'America/New_York').toISOString()).toBe('2017-07-04T04:00:00.000Z');
        expect(dates.parseDate('2017-01-04', 'Y-m-d', 'America/New_York').toISOString()).toBe('2017-01-04T05:00:00.000Z');
    });

    test('returns an invalid date for missing input', () => {
        expect(isNaN(dates.parseDate('').getTime())).toBe(true);
        expect(isNaN(dates.parseDate(null).getTime())).toBe(true);
        expect(isNaN(dates.parseDate('nope').getTime())).toBe(true);
    });

    test('clones a date', () => {
        const d = new Date(2017, 0, 31);

        expect(dates.parseDate(d).getTime()).toBe(d.getTime());
        expect(dates.parseDate(d)).not.toBe(d);
    });
});

test('formatTime', () => {
    expect(dates.formatTime('13:00:00')).toBe('01:00 pm');
    expect(dates.formatTime('00:00:00')).toBe('12:00 am');
    expect(dates.formatTime('12:30:00', 'h:i')).toBe('12:30');
    expect(dates.formatTime('12:30:00', 'a h:i')).toBe('pm 12:30');
    expect(dates.formatTime('1:05 pm', 'H:i')).toBe('13:05');
    expect(dates.formatTime('9:05 am', 'h:iA')).toBe('09:05AM');
    expect(dates.formatTime('nope')).toBe('');
});

describe('parseTime', () => {
    test('parses 12 hour times', () => {
        expect(dates.parseTime('1:00 PM').full_hour).toBe(13);
        expect(dates.parseTime('1:14 PM').minute).toBe(14);
        expect(dates.parseTime('12:00 am')).toEqual({ hour: 12, minute: 0, meridiem: 'am', full_hour: 0 });
        expect(dates.parseTime('12:00pm')).toEqual({ hour: 12, minute: 0, meridiem: 'pm', full_hour: 12 });
        expect(dates.parseTime('2pm')).toEqual({ hour: 2, minute: 0, meridiem: 'pm', full_hour: 14 });
    });

    test('parses 24 hour times', () => {
        expect(dates.parseTime('13:30')).toEqual({ hour: 1, minute: 30, meridiem: 'pm', full_hour: 13 });
        expect(dates.parseTime('13:30:59')).toEqual({ hour: 1, minute: 30, meridiem: 'pm', full_hour: 13 });
        expect(dates.parseTime('00:15')).toEqual({ hour: 12, minute: 15, meridiem: 'am', full_hour: 0 });
    });

    test('keeps the 24 hour value when it also has a meridiem', () => {
        expect(dates.parseTime('13:30 pm').full_hour).toBe(13);
        expect(dates.parseTime('00:00 am').full_hour).toBe(0);
    });

    test('parses military times without a colon', () => {
        expect(dates.parseTime('1430')).toEqual({ hour: 2, minute: 30, meridiem: 'pm', full_hour: 14 });
        expect(dates.parseTime('930')).toEqual({ hour: 9, minute: 30, meridiem: 'am', full_hour: 9 });
        expect(dates.parseTime('0000').full_hour).toBe(0);
    });

    test('treats 24:00 as midnight at the end of the day', () => {
        expect(dates.parseTime('24:00').hour).toBe(12);
        expect(dates.parseTime('24:00').meridiem).toBe('am');
        expect(dates.parseTime('12:00').meridiem).toBe('pm');
    });

    test('returns the default for invalid times', () => {
        expect(dates.parseTime('nope')).toBe(false);
        expect(dates.parseTime('25:00', null)).toBe(null);
        expect(dates.parseTime('10:75')).toBe(false);
        expect(dates.parseTime(null, '')).toBe('');
        expect(dates.parseTime(undefined)).toBe(false);
    });
});

describe('diffInDays', () => {
    test('counts calendar days between strings', () => {
        expect(dates.diffInDays('2019-01-01', '2018-12-31')).toBe(-1);
        expect(dates.diffInDays('2019-12-31', '2019-12-01')).toBe(-30);
        expect(dates.diffInDays('2019-12-01', '2019-12-31')).toBe(30);
        expect(dates.diffInDays('2018-12-31', '2019-01-01')).toBe(1);
        expect(dates.diffInDays('2018-12-31', '2018-12-31')).toBe(0);
    });

    test('counts a DST change as one day in a named zone', () => {
        expect(dates.diffInDays('2024-11-02', '2024-11-04', 'Y-m-d', 'America/New_York')).toBe(2);
        expect(dates.diffInDays('2024-03-09', '2024-03-11', 'Y-m-d', LOCAL)).toBe(2);
    });

    test('ignores the time of day', () => {
        expect(dates.diffInDays(utc(2019, 0, 1, 23), utc(2019, 0, 2, 1))).toBe(1);
        expect(dates.diffInDays(utc(2019, 0, 1, 1), utc(2019, 0, 1, 23))).toBe(0);
    });
});
