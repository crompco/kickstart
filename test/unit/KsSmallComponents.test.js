import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test, vi } from 'vitest';
import KsButton from '../../src/components/KsButton.vue';
import KsDraggable from '../../src/components/KsDraggable.vue';
import KsDroppable from '../../src/components/KsDroppable.vue';
import KsLoaderLine from '../../src/components/KsLoaderLine.vue';
import KsPaginator from '../../src/components/KsPaginator.vue';
import KsSideNav from '../../src/components/KsSideNav.vue';
import KsSimplePaginator from '../../src/components/KsSimplePaginator.vue';
import KsTopNav from '../../src/components/KsTopNav.vue';

afterEach(() => {
    document.body.className = '';
    document.body.innerHTML = '';
});

function router(path = '/work', query = { status: 'open' }) {
    return {
        $route: { path, query, params: { id: 5 }, name: 'work' },
        $router: { push: vi.fn() },
    };
}

describe('KsPaginator', () => {
    const pagination = (current_page, total_pages = 20) => ({ current_page, total_pages, total_count: total_pages * 10, limit: 10 });
    const pages = wrapper => wrapper.findAll('.page-link').wrappers.map(link => Number(link.text()));

    test('shows a window of pages with the first and last page', () => {
        const wrapper = mount(KsPaginator, { propsData: { pagination: pagination(10) } });

        expect(pages(wrapper)).toEqual([8, 9, 10, 11, 12]);
        expect(wrapper.findAll('.dot-pages').length).toBe(2);
        expect(wrapper.find('.current-page').text()).toBe('10');
    });

    test('keeps the window inside the range', () => {
        expect(pages(mount(KsPaginator, { propsData: { pagination: pagination(1) } }))).toEqual([1, 2, 3, 4, 5]);
        expect(pages(mount(KsPaginator, { propsData: { pagination: pagination(20) } }))).toEqual([16, 17, 18, 19, 20]);
        expect(pages(mount(KsPaginator, { propsData: { pagination: pagination(2, 3) } }))).toEqual([1, 2, 3]);
    });

    test('emits input and ignores pages out of range', async () => {
        const wrapper = mount(KsPaginator, { propsData: { pagination: pagination(1) } });

        await wrapper.find('.prev-page').trigger('click');
        await wrapper.find('.next-page').trigger('click');
        await wrapper.findAll('.page-link').at(2).trigger('click');

        expect(wrapper.emitted('input')).toEqual([[2], [3]]);
        expect(wrapper.find('.prev-page').classes()).toContain('disabled');
    });

    test('pushes the page into the route query when routed', async () => {
        const mocks = router();
        const wrapper = mount(KsPaginator, { propsData: { pagination: pagination(1), routed: true, pageVar: 'p' }, mocks });

        await wrapper.find('.next-page').trigger('click');

        expect(mocks.$router.push).toHaveBeenCalledWith({ path: '/work', query: { status: 'open', p: 2 } });
        expect(wrapper.emitted('input')).toBeUndefined();
    });

    test('hides with one page', () => {
        expect(mount(KsPaginator, { propsData: { pagination: pagination(1, 1) } }).element.style.display).toBe('none');
    });
});

describe('KsSimplePaginator', () => {
    test('moves between pages', async () => {
        const wrapper = mount(KsSimplePaginator, { propsData: { pagination: { current_page: 2, previous_page: 1, next_page: null } } });

        await wrapper.find('.next-page').trigger('click');
        await wrapper.find('.prev-page').trigger('click');

        expect(wrapper.emitted('input')).toEqual([[1]]);
        expect(wrapper.find('.next-page').classes()).toContain('disabled');
        expect(wrapper.find('.prev-page').text()).toBe('<');
    });

    test('pushes the route when routed', async () => {
        const mocks = router();
        const wrapper = mount(KsSimplePaginator, { propsData: { routed: true, pagination: { current_page: '1', previous_page: null, next_page: 2 } }, mocks });

        await wrapper.find('.next-page').trigger('click');

        expect(mocks.$router.push).toHaveBeenCalledWith({ path: '/work', query: { status: 'open', page: 2 } });
    });
});

describe('KsButton', () => {
    test('renders a button, emits click and disables while spinning', async () => {
        const wrapper = mount(KsButton, { propsData: { danger: true }, slots: { default: 'Save' } });

        await wrapper.trigger('click');
        expect(wrapper.emitted('click')).toHaveLength(1);
        expect(wrapper.element.tagName).toBe('BUTTON');
        expect(wrapper.classes()).toContain('danger');

        await wrapper.setProps({ spin: true });
        expect(wrapper.element.disabled).toBe(true);
        expect(wrapper.find('.button-label').classes()).toContain('hidden');
    });

    test('renders another element with el and blocks clicks when disabled (#26)', async () => {
        const wrapper = mount(KsButton, { propsData: { el: 'a', disabled: true }, attrs: { href: '/next' }, slots: { default: 'Next' } });

        expect(wrapper.element.tagName).toBe('A');
        expect(wrapper.attributes('href')).toBe('/next');
        expect(wrapper.attributes('aria-disabled')).toBe('true');
        expect(wrapper.attributes('disabled')).toBeUndefined();
        expect(wrapper.classes()).toContain('disabled');

        await wrapper.trigger('click');
        expect(wrapper.emitted('click')).toBeUndefined();

        await wrapper.setProps({ disabled: false });
        await wrapper.trigger('click');
        expect(wrapper.emitted('click')).toHaveLength(1);
    });
});

test('KsLoaderLine shows the line', () => {
    const wrapper = mount(KsLoaderLine, { propsData: { show: true, height: '3px', absolute: true } });

    expect(wrapper.element.style.height).toBe('3px');
    expect(wrapper.find('.ks-loader-line').element.style.position).toBe('absolute');
});

describe('drag and drop', () => {
    test('KsDraggable emits drag events and sets the dragging class', async () => {
        const wrapper = mount(KsDraggable, { slots: { default: 'Item' } });
        const setData = vi.fn();

        await wrapper.trigger('dragstart', { dataTransfer: { setData } });
        expect(wrapper.classes()).toContain('ks-dragging');
        expect(setData).toHaveBeenCalledWith('text/plain', '');
        expect(wrapper.emitted('dragstart')).toHaveLength(1);

        await wrapper.trigger('dragend');
        expect(wrapper.classes()).not.toContain('ks-dragging');
        expect(wrapper.attributes('draggable')).toBe('true');
    });

    test('a disabled KsDraggable does not drag', async () => {
        const wrapper = mount(KsDraggable, { propsData: { disabled: true } });

        await wrapper.trigger('dragstart', { dataTransfer: { setData: vi.fn() } });

        expect(wrapper.emitted('dragstart')).toBeUndefined();
        expect(wrapper.attributes('draggable')).toBe('false');
    });

    test('KsDroppable accepts a drop and passes the event to accept', async () => {
        const accept = vi.fn(() => true);
        const wrapper = mount(KsDroppable, { propsData: { accept, inactiveClass: 'idle' } });
        expect(wrapper.classes()).toContain('idle');

        await wrapper.trigger('dragover');
        expect(wrapper.classes()).toContain('ks-drop-zone-active');
        expect(accept).toHaveBeenCalledWith(expect.any(Event));

        await wrapper.trigger('drop');
        expect(wrapper.emitted('drop')).toHaveLength(1);
        expect(wrapper.classes()).not.toContain('ks-drop-zone-active');
    });

    test('KsDroppable refuses a drop when accept is false', async () => {
        const wrapper = mount(KsDroppable, { propsData: { accept: () => false } });

        await wrapper.trigger('dragover');
        await wrapper.trigger('drop');

        expect(wrapper.classes()).not.toContain('ks-drop-zone-active');
        expect(wrapper.emitted('drop')).toBeUndefined();
    });

    test('KsDroppable stays active over its children', async () => {
        const wrapper = mount(KsDroppable, { slots: { default: '<span class="child"></span>' } });

        await wrapper.trigger('dragover');
        await wrapper.trigger('dragleave', { relatedTarget: wrapper.find('.child').element });
        expect(wrapper.classes()).toContain('ks-drop-zone-active');

        await wrapper.trigger('dragleave', { relatedTarget: document.body });
        expect(wrapper.classes()).not.toContain('ks-drop-zone-active');
    });
});

describe('navigation', () => {
    test('KsSideNav toggles the body class and closes on a link click', async () => {
        const wrapper = mount(KsSideNav, { slots: { default: '<ul class="nav-links"><li><a class="link">Home</a></li></ul>' }, attachTo: document.body });

        await wrapper.find('.mobile-menu').trigger('click');
        expect(wrapper.classes()).toContain('show');
        expect(document.body.classList.contains('side-nav-open')).toBe(true);

        wrapper.find('.link').element.click();
        await wrapper.vm.$nextTick();
        expect(wrapper.classes()).not.toContain('show');
        expect(document.body.classList.contains('side-nav-open')).toBe(false);
    });

    test('KsSideNav removes its listener on destroy', () => {
        const wrapper = mount(KsSideNav, { slots: { default: '<ul class="nav-links"></ul>' } });
        const links = wrapper.find('.nav-links').element;
        const remove = vi.spyOn(links, 'removeEventListener');

        wrapper.destroy();

        expect(remove).toHaveBeenCalledWith('click', expect.any(Function), false);
    });

    test('KsTopNav toggles the menu and the dropdown', async () => {
        const wrapper = mount(KsTopNav, {
            propsData: { fixed: true },
            slots: { default: '<div class="dropdown"><a class="dropdown-toggle">More</a></div>' },
            attachTo: document.body,
        });
        expect(wrapper.classes()).toContain('fixed');

        wrapper.find('.mobile-menu').element.click();
        expect(wrapper.classes()).toContain('show');
        expect(document.body.classList.contains('side-nav-open')).toBe(true);

        wrapper.find('.dropdown-toggle').element.click();
        expect(wrapper.find('.dropdown').classes()).toContain('show');

        const remove = vi.spyOn(window, 'removeEventListener');
        wrapper.destroy();
        expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
