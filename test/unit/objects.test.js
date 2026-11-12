import { expect, test } from 'vitest';
import objects from '../../src/helpers/objects';

const o = {
	foo: {
		bar: 'foobar'
	},
	baz: 'baz',
    bar: 'bar'
}

test('objects:object_get', () => {
	expect(objects.object_get(o, 'foo.bar')).toBe('foobar');
	expect(objects.object_get(o, 'baz')).toBe('baz');
});

test('objects:object_only', () => {
    expect(objects.object_only(o, ['baz'])).toEqual({baz: 'baz'});
    expect(objects.object_only(o, ['baz', 'bar'])).toEqual({baz: 'baz', bar: 'bar'});
});

const list = [
    {
        name: "Jerry Seinfeld",
        show: "Seinfeld"
    },
    {
        name: "Phillip J. Fry",
        show: "Futurama"
    },
    {
        name: "Elaine Benes",
        show: "Seinfeld"
    },
    {
        name: "Bender",
        show: "Futurama"
    },
    {
        name: "Wolverine",
        show: 'X-Men'
    }
]

const listGroup = {
    "Futurama": [
        {
            name: "Phillip J. Fry",
            show: "Futurama"
        },
        {
            name: "Bender",
            show: "Futurama"
        }
    ],
    "Seinfeld": [
        {
            name: "Jerry Seinfeld",
            show: "Seinfeld"
        },
        {
            name: "Elaine Benes",
            show: "Seinfeld"
        },
    ],
    "X-Men": [
        {
            name: "Wolverine",
            show: 'X-Men'
        }
    ]
}

test('objects:groupBy', () => {
    let grouped = objects.groupBy(list, 'show');
	expect(listGroup).toEqual(grouped);
});

test('objects:object_set', () => {
    let obj = {};

    obj = objects.object_set(obj, 'foo.bar', 'baz');
    expect({foo: {bar: 'baz'}}).toEqual(obj);

    obj = {};
    obj = objects.object_set(obj, 'foo', 'bar');
    expect({foo: 'bar'}).toEqual(obj);

    obj = {
        foo: ['bar']
    };
    obj = objects.object_set(obj, 'foo', 'baz');
    expect({foo: ['bar', 'baz']}).toEqual(obj);
})
test('objects:object_get returns falsy values', () => {
    const values = { zero: 0, no: false, empty: '', nested: { zero: 0 } };

    expect(objects.object_get(values, 'zero', 'default')).toBe(0);
    expect(objects.object_get(values, 'no', 'default')).toBe(false);
    expect(objects.object_get(values, 'empty', 'default')).toBe('');
    expect(objects.object_get(values, 'nested.zero', 'default')).toBe(0);
});

test('objects:object_get returns the default for missing paths', () => {
    expect(objects.object_get({ a: null }, 'a.b.c', 'default')).toBe('default');
    expect(objects.object_get({ a: { b: null } }, 'a.b', 'default')).toBe('default');
    expect(objects.object_get(null, 'a', 'default')).toBe('default');
    expect(objects.object_get(o, 'missing')).toBe('');
});

test('objects:looseIndexOf returns a number for arrays', () => {
    expect(objects.looseIndexOf([1, 2, 3], '2')).toBe(1);
    expect(objects.looseIndexOf([1, 2, 3], 4)).toBe(-1);
    expect(objects.looseIndexOf({ a: 1, b: 2 }, '2')).toBe('b');
});
