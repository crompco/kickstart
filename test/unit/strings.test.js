import { expect, test } from 'vitest';
import strings from '../../src/helpers/strings';


test('strings:escapeRegExp', () => {
	let str = strings.escapeRegExp('1\\2');

	expect(str).toBe('1\\\\2');
});

test('strings:ucwords', () => {
	let str = strings.ucwords('aaron');
	let str2 = strings.ucwords('a-aron');
	let str3 = strings.ucwords('aaron smith');

	expect(str).toBe('Aaron');
	expect(str2).toBe('A-aron');
	expect(str3).toBe('Aaron Smith');
});

test('strings:posesses', () => {
	expect(strings.posesses('Sara')).toBe("Sara's");
	expect(strings.posesses('Chas')).toBe("Chas'");
});

test('strings:currency', () => {
	expect(strings.currency('10')).toBe("$10.00");
	expect(strings.currency('0', 'c')).toBe("c0.00");
})

test('strings:pad_left', () => {
	expect(strings.pad_left(10, 0, 4)).toBe("0010");
	expect(strings.pad_left('1', 0, 2)).toBe("01");
	expect(strings.pad_left('01', 0, 2)).toBe("01");
});

test('strings:ellipsis', () => {
   expect(strings.ellipsis("mystring", 5)).toBe('mystr...');
   expect(strings.ellipsis("strin", 5)).toBe('strin');
});

test('strings:ucwords returns an empty string for null', () => {
    expect(strings.ucwords(null)).toBe('');
    expect(strings.ucwords(undefined)).toBe('');
    expect(strings.ucwords(5)).toBe('5');
});

test('strings:posesses handles empty values', () => {
    expect(strings.posesses('')).toBe('');
    expect(strings.posesses(null)).toBe('');
    expect(strings.possesses('Sara')).toBe("Sara's");
});

test('strings:currency groups thousands and keeps the sign', () => {
    expect(strings.currency(1234567.891)).toBe('$1,234,567.89');
    expect(strings.currency('1,234.5')).toBe('$1,234.50');
    expect(strings.currency(-123)).toBe('$-123.00');
    expect(strings.currency(-1234.5)).toBe('$-1,234.50');
    expect(strings.currency(0.005)).toBe('$0.01');
    expect(strings.currency(999)).toBe('$999.00');
});

test('strings:currency returns an empty string for non numbers', () => {
    expect(strings.currency(null)).toBe('');
    expect(strings.currency('')).toBe('');
    expect(strings.currency('abc')).toBe('');
});

test('strings:ellipsis handles empty and non string values', () => {
    expect(strings.ellipsis(null)).toBe('');
    expect(strings.ellipsis(1234567, 3)).toBe('123...');
});
