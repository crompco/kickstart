import test from 'ava';
import strings from '../../lib/strings';


test('strings:escapeRegExp', t => {
	let str = strings.escapeRegExp('1\\2');

	t.is(str, '1\\\\2');
});

test('strings:ucwords', t => {
	let str = strings.ucwords('aaron');
	let str2 = strings.ucwords('a-aron');
	let str3 = strings.ucwords('aaron smith');

	t.is(str, 'Aaron');
	t.is(str2, 'A-aron');
	t.is(str3, 'Aaron Smith');
});

test('strings:posesses', t => {
	t.is(strings.posesses('Sara'), "Sara's");
	t.is(strings.posesses('Chas'), "Chas'");
});

test('strings:currency', t => {
	t.is(strings.currency('10'), "$10.00");
	t.is(strings.currency('0', 'c'), "c0.00");
})

test('strings:pad_left', t => {
	t.is(strings.pad_left(10, 0, 4), "0010");
	t.is(strings.pad_left('1', 0, 2), "01");
	t.is(strings.pad_left('01', 0, 2), "01");
});

test('strings:ellipsis', t => {
   t.is(strings.ellipsis("mystring", 5), 'mystr...');
   t.is(strings.ellipsis("strin", 5), 'strin');
});
