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

test('objects:groupBy', t => {
    let grouped = objects.groupBy(list, 'show');
	t.deepEqual(listGroup, grouped);
});
