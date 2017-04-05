import test from 'ava';
import objects from '../../lib/objects';

const o = {
	foo: {
		bar: 'foobar'
	},
	baz: 'baz'
}

test('objects:formatDate', t => {
	t.is(objects.object_get(o, 'foo.bar'), 'foobar');
	t.is(objects.object_get(o, 'baz'), 'baz');
});
