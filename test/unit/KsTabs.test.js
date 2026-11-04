import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import KsTabs from '../../src/components/KsTabs.vue';
import KsTab from '../../src/components/KsTab.vue';

function mountTabs(template, data = {}, options = {}) {
    return mount({
        template,
        components: { KsTabs, KsTab },
        data: () => data,
        methods: { onEvent: vi.fn() },
    }, { attachTo: document.body, ...options });
}

const TABS = `
    <ks-tabs id="t" ref="tabs" @tab-changed="changed.push($event)">
        <ks-tab title="One" @active="events.push('one:active')" @inactive="events.push('one:inactive')">First</ks-tab>
        <ks-tab title="Two" @active="events.push('two:active')" @inactive="events.push('two:inactive')">Second</ks-tab>
        <ks-tab v-if="third" title="Three">Third</ks-tab>
    </ks-tabs>`;

afterEach(() => {
    sessionStorage.clear();
    document.body.innerHTML = '';
});

test('activates the first tab and renders the title bar', async () => {
    const wrapper = mountTabs(TABS, { third: false, changed: [], events: [] });
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.ks-tabs-title-bar li').wrappers.map(li => li.text())).toEqual(['One', 'Two']);
    expect(wrapper.find('.selected-tab').text()).toBe('One');
    expect(wrapper.find('.active-tab').text()).toBe('First');
    expect(wrapper.vm.$refs.tabs.activeTab).toBe('One');
    expect(wrapper.vm.events).toEqual(['one:active']);
});

test('fires active and inactive only on changes', async () => {
    const wrapper = mountTabs(TABS, { third: false, changed: [], events: [] });
    await wrapper.vm.$nextTick();

    await wrapper.findAll('.ks-tabs-title-bar a').at(1).trigger('click');
    await wrapper.findAll('.ks-tabs-title-bar a').at(1).trigger('click');

    expect(wrapper.find('.active-tab').text()).toBe('Second');
    expect(wrapper.vm.events).toEqual(['one:active', 'one:inactive', 'two:active']);
    expect(wrapper.vm.changed).toEqual(['One', 'Two']);
});

describe('remember tab', () => {
    test('restores the remembered tab', async () => {
        sessionStorage.setItem('ks-tabs.t', 'Two');
        const wrapper = mountTabs(TABS, { third: false, changed: [], events: [] });
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.selected-tab').text()).toBe('Two');
    });

    test('falls back to the first tab when the remembered tab is gone', async () => {
        sessionStorage.setItem('ks-tabs.t', 'Removed');
        const wrapper = mountTabs(TABS, { third: false, changed: [], events: [] });
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.selected-tab').text()).toBe('One');
    });

    test('stores the selected tab', async () => {
        const wrapper = mountTabs(TABS, { third: false, changed: [], events: [] });
        await wrapper.vm.$nextTick();
        await wrapper.findAll('.ks-tabs-title-bar a').at(1).trigger('click');

        expect(sessionStorage.getItem('ks-tabs.t')).toBe('Two');
    });
});

test('keeps document order and handles removed tabs', async () => {
    const wrapper = mountTabs(`
        <ks-tabs>
            <ks-tab title="One">First</ks-tab>
            <ks-tab v-if="middle" title="Middle">Middle</ks-tab>
            <ks-tab title="Last">Last</ks-tab>
        </ks-tabs>`, { middle: false });
    await wrapper.vm.$nextTick();

    await wrapper.setData({ middle: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.ks-tabs-title-bar li').wrappers.map(li => li.text())).toEqual(['One', 'Middle', 'Last']);

    await wrapper.findAll('.ks-tabs-title-bar a').at(1).trigger('click');
    await wrapper.setData({ middle: false });
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.ks-tabs-title-bar li').wrappers.map(li => li.text())).toEqual(['One', 'Last']);
    expect(wrapper.find('.selected-tab').text()).toBe('Last');
});

test('works with locally registered PascalCase components', async () => {
    const wrapper = mountTabs('<KsTabs><KsTab title="A">a</KsTab><KsTab title="B">b</KsTab></KsTabs>');
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.selected-tab').text()).toBe('A');
});

test('setActive(true) on a tab activates it', async () => {
    const wrapper = mountTabs('<ks-tabs><ks-tab title="A">a</ks-tab><ks-tab ref="b" title="B">b</ks-tab></ks-tabs>');
    await wrapper.vm.$nextTick();

    wrapper.vm.$refs.b.setActive(true);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.selected-tab').text()).toBe('B');
});

test('align and expand classes follow the props', async () => {
    const wrapper = mountTabs('<ks-tabs :align="align" :expand="expand"><ks-tab title="A">a</ks-tab></ks-tabs>', { align: 'left', expand: false });

    expect(wrapper.find('.ks-tabs-title-bar').classes()).toContain('title-left');

    await wrapper.setData({ align: 'right', expand: true });
    expect(wrapper.find('.ks-tabs-title-bar').classes()).toEqual(expect.arrayContaining(['title-right', 'expand']));
});

test('scrollable shows arrows when the tabs overflow', async () => {
    const wrapper = mountTabs('<ks-tabs scrollable><ks-tab title="A">a</ks-tab><ks-tab title="B">b</ks-tab></ks-tabs>');
    const bar = wrapper.find('.ks-tabs-title-bar').element;
    Object.defineProperties(bar, {
        scrollWidth: { value: 500, configurable: true },
        clientWidth: { value: 200, configurable: true },
        scrollLeft: { value: 0, writable: true, configurable: true },
    });
    bar.scrollBy = vi.fn();

    const tabs = wrapper.findComponent(KsTabs);
    tabs.vm.updateScrollArrows();
    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain('scrollable');
    expect(tabs.vm.can_scroll_left).toBe(false);
    expect(tabs.vm.can_scroll_right).toBe(true);

    await wrapper.find('.ks-tabs-scroll-arrow-right').trigger('click');
    expect(bar.scrollBy).toHaveBeenCalledWith({ left: 100, behavior: 'smooth' });

    bar.scrollLeft = 300;
    bar.dispatchEvent(new Event('scroll'));
    expect(tabs.vm.can_scroll_left).toBe(true);
    expect(tabs.vm.can_scroll_right).toBe(false);
});

test('a KsTab without KsTabs reports an error', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    mount(KsTab, { propsData: { title: 'Alone' } });

    expect(error).toHaveBeenCalledWith('KsTab must be inside a KsTabs');
});
