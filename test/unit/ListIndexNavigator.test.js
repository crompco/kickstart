import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KsAutocomplete from '../../src/components/KsAutocomplete.vue';
import KsSelect from '../../src/components/KsSelect.vue';
import api from '../../src/helpers/api';
import { flushPromises } from '../helpers/layout';

const fruits = [
    { id: 1, name: 'Apple', type: 'Tree' },
    { id: 2, name: 'Apricot', type: 'Tree' },
    { id: 3, name: 'Blueberry', type: 'Bush' },
    { id: 4, name: 'Cherry', type: 'Tree' },
    { id: 5, name: 'Cranberry', type: 'Bush' },
    { id: 6, name: 'Date', type: 'Palm' },
];

let wrapper = null;
let requests;

/**
 * Answers each request with the handler result, and keeps the config of each request
 */
function respondWith(handler) {
    api.getInstance().defaults.adapter = (config) => {
        requests.push(config);

        return handler(config);
    };
}

function ok(config, data) {
    return Promise.resolve({ data: { data }, status: 200, statusText: 'OK', headers: {}, config });
}

/**
 * A response that the test resolves later
 */
function deferred() {
    let resolve;
    const promise = new Promise((r) => {
        resolve = r;
    });

    return { promise, resolve };
}

function mountSearch(component, attrs, data = {}) {
    wrapper = mount({
        template: `<component v-model="value" ${attrs} @search="search"></component>`,
        components: { component },
        data: () => ({ value: null, searches: [], ...data }),
        methods: {
            search(e) {
                this.searches.push({ term: e.term, page: e.page });
                e.callback('/fruits', { params: { q: e.term, page: e.page } });
            },
        },
    }, { attachTo: document.body });

    return wrapper;
}

async function type(text) {
    const input = wrapper.find('input');
    input.element.focus();
    await input.setValue(text);
}

beforeEach(() => {
    requests = [];
    api.createFromConfig();
});

afterEach(() => {
    vi.useRealTimers();
    if ( wrapper ) {
        wrapper.destroy();
        wrapper = null;
    }
    document.body.innerHTML = '';
});

describe('remote search', () => {
    test('waits for the delay and searches once for the last term', async () => {
        vi.useFakeTimers();
        respondWith(config => ok(config, []));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="100"');
        await wrapper.vm.$nextTick();

        await type('a');
        vi.advanceTimersByTime(50);
        await type('ap');
        vi.advanceTimersByTime(99);
        expect(wrapper.vm.searches).toEqual([]);

        vi.advanceTimersByTime(1);
        expect(wrapper.vm.searches).toEqual([{ term: 'ap', page: 1 }]);
    });

    test('sends the callback request through the kickstart instance and lists the results', async () => {
        const response = deferred();
        respondWith(() => response.promise);
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0"');
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        await flushPromises();

        await type('ap');
        await flushPromises();

        expect(requests.length).toBe(1);
        expect(requests[0].url).toBe('/fruits');
        expect(requests[0].params).toEqual({ q: 'ap', page: 1 });
        expect(autocomplete.vm.loading).toBe(true);

        response.resolve(await ok(requests[0], fruits.slice(0, 2)));
        await flushPromises();

        expect(autocomplete.vm.loading).toBe(false);
        expect(wrapper.findAll('.ks-autocomplete-list li').wrappers.map(li => li.text())).toEqual(['Apple', 'Apricot']);
    });

    test('aborts the earlier request when a new search starts', async () => {
        const first = deferred();
        respondWith(config => requests.length === 1 ? first.promise : ok(config, [fruits[3]]));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0"');
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        await flushPromises();

        await type('a');
        await flushPromises();
        await type('ch');
        await flushPromises();

        expect(requests.length).toBe(2);
        expect(requests[0].signal.aborted).toBe(true);
        expect(requests[1].signal.aborted).toBe(false);

        first.resolve(await ok(requests[0], fruits.slice(0, 2)));
        await flushPromises();

        expect(autocomplete.vm.list).toEqual([fruits[3]]);
        expect(autocomplete.vm.loading).toBe(false);
    });

    test('a failed request stops loading and keeps the earlier results', async () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        respondWith(config => (config.params.q == 'ap' ? ok(config, fruits.slice(0, 2)) : Promise.reject(new Error('Server error'))));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0"');
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        await flushPromises();

        await type('ap');
        await flushPromises();
        expect(autocomplete.vm.list).toEqual(fruits.slice(0, 2));

        await type('apx');
        await flushPromises();

        expect(autocomplete.vm.loading).toBe(false);
        expect(autocomplete.vm.list).toEqual(fruits.slice(0, 2));
        expect(error).toHaveBeenCalled();
    });

    test('uses the cache for a term it already searched', async () => {
        respondWith(config => ok(config, fruits.slice(0, 2)));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0"');
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        await flushPromises();

        await type('ap');
        await flushPromises();
        await type('a');
        await flushPromises();
        await type('ap');
        await flushPromises();

        expect(wrapper.vm.searches.map(s => s.term)).toEqual(['ap', 'a']);
        expect(autocomplete.vm.list).toEqual(fruits.slice(0, 2));
    });

    test('searches every time when the cache is off', async () => {
        respondWith(config => ok(config, fruits.slice(0, 2)));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0" :cache-results="false"');
        await flushPromises();

        await type('ap');
        await flushPromises();
        await type('a');
        await flushPromises();
        await type('ap');
        await flushPromises();

        expect(wrapper.vm.searches.map(s => s.term)).toEqual(['ap', 'a', 'ap']);
    });

    test('does not search below minSearch', async () => {
        respondWith(config => ok(config, []));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0" :min-search="3"');
        await flushPromises();

        await type('ap');
        await flushPromises();
        expect(wrapper.vm.searches).toEqual([]);

        await type('apr');
        await flushPromises();
        expect(wrapper.vm.searches).toEqual([{ term: 'apr', page: 1 }]);
    });

    test('shows the empty message only when nothing matches', async () => {
        respondWith(config => ok(config, config.params.q == 'zz' ? [] : fruits.slice(0, 2)));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0" empty-message="No fruit"');
        await flushPromises();

        await type('ap');
        await flushPromises();
        expect(wrapper.find('.ks-empty-list-message').exists()).toBe(false);

        await type('zz');
        await flushPromises();

        expect(wrapper.find('.ks-empty-list-message').text()).toBe('No fruit');
    });

    test('loads the next pages while the selection moves down and stops at an empty page', async () => {
        const pages = { 1: fruits.slice(0, 4), 2: fruits.slice(4), 3: [] };
        respondWith(config => ok(config, pages[config.params.page]));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0" paginated :paginate-threshold="1"');
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        await flushPromises();

        await type('r');
        await flushPromises();
        expect(autocomplete.vm.list).toEqual(fruits.slice(0, 4));

        const input = wrapper.find('input');
        const down = async () => {
            await input.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
            await flushPromises();
        };

        await down();
        await down();
        expect(wrapper.vm.searches.length).toBe(1);

        await down();
        expect(wrapper.vm.searches[1]).toEqual({ term: 'r', page: 2 });
        expect(autocomplete.vm.list).toEqual(fruits);

        await down();
        await down();
        expect(wrapper.vm.searches[2]).toEqual({ term: 'r', page: 3 });
        expect(autocomplete.vm.list).toEqual(fruits);

        await down();
        expect(wrapper.vm.searches.length).toBe(3);
    });

    test('does not request the next page while a page is loading', async () => {
        const pages = { 1: fruits.slice(0, 2), 2: fruits.slice(2, 4), 3: fruits.slice(4) };
        const page_two = deferred();
        respondWith(config => (config.params.page == 2 ? page_two.promise : ok(config, pages[config.params.page])));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0" paginated :paginate-threshold="1"');
        const autocomplete = wrapper.findComponent(KsAutocomplete);
        await flushPromises();

        await type('r');
        await flushPromises();

        const input = wrapper.find('input');
        for ( let i = 0; i < 4; i++ ) {
            await input.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        }

        expect(wrapper.vm.searches).toEqual([{ term: 'r', page: 1 }, { term: 'r', page: 2 }]);

        page_two.resolve(ok(requests[1], pages[2]));
        await flushPromises();

        expect(autocomplete.vm.list).toEqual(fruits.slice(0, 4));
    });

    test('a new term starts again at page 1', async () => {
        respondWith(config => ok(config, fruits.slice(0, 4)));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0" paginated :paginate-threshold="3"');
        await flushPromises();

        await type('r');
        await flushPromises();
        await wrapper.find('input').trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await flushPromises();
        expect(wrapper.vm.searches[1].page).toBe(2);

        await type('ra');
        await flushPromises();
        expect(wrapper.vm.searches[2]).toEqual({ term: 'ra', page: 1 });
    });

    test('destroy aborts the request in flight', async () => {
        respondWith(() => new Promise(() => {}));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="0"');
        await flushPromises();

        await type('ap');
        await flushPromises();

        wrapper.destroy();
        wrapper = null;

        expect(requests[0].signal.aborted).toBe(true);
    });

    test('destroy cancels a search that is still waiting for the delay', async () => {
        vi.useFakeTimers();
        respondWith(config => ok(config, []));
        mountSearch(KsAutocomplete, 'selection-key="name" :delay="100"');
        await wrapper.vm.$nextTick();
        await type('ap');

        const vm = wrapper.vm;
        wrapper.destroy();
        wrapper = null;
        vi.advanceTimersByTime(100);

        expect(vm.searches).toEqual([]);
    });

    test('KsSelect searches when it opens and selects a result', async () => {
        respondWith(config => ok(config, fruits.slice(0, 3)));
        mountSearch(KsSelect, 'name="id" label-key="name" :delay="0"');
        await flushPromises();

        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();

        expect(wrapper.vm.searches).toEqual([{ term: '', page: 1 }]);

        await wrapper.findAll('.ks-autocomplete-list li').at(2).trigger('click');
        await flushPromises();

        expect(wrapper.vm.value).toBe(fruits[2]);
        expect(wrapper.find('.ks-select-selection').text()).toContain('Blueberry');
    });
});

describe('grouped items', () => {
    function mountGrouped(component, attrs, items = fruits) {
        wrapper = mount({
            template: `<component v-model="value" :items="items" group-by="type" ${attrs}></component>`,
            components: { component },
            data: () => ({ value: null, items }),
        }, { attachTo: document.body });
    }

    function groupTitles() {
        return wrapper.findAll('.ks-opt-group > strong').wrappers.map(g => g.text());
    }

    test('KsAutocomplete lists the items under their group and selects the right item', async () => {
        mountGrouped(KsAutocomplete, 'selection-key="name"');
        await flushPromises();

        await type('rr');
        await flushPromises();

        expect(groupTitles()).toEqual(['Bush', 'Tree']);
        const bush_items = wrapper.findAll('.ks-opt-group').at(0).findAll('li:not(.ks-opt-group)');
        expect(bush_items.wrappers.map(li => li.text())).toEqual(['Blueberry', 'Cranberry']);

        await wrapper.findAll('.ks-opt-group').at(1).find('li:not(.ks-opt-group)').trigger('click');
        await flushPromises();

        expect(wrapper.vm.value).toBe(fruits[3]);
    });

    test('the lookup also matches the group name', async () => {
        mountGrouped(KsAutocomplete, 'selection-key="name"');
        await flushPromises();

        await type('palm');
        await flushPromises();

        expect(groupTitles()).toEqual(['Palm']);
        expect(wrapper.find('.ks-opt-group li').text()).toBe('Date');
    });

    test('KsSelect lists the groups and the keyboard moves through the items in order', async () => {
        const by_type = [fruits[0], fruits[1], fruits[3], fruits[2], fruits[4], fruits[5]];
        mountGrouped(KsSelect, 'name="id" label-key="name"', by_type);
        await flushPromises();

        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();

        expect(groupTitles()).toEqual(['Tree', 'Bush', 'Palm']);

        const select = wrapper.find('.ks-select');
        await select.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await select.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
        await flushPromises();

        expect(wrapper.find('.ks-selected-item').text()).toBe('Cherry');

        await select.trigger('keydown', { key: 'Enter', keyCode: 13 });
        await flushPromises();

        expect(wrapper.vm.value).toBe(fruits[3]);
    });

    test('the keyboard follows the order on screen when the groups are not contiguous', async () => {
        mountGrouped(KsSelect, 'name="id" label-key="name"');
        await flushPromises();

        await wrapper.find('.ks-select-selection').trigger('click');
        await flushPromises();

        expect(groupTitles()).toEqual(['Tree', 'Bush', 'Palm']);

        const select = wrapper.find('.ks-select');
        const highlighted = [wrapper.find('.ks-selected-item').text()];
        for ( let i = 0; i < 6; i++ ) {
            await select.trigger('keydown', { key: 'ArrowDown', keyCode: 40 });
            await flushPromises();
            highlighted.push(wrapper.find('.ks-selected-item').text());
        }

        expect(highlighted).toEqual(['Apple', 'Apricot', 'Cherry', 'Blueberry', 'Cranberry', 'Date', 'Date']);

        await select.trigger('keydown', { key: 'ArrowUp', keyCode: 38 });
        await select.trigger('keydown', { key: 'ArrowUp', keyCode: 38 });
        await select.trigger('keydown', { key: 'ArrowUp', keyCode: 38 });
        await flushPromises();

        expect(wrapper.find('.ks-selected-item').text()).toBe('Cherry');

        await select.trigger('keydown', { key: 'Enter', keyCode: 13 });
        await flushPromises();

        expect(wrapper.vm.value).toBe(fruits[3]);
    });
});
