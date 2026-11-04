import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import KsSelect from '../../src/components/KsSelect.vue';
import KsAutocomplete from '../../src/components/KsAutocomplete.vue';
import { flushPromises } from '../helpers/layout';

const fruits = [
    { id: 0, name: 'Apple' },
    { id: 1, name: 'Banana' },
    { id: 2, name: 'Cherry' },
];

let wrapper = null;

function vModel(component, template, data) {
    wrapper = mount({ template, components: { component }, data: () => data }, { attachTo: document.body });
    return wrapper;
}

afterEach(() => {
    if ( wrapper ) {
        wrapper.destroy();
        wrapper = null;
    }
    document.body.innerHTML = '';
});

describe('KsSelect', () => {
    test('selects an object and shows its label', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items"></component>', { fruit: null, items: fruits });
        await flushPromises();

        expect(wrapper.find('.ks-select-placeholder').exists()).toBe(true);

        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();
        expect(wrapper.find('.ks-select').classes()).toContain('ks-select-open');

        await wrapper.findAll('.ks-autocomplete-list li').at(1).trigger('click');
        await flushPromises();

        expect(wrapper.vm.fruit).toBe(fruits[1]);
        expect(wrapper.find('.ks-select-selection').text()).toContain('Banana');
        expect(wrapper.find('.ks-select').classes()).not.toContain('ks-select-open');
    });

    test('binds the key when the value is a scalar', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items"></component>', { fruit: 2, items: fruits });
        await flushPromises();

        expect(wrapper.find('.ks-select-selection').text()).toContain('Cherry');

        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();
        await wrapper.findAll('.ks-autocomplete-list li').at(0).trigger('click');

        expect(wrapper.vm.fruit).toBe(0);
    });

    test('treats 0 as a value', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items"></component>', { fruit: 0, items: fruits });
        await flushPromises();

        expect(wrapper.find('.ks-select-placeholder').exists()).toBe(false);
        expect(wrapper.find('.ks-select-selection').text()).toContain('Apple');
    });

    test('positions the dropdown while open', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items"></component>', { fruit: null, items: fruits });
        const select = wrapper.findComponent(KsSelect);

        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();
        expect(select.vm.dropdown_positioner).not.toBeNull();
        expect(select.vm.$refs.dropdown.style.position).toBe('fixed');

        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();
        expect(select.vm.dropdown_positioner).toBeNull();
    });

    test('single deselect clears the value', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items" single-deselect></component>', { fruit: fruits[0], items: fruits });
        await flushPromises();

        await wrapper.find('.ks-select-deselect').trigger('click');
        expect(wrapper.vm.fruit).toBeNull();
    });

    test('filters the list by the lookup', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items" :search-threshold="1"></component>', { fruit: null, items: fruits });
        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();

        await wrapper.find('.ks-select-dropdown-input input').setValue('an');
        await flushPromises();

        const items = wrapper.findAll('.ks-autocomplete-list li');
        expect(items.length).toBe(1);
        expect(items.at(0).text()).toBe('Banana');
    });

    test('does not open when disabled', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items" disabled></component>', { fruit: null, items: fruits });
        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();

        expect(wrapper.find('.ks-select').classes()).not.toContain('ks-select-open');
    });
});

describe('KsAutocomplete', () => {
    test('selects a single item', async () => {
        vModel(KsAutocomplete, '<component v-model="fruit" selection-key="name" :items="items"></component>', { fruit: null, items: fruits });
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        await flushPromises();

        const input = wrapper.find('input');
        input.element.focus();
        await input.setValue('ch');
        await flushPromises();

        expect(autocomplete.vm.show_list).toBe(true);
        expect(autocomplete.vm.dropdown_positioner).not.toBeNull();

        await input.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await input.trigger('keydown', { key: 'Enter', keyCode: 13 });
        await flushPromises();

        expect(wrapper.vm.fruit).toBe(fruits[2]);
        expect(wrapper.find('.ks-selection-text').text()).toContain('Cherry');
        expect(autocomplete.vm.dropdown_positioner).toBeNull();
    });

    test('emits a new array in multiple mode', async () => {
        const selected = [fruits[0]];
        vModel(KsAutocomplete, '<component v-model="fruit" selection-key="name" :items="items" multiple></component>', { fruit: selected, items: fruits });
        await flushPromises();

        const input = wrapper.find('input');
        input.element.focus();
        await input.setValue('ban');
        await flushPromises();
        await input.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await input.trigger('keydown', { key: 'Enter', keyCode: 13 });
        await flushPromises();

        expect(wrapper.vm.fruit).toEqual([fruits[0], fruits[1]]);
        expect(wrapper.vm.fruit).not.toBe(selected);
        expect(selected).toEqual([fruits[0]]);

        const current = wrapper.vm.fruit;
        await wrapper.findAll('.clear-selection').at(0).trigger('click');
        await flushPromises();

        expect(wrapper.vm.fruit).toEqual([fruits[1]]);
        expect(current).toEqual([fruits[0], fruits[1]]);
    });

    test('creates a tag when taggable', async () => {
        vModel(KsAutocomplete, '<component v-model="tags" :items="[]" multiple taggable @tag-created="created = $event"></component>', { tags: [], created: null });
        await flushPromises();

        const input = wrapper.find('input');
        input.element.focus();
        await input.setValue('urgent');
        await flushPromises();
        await input.trigger('keydown', { key: 'Enter', keyCode: 13 });
        await flushPromises();

        expect(wrapper.vm.created).toBe('urgent');
        expect(wrapper.vm.tags).toEqual(['urgent']);
    });

    test('backspace on an empty lookup focuses the last selection', async () => {
        vModel(KsAutocomplete, '<component v-model="fruit" selection-key="name" :items="items" multiple></component>', { fruit: [fruits[0], fruits[1]], items: fruits });
        await flushPromises();

        const input = wrapper.find('input');
        await input.trigger('keyup', { key: 'Backspace', keyCode: 8 });

        expect(document.activeElement).toBe(wrapper.findAll('.ks-selection-text').at(1).element);
    });

    test('follows value changes', async () => {
        vModel(KsAutocomplete, '<component v-model="fruit" selection-key="name" :items="items"></component>', { fruit: null, items: fruits });
        await flushPromises();

        wrapper.vm.fruit = fruits[0];
        await flushPromises();
        expect(wrapper.find('.ks-selection-text').text()).toContain('Apple');

        wrapper.vm.fruit = null;
        await flushPromises();
        expect(wrapper.find('.ks-selection-text').exists()).toBe(false);
    });
});
