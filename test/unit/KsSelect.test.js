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

    test('shows the placeholder for an empty string', async () => {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items"></component>', { fruit: '', items: fruits });
        await flushPromises();

        expect(wrapper.find('.ks-select-placeholder').exists()).toBe(true);
    });

    test('shows the placeholder when an object binding gets a scalar', async () => {
        const errors = [];
        const original = console.error;
        console.error = (...args) => errors.push(args.join(' '));

        try {
            vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items" :force-objects="true"></component>', { fruit: 0, items: fruits });
            await flushPromises();
        } finally {
            console.error = original;
        }

        expect(wrapper.find('.ks-select-placeholder').exists()).toBe(true);
        expect(errors.filter(e => e.includes('KsSelect'))).toEqual([]);
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

describe('KsSelect keyboard', () => {
    function key(target, name, key_code, extra = {}) {
        return target.trigger('keydown', { key: name, keyCode: key_code, ...extra });
    }

    function highlighted() {
        return wrapper.find('.ks-autocomplete-list .ks-selected-item').text();
    }

    async function mountSelect(value = null) {
        vModel(KsSelect, '<component v-model="fruit" name="id" label-key="name" :items="items"></component>', { fruit: value, items: fruits });
        await flushPromises();

        return wrapper.find('.ks-select');
    }

    test('ArrowDown opens on the first item and Enter selects the highlighted item', async () => {
        const select = await mountSelect();

        await key(select, 'ArrowDown', 40);
        await flushPromises();
        expect(select.classes()).toContain('ks-select-open');
        expect(highlighted()).toBe('Apple');

        await key(select, 'ArrowDown', 40);
        expect(highlighted()).toBe('Banana');

        await key(select, 'Enter', 13);
        await flushPromises();

        expect(wrapper.vm.fruit).toBe(fruits[1]);
        expect(select.classes()).not.toContain('ks-select-open');
    });

    test('the highlight stops at the first and the last item', async () => {
        const select = await mountSelect();

        await key(select, 'ArrowDown', 40);
        await flushPromises();
        await key(select, 'ArrowUp', 38);
        expect(highlighted()).toBe('Apple');

        for ( let i = 0; i < 5; i++ ) {
            await key(select, 'ArrowDown', 40);
        }
        expect(highlighted()).toBe('Cherry');
    });

    test('opening highlights the current value', async () => {
        const select = await mountSelect(2);

        await key(select, ' ', 32);
        await flushPromises();

        expect(select.classes()).toContain('ks-select-open');
        expect(highlighted()).toBe('Cherry');
    });

    test('Enter on a closed select opens it without a change', async () => {
        const select = await mountSelect(fruits[2]);

        await key(select, 'Enter', 13);
        await flushPromises();

        expect(select.classes()).toContain('ks-select-open');
        expect(wrapper.findComponent(KsSelect).emitted('input')).toBeUndefined();
        expect(wrapper.vm.fruit).toBe(fruits[2]);
    });

    test('a letter key opens the list', async () => {
        const select = await mountSelect();

        await key(select, 'b', 66);
        await flushPromises();

        expect(select.classes()).toContain('ks-select-open');
    });

    test('Tab selects the highlighted item when open', async () => {
        const select = await mountSelect();

        await key(select, 'ArrowDown', 40);
        await flushPromises();
        await key(select, 'ArrowDown', 40);
        await key(select, 'ArrowDown', 40);
        await key(select, 'Tab', 9);
        await flushPromises();

        expect(wrapper.vm.fruit).toBe(fruits[2]);
    });

    test('Tab on a closed select changes nothing', async () => {
        const select = await mountSelect(fruits[2]);

        await key(select, 'Tab', 9);
        await flushPromises();

        expect(wrapper.findComponent(KsSelect).emitted('input')).toBeUndefined();
        expect(wrapper.vm.fruit).toBe(fruits[2]);
        expect(select.classes()).not.toContain('ks-select-open');
    });

    test('Escape closes without a change', async () => {
        const select = await mountSelect(fruits[0]);

        await key(select, 'ArrowDown', 40);
        await flushPromises();
        await key(select, 'ArrowDown', 40);
        await select.trigger('keyup', { key: 'Escape', keyCode: 27 });
        await flushPromises();

        expect(select.classes()).not.toContain('ks-select-open');
        expect(wrapper.vm.fruit).toBe(fruits[0]);
    });
});

describe('KsAutocomplete keyboard', () => {
    async function search(text) {
        vModel(KsAutocomplete, '<component v-model="fruit" selection-key="name" :items="items"></component>', { fruit: null, items: fruits });
        await flushPromises();

        const input = wrapper.find('input');
        input.element.focus();
        await input.setValue(text);
        await flushPromises();

        return input;
    }

    function highlighted() {
        const item = wrapper.find('.ks-autocomplete-list .ks-selected-item');

        return item.exists() ? item.text() : null;
    }

    test('ArrowUp and ArrowDown move the highlight and stop at the ends', async () => {
        const input = await search('an');
        const key = (name, key_code) => input.trigger('keydown', { key: name, keyCode: key_code });

        expect(highlighted()).toBeNull();

        await key('ArrowDown', 40);
        expect(highlighted()).toBe('Banana');

        await key('ArrowDown', 40);
        expect(highlighted()).toBe('Banana');

        await key('ArrowUp', 38);
        expect(highlighted()).toBeNull();

        await key('ArrowUp', 38);
        await key('ArrowDown', 40);
        expect(highlighted()).toBe('Banana');
    });

    test('Enter without a highlight selects nothing', async () => {
        const input = await search('a');

        await input.trigger('keydown', { key: 'Enter', keyCode: 13 });
        await flushPromises();

        expect(wrapper.vm.fruit).toBeNull();
    });

    test('Tab selects the highlighted item', async () => {
        const input = await search('a');

        await input.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await input.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await input.trigger('keydown', { key: 'Tab', keyCode: 9 });
        await flushPromises();

        expect(wrapper.vm.fruit).toBe(fruits[1]);
    });

    test('Shift+Tab clears the lookup and selects nothing', async () => {
        const input = await search('a');

        await input.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await input.trigger('keydown', { key: 'Tab', keyCode: 9, shiftKey: true });
        await flushPromises();

        expect(wrapper.vm.fruit).toBeNull();
        expect(input.element.value).toBe('');
    });

    test('Escape clears the lookup and closes the list', async () => {
        const input = await search('a');
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        expect(autocomplete.vm.show_list).toBe(true);

        await input.trigger('keyup', { key: 'Escape', keyCode: 27 });
        await flushPromises();

        expect(input.element.value).toBe('');
        expect(autocomplete.vm.show_list).toBe(false);
        expect(wrapper.vm.fruit).toBeNull();
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
