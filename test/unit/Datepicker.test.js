import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import KsDatepicker from '../../src/components/KsDatepicker.vue';

test('Datepicker:computed from a date string', () => {
    const vm = mount(KsDatepicker, {
        propsData: {
            value: '2017-01-01',
        },
    }).vm;

    expect(vm.display_date).toBe('01/01/2017');
    expect(vm.value_date).toBe('2017-01-01');
});

test('Datepicker:computed from a UTC date', () => {
    const vm = mount(KsDatepicker, {
        propsData: {
            value: new Date(Date.UTC(2017, 0, 1)),
        },
    }).vm;

    expect(vm.display_date).toBe('01/01/2017');
    expect(vm.value_date).toBe('2017-01-01');
});

test.each([undefined, null])('Datepicker:emits an empty string after mount for a %s value', async (value) => {
    const wrapper = mount(KsDatepicker, {
        propsData: {
            value,
        },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toEqual([['']]);
});

test.each(['', '2017-01-01'])('Datepicker:does not emit after mount for the value "%s"', async (value) => {
    const wrapper = mount(KsDatepicker, {
        propsData: {
            value,
        },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toBeUndefined();
});

test('Datepicker:emits an empty string when the parent empties the value while it mounts', async () => {
    const wrapper = mount(KsDatepicker, {
        propsData: {
            value: '2017-01-01',
        },
    });

    wrapper.setProps({ value: undefined });
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('input')).toEqual([['']]);
});

test('Datepicker:emits an empty string when the value changes to undefined', async () => {
    const wrapper = mount(KsDatepicker, {
        propsData: {
            value: '2017-01-01',
        },
    });
    await wrapper.vm.$nextTick();

    await wrapper.setProps({ value: undefined });

    expect(wrapper.emitted('input')).toEqual([['']]);
});

test('Datepicker:does not emit when the value changes to an empty string', async () => {
    const wrapper = mount(KsDatepicker, {
        propsData: {
            value: '2017-01-01',
        },
    });
    await wrapper.vm.$nextTick();

    await wrapper.setProps({ value: '' });

    expect(wrapper.emitted('input')).toBeUndefined();
});
