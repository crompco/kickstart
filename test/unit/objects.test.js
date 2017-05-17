import test from 'ava';
import objects from '../../lib/objects';

const o = {
	foo: {
		bar: 'foobar'
	},
	baz: 'baz',
    bar: 'bar'
}

test('objects:object_get', t => {
	t.is(objects.object_get(o, 'foo.bar'), 'foobar');
	t.is(objects.object_get(o, 'baz'), 'baz');
});

test('objects:object_only', t => {
    t.deepEqual(objects.object_only(o, ['baz']), {baz: 'baz'});
    t.deepEqual(objects.object_only(o, ['baz', 'bar']), {baz: 'baz', bar: 'bar'});
});
