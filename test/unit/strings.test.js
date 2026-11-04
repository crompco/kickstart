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
