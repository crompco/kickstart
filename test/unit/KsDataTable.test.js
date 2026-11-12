import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import KsDataTable from '../../src/components/KsDataTable.vue';
import KsDataColumn from '../../src/components/KsDataColumn.vue';
import { flushPromises } from '../helpers/layout';

const rows = [
    { id: 1, first: 'Ada', last: 'Lovelace', active: false, address: { city: 'London' } },
    { id: 2, first: 'Alan', last: 'Turing', active: true, address: { city: 'Wilmslow' } },
];

let wrapper = null;

function mountTable(template, data = {}) {
    wrapper = mount({
        template,
        components: { KsDataTable, KsDataColumn },
        data: () => ({ rows, ...data }),
    }, { attachTo: document.body });

    return wrapper;
}

function headers() {
    return wrapper.findAll('thead th').wrappers.map(th => th.text());
}

function cells(row = 0) {
    return wrapper.findAll('tbody tr').at(row).findAll('td').wrappers.map(td => td.text());
}

afterEach(() => {
    if ( wrapper ) {
        wrapper.destroy();
        wrapper = null;
    }
    document.body.innerHTML = '';
});

describe('KsDataTable', () => {
    test('renders fields, paths, joined fields and cell slots', async () => {
        mountTable(`
            <ks-data-table :data="rows">
                <ks-data-column label="Name" :field="['first', 'last']"></ks-data-column>
                <ks-data-column label="City" field="address.city"></ks-data-column>
                <ks-data-column label="Active" field="active"></ks-data-column>
                <ks-data-column label="Upper" field="last" v-slot="{ value }">{{ value.toUpperCase() }}</ks-data-column>
            </ks-data-table>
        `);
        await flushPromises();

        expect(headers()).toEqual(['Name', 'City', 'Active', 'Upper']);
        expect(cells(0)).toEqual(['Ada Lovelace', 'London', 'false', 'LOVELACE']);
        expect(wrapper.find('th').attributes('scope')).toBe('col');
    });

    test('keeps document order for a column added later', async () => {
        mountTable(`
            <ks-data-table :data="rows">
                <ks-data-column label="First" field="first"></ks-data-column>
                <ks-data-column v-if="show_city" label="City" field="address.city"></ks-data-column>
                <ks-data-column label="Last" field="last"></ks-data-column>
            </ks-data-table>
        `, { show_city: false });
        await flushPromises();
        expect(headers()).toEqual(['First', 'Last']);

        wrapper.vm.show_city = true;
        await flushPromises();
        expect(headers()).toEqual(['First', 'City', 'Last']);

        wrapper.vm.show_city = false;
        await flushPromises();
        expect(headers()).toEqual(['First', 'Last']);
    });

    test('cycles the sort direction of a sortable column', async () => {
        mountTable(`
            <ks-data-table :data="rows" :sort-field="sort.field" :sort-direction="sort.direction" @sort="sort = $event">
                <ks-data-column label="Name" :field="['last', 'first']" sortable></ks-data-column>
                <ks-data-column label="City" field="address.city"></ks-data-column>
            </ks-data-table>
        `, { sort: { field: null, direction: null } });
        await flushPromises();

        const name = () => wrapper.findAll('thead th').at(0);
        expect(name().attributes('aria-sort')).toBe('none');

        await name().trigger('click');
        expect(wrapper.vm.sort).toEqual({ field: 'last', direction: 'asc' });
        expect(name().attributes('aria-sort')).toBe('ascending');
        expect(name().find('.ks-data-table-sort').classes()).toContain('asc');

        await name().trigger('click');
        expect(wrapper.vm.sort.direction).toBe('desc');

        await name().trigger('click');
        expect(wrapper.vm.sort.direction).toBeNull();

        await wrapper.findAll('thead th').at(1).trigger('click');
        expect(wrapper.vm.sort.field).toBe('last');
        expect(wrapper.findAll('thead th').at(1).attributes('aria-sort')).toBeUndefined();
    });

    test('keeps an uncontrolled selection and emits select', async () => {
        mountTable(`
            <ks-data-table :data="rows" selectable @select="events.push($event)" @row-click="clicks++">
                <ks-data-column label="First" field="first"></ks-data-column>
            </ks-data-table>
        `, { events: [], clicks: 0 });
        await flushPromises();

        await wrapper.findAll('tbody input').at(1).setChecked(true);
        expect(wrapper.vm.events[0].selected).toEqual([2]);
        expect(wrapper.vm.clicks).toBe(0);

        await wrapper.find('thead input').setChecked(true);
        expect(wrapper.vm.events[1]).toEqual({ row: 'all', selected: [2, 1] });
        expect(wrapper.find('thead input').element.checked).toBe(true);

        await wrapper.find('thead input').setChecked(false);
        expect(wrapper.vm.events[2].selected).toEqual([]);
    });

    test('v-model controls the selection without mutating it', async () => {
        const selected = [1];
        mountTable(`
            <ks-data-table v-model="selected" :data="rows" selectable>
                <ks-data-column label="First" field="first"></ks-data-column>
            </ks-data-table>
        `, { selected });
        await flushPromises();

        expect(wrapper.findAll('tbody input').at(0).element.checked).toBe(true);

        await wrapper.findAll('tbody input').at(1).setChecked(true);
        expect(wrapper.vm.selected).toEqual([1, 2]);
        expect(selected).toEqual([1]);
    });

    test('single select uses radios with one selection', async () => {
        mountTable(`
            <ks-data-table v-model="selected" :data="rows" selectable select-mode="single">
                <ks-data-column label="First" field="first"></ks-data-column>
            </ks-data-table>
        `, { selected: [] });
        await flushPromises();

        const radios = wrapper.findAll('tbody input');
        expect(radios.at(0).attributes('type')).toBe('radio');
        expect(radios.at(0).attributes('name')).toBe(radios.at(1).attributes('name'));
        expect(wrapper.find('thead input').exists()).toBe(false);

        // test-utils 1 dispatches a radio click that jsdom does not activate
        radios.at(0).element.click();
        await flushPromises();
        expect(wrapper.vm.selected).toEqual([1]);

        radios.at(1).element.click();
        await flushPromises();
        expect(wrapper.vm.selected).toEqual([2]);
        expect(radios.at(0).element.checked).toBe(false);
    });

    test('expands a row into the expansion slot', async () => {
        mountTable(`
            <ks-data-table :data="rows" expandable @row-expand="last = $event">
                <ks-data-column label="First" field="first"></ks-data-column>
                <template v-slot:expansion="{ row }">Detail {{ row.last }}</template>
            </ks-data-table>
        `, { last: null });
        await flushPromises();

        await wrapper.find('.ks-data-table-expander-cell + td').trigger('click');
        expect(wrapper.find('.ks-data-table-expansion-row').exists()).toBe(false);

        await wrapper.findAll('tbody .ks-data-table-expander-cell').at(1).trigger('click');
        const expansion = wrapper.find('.ks-data-table-expansion-row td');
        expect(expansion.text()).toBe('Detail Turing');
        expect(expansion.attributes('colspan')).toBe('2');
        expect(wrapper.vm.last).toEqual({ row: rows[1], expanded: true });
        expect(wrapper.find('.ks-data-table-expander.expanded').attributes('aria-expanded')).toBe('true');
    });

    test('rows without an id get unique keys', async () => {
        mountTable(`
            <ks-data-table :data="[{ name: 'a' }, { name: 'b' }]">
                <ks-data-column label="Name" field="name"></ks-data-column>
            </ks-data-table>
        `);
        await flushPromises();

        expect(wrapper.findAll('tbody tr').length).toBe(2);
    });

    test('shows the empty slot and hides the table without data', async () => {
        mountTable(`
            <ks-data-table :data="[]" :loading="loading">
                <ks-data-column label="Name" field="name"></ks-data-column>
                <template v-slot:empty>Nothing here</template>
            </ks-data-table>
        `, { loading: true });
        await flushPromises();

        expect(wrapper.find('.ks-data-table-empty').exists()).toBe(false);

        wrapper.vm.loading = false;
        await flushPromises();
        expect(wrapper.find('.ks-data-table-empty').text()).toBe('Nothing here');
        expect(wrapper.find('table').element.style.display).toBe('none');
    });

    test('paginates with KsPaginator', async () => {
        mountTable(`
            <ks-data-table :data="rows" :paginator="meta" @page="page = $event">
                <ks-data-column label="Name" field="first"></ks-data-column>
            </ks-data-table>
        `, { page: null, meta: { total_count: 30, total_pages: 3, current_page: 1, per_page: 10 } });
        await flushPromises();

        expect(wrapper.find('.ks-data-table-paginator').exists()).toBe(true);

        const page_two = wrapper.findAll('.ks-data-table-paginator a').wrappers.find(link => link.text() === '2');
        await page_two.trigger('click');
        expect(wrapper.vm.page).toBe(2);
    });

    test('applies widths, alignment and row classes', async () => {
        mountTable(`
            <ks-data-table :data="rows" :row-class="row => row.active ? 'is-active' : ''" scrollable max-height="200px">
                <ks-data-column label="Name" field="first" :width="120" align="right"></ks-data-column>
            </ks-data-table>
        `);
        await flushPromises();

        expect(wrapper.find('th').element.style.width).toBe('120px');
        expect(wrapper.find('tbody td').classes()).toContain('text-right');
        expect(wrapper.findAll('tbody tr').at(1).classes()).toContain('is-active');
        expect(wrapper.find('.ks-scroll-table').element.style.maxHeight).toBe('200px');
    });
});
