import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import KsCheckbox from '../../src/components/KsCheckbox.vue';
import KsCheckboxGroup from '../../src/components/KsCheckboxGroup.vue';
import KsRadio from '../../src/components/KsRadio.vue';
import KsRadioGroup from '../../src/components/KsRadioGroup.vue';

function vModel(component, template, data) {
    return mount({ template, components: { component }, data: () => data });
}

describe('KsCheckbox', () => {
    test('works as a boolean without a value', async () => {
        const wrapper = vModel(KsCheckbox, '<component v-model="flag" label="Flag"></component>', { flag: true });
        const input = wrapper.find('input');
        await wrapper.vm.$nextTick();

        expect(input.element.checked).toBe(true);
        expect(wrapper.find('.ks-checkbox').classes()).toContain('ks-state-active');

        await input.trigger('click');
        expect(wrapper.vm.flag).toBe(false);

        await input.trigger('click');
        expect(wrapper.vm.flag).toBe(true);
    });

    test('uses value and falseValue', async () => {
        const wrapper = vModel(KsCheckbox, '<component v-model="answer" value="yes" false-value="no"></component>', { answer: 'no' });
        const input = wrapper.find('input');

        await input.trigger('click');
        expect(wrapper.vm.answer).toBe('yes');

        await input.trigger('click');
        expect(wrapper.vm.answer).toBe('no');
    });

    test('adds and removes from an array without mutating it', async () => {
        const original = [1, 3];
        const wrapper = vModel(KsCheckbox, '<component v-model="list" :value="2"></component>', { list: original });

        await wrapper.find('input').trigger('click');
        expect(wrapper.vm.list).toEqual([1, 3, 2]);
        expect(original).toEqual([1, 3]);

        const added = wrapper.vm.list;
        await wrapper.find('input').trigger('click');
        expect(wrapper.vm.list).toEqual([1, 3]);
        expect(added).toEqual([1, 3, 2]);
    });

    test('a disabled checkbox does not change', async () => {
        const wrapper = mount(KsCheckbox, { propsData: { checked: false, disabled: true } });

        await wrapper.find('input').trigger('click');

        expect(wrapper.emitted('input')).toBeUndefined();
    });

    test('follows a value change', async () => {
        const wrapper = mount(KsCheckbox, { propsData: { checked: 'b', value: 'a' } });
        expect(wrapper.vm.isChecked).toBe(false);

        await wrapper.setProps({ value: 'b' });
        expect(wrapper.vm.isChecked).toBe(true);
    });
});

test('KsCheckboxGroup emits the new list', async () => {
    const wrapper = vModel(KsCheckboxGroup, '<component v-model="list" name="fruit" :options="options" label-key="name" value-key="id"></component>', {
        list: [1],
        options: [{ id: 1, name: 'Apple' }, { id: 2, name: 'Pear' }],
    });

    expect(wrapper.findAll('.ks-checkbox').wrappers.map(c => c.text())).toEqual(['Apple', 'Pear']);

    await wrapper.findAll('input').at(1).trigger('click');
    expect(wrapper.vm.list).toEqual([1, 2]);
});

describe('KsRadio', () => {
    test('emits its value once when selected', async () => {
        const wrapper = mount(KsRadio, { propsData: { value: 'a', checked: 'b', label: 'A' } });

        const input = wrapper.find('input');
        input.element.checked = true;
        await input.trigger('change');

        expect(wrapper.emitted('input')).toEqual([['a']]);
    });

    test('does nothing when disabled', async () => {
        const wrapper = mount(KsRadio, { propsData: { value: 'a', checked: 'b', disabled: true } });

        await wrapper.find('input').trigger('change');

        expect(wrapper.emitted('input')).toBeUndefined();
        expect(wrapper.find('input').element.disabled).toBe(true);
    });

    test('renders slot content without a label and allows a null label', () => {
        const slotted = mount(KsRadio, { propsData: { value: 'a' }, slots: { default: '<b>Bold</b>' } });
        expect(slotted.find('.ks-radio-label-wrapper b').text()).toBe('Bold');

        const empty = mount(KsRadio, { propsData: { value: 'a', label: null } });
        expect(empty.find('.ks-radio-label-wrapper').exists()).toBe(false);
    });

    test('resets the native state when the parent keeps its value', async () => {
        const wrapper = mount(KsRadio, { propsData: { value: 'a', checked: 'b' } });
        const input = wrapper.find('input');

        input.element.checked = true;
        await input.trigger('change');
        await wrapper.vm.$nextTick();

        expect(input.element.checked).toBe(false);
    });
});

test('KsRadioGroup selects an option and passes disabled down', async () => {
    const wrapper = vModel(KsRadioGroup, '<component v-model="choice" name="size" :options="[\'S\', \'M\']" :disabled="disabled"></component>', {
        choice: 'S',
        disabled: false,
    });

    const inputs = wrapper.findAll('input');
    inputs.at(1).element.checked = true;
    await inputs.at(1).trigger('change');
    expect(wrapper.vm.choice).toBe('M');

    await wrapper.setData({ disabled: true });
    expect(wrapper.findAll('input').wrappers.every(input => input.element.disabled)).toBe(true);
});

describe.each([
    ['KsCheckboxGroup', KsCheckboxGroup, '.ks-checkbox'],
    ['KsRadioGroup', KsRadioGroup, '.ks-radio'],
])('%s options', (name, component, option_selector) => {
    function group(propsData) {
        return mount(component, { propsData: { name: 'fruit', value: null, ...propsData } });
    }

    function options(wrapper) {
        return wrapper.findAll(option_selector).wrappers.map(option => [option.find('input').element.value, option.text()]);
    }

    test('uses each scalar option as value and label', () => {
        expect(options(group({ options: ['S', 'M'] }))).toEqual([['S', 'S'], ['M', 'M']]);
    });

    test('reads value and label from objects with the default keys', () => {
        const wrapper = group({ options: [{ value: 1, label: 'Apple' }, { value: 2, label: 'Pear' }] });

        expect(options(wrapper)).toEqual([['1', 'Apple'], ['2', 'Pear']]);
    });

    test('reads value and label from objects with custom keys', () => {
        const wrapper = group({ options: [{ id: 1, name: 'Apple' }], valueKey: 'id', labelKey: 'name' });

        expect(options(wrapper)).toEqual([['1', 'Apple']]);
    });

    test('accepts an object of options', () => {
        const wrapper = group({ options: { a: { value: 'a', label: 'Apple' }, p: { value: 'p', label: 'Pear' } } });

        expect(options(wrapper)).toEqual([['a', 'Apple'], ['p', 'Pear']]);
    });

    test('renders no options without options', () => {
        expect(options(group({}))).toEqual([]);
        expect(options(group({ options: [] }))).toEqual([]);
    });

    test('sets the buttons, custom and disabled classes', () => {
        const wrapper = group({ options: ['S'], buttons: true, classNames: 'compact', disabled: true });

        expect(wrapper.classes()).toEqual(expect.arrayContaining(['option-buttons', 'compact', 'disabled']));
        expect(group({ options: ['S'] }).classes()).not.toContain('option-buttons');
    });
});
