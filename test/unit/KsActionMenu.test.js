import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, expect, test } from 'vitest';
import KsActionMenu from '../../src/components/KsActionMenu.vue';
import { flushPromises, setViewport } from '../helpers/layout';

function mountMenu(propsData = {}) {
    return mount(KsActionMenu, {
        propsData,
        slots: { default: '<a class="item">Edit</a>' },
        attachTo: document.body,
    });
}

beforeEach(() => {
    setViewport(1000, 800);
});

afterEach(() => {
    document.body.innerHTML = '';
});

test('opens into body below the button and emits active', async () => {
    const wrapper = mountMenu();
    const list = wrapper.find('.ks-menu-list').element;

    await wrapper.find('.menu-button').trigger('click');
    await flushPromises();

    expect(list.parentNode).toBe(document.body);
    expect(list.classList.contains('active')).toBe(true);
    expect(list.style.position).toBe('absolute');
    expect(document.querySelector('.ks-menu-list.active .item').textContent).toBe('Edit');
    expect(wrapper.emitted('active')[0]).toEqual([true]);
});

test('closes on a click outside and on an item click', async () => {
    const wrapper = mountMenu();
    const list = wrapper.find('.ks-menu-list').element;

    await wrapper.find('.menu-button').trigger('click');
    document.body.click();
    await wrapper.vm.$nextTick();
    expect(list.classList.contains('active')).toBe(false);

    await wrapper.find('.menu-button').trigger('click');
    list.querySelector('.item').click();
    await wrapper.vm.$nextTick();
    expect(list.classList.contains('active')).toBe(false);
});

test('opening one menu closes the others', async () => {
    const first = mountMenu();
    const second = mountMenu();

    await first.find('.menu-button').trigger('click');
    await second.find('.menu-button').trigger('click');

    expect(first.vm.active).toBe(false);
    expect(second.vm.active).toBe(true);
});

test('the show prop closes the menu', async () => {
    const wrapper = mountMenu({ show: true });

    await wrapper.find('.menu-button').trigger('click');
    await wrapper.setProps({ show: false });

    expect(wrapper.vm.active).toBe(false);
});

test('applies the open class', async () => {
    const wrapper = mountMenu({ openClass: 'is-open' });

    await wrapper.find('.menu-button').trigger('click');

    expect(wrapper.classes()).toContain('is-open');
});

test('destroy removes the list from body', async () => {
    const wrapper = mountMenu();
    await wrapper.find('.menu-button').trigger('click');
    await flushPromises();

    wrapper.destroy();

    expect(document.querySelector('.ks-menu-list')).toBe(null);
});
