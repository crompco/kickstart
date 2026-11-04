import { mount } from '@vue/test-utils';
import { afterEach, expect, test, vi } from 'vitest';
import KsModal from '../../src/components/KsModal.vue';

function mountModal(propsData = {}, slots = { default: '<p>Body</p>' }) {
    const host = document.createElement('div');
    document.body.appendChild(host);

    return mount(KsModal, { propsData, slots, attachTo: host });
}

afterEach(() => {
    document.documentElement.className = '';
    document.body.innerHTML = '';
});

test('open moves the modal to body, shows it and emits open', async () => {
    const wrapper = mountModal({ title: 'Edit' });

    wrapper.vm.open();
    await wrapper.vm.$nextTick();

    expect(wrapper.element.parentNode).toBe(document.body);
    expect(wrapper.element.style.display).toBe('');
    expect(wrapper.find('h4').text()).toBe('Edit');
    expect(document.documentElement.classList.contains('modal-open')).toBe(true);
    expect(wrapper.emitted('open')).toHaveLength(1);
});

test('close hides the modal and releases the document', async () => {
    const wrapper = mountModal();
    wrapper.vm.open();
    await wrapper.vm.$nextTick();

    await wrapper.find('.ks-modal-close a').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.element.style.display).toBe('none');
    expect(document.documentElement.classList.contains('modal-open')).toBe(false);
    expect(wrapper.emitted('close')).toHaveLength(1);
});

test('escape closes unless disabled', async () => {
    const wrapper = mountModal();
    wrapper.vm.open();
    await wrapper.find('.ks-modal-wrapper').trigger('keydown', { key: 'Escape', keyCode: 27 });
    expect(wrapper.vm.isOpen).toBe(false);

    await wrapper.setProps({ closeOnEscape: false });
    wrapper.vm.open();
    await wrapper.find('.ks-modal-wrapper').trigger('keydown', { key: 'Escape', keyCode: 27 });
    expect(wrapper.vm.isOpen).toBe(true);
});

test('a mask click closes only when the press started on the mask', async () => {
    const wrapper = mountModal();
    wrapper.vm.open();

    await wrapper.find('.ks-modal-wrapper').trigger('mousedown');
    await wrapper.trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);

    await wrapper.trigger('mousedown');
    await wrapper.trigger('click');
    expect(wrapper.vm.isOpen).toBe(false);
});

test('the mask click can be disabled', async () => {
    const wrapper = mountModal({ closeOnMaskClick: false });
    wrapper.vm.open();

    await wrapper.trigger('mousedown');
    await wrapper.trigger('click');

    expect(wrapper.vm.isOpen).toBe(true);
});

test('loading applies at mount and follows the prop', async () => {
    const wrapper = mountModal({ loading: true });
    expect(wrapper.vm.isLoading).toBe(true);

    await wrapper.setProps({ loading: false });
    expect(wrapper.vm.isLoading).toBe(false);

    expect(wrapper.vm.loadingOn()).toBe(wrapper.vm);
    expect(wrapper.vm.isLoading).toBe(true);
});

test('another open modal keeps the document class', async () => {
    const first = mountModal();
    const second = mountModal();
    first.vm.open();
    second.vm.open();
    Object.defineProperty(first.element, 'offsetHeight', { value: 100, configurable: true });

    second.vm.close();
    await second.vm.$nextTick();

    expect(document.documentElement.classList.contains('modal-open')).toBe(true);
});

test('destroy removes the modal and listeners and emits close only when open', () => {
    const remove = vi.spyOn(window, 'removeEventListener');
    const closed = mountModal();
    closed.destroy();
    expect(closed.emitted('close')).toBeUndefined();

    const opened = mountModal();
    opened.vm.open();
    const element = opened.element;
    opened.destroy();

    expect(opened.emitted('close')).toHaveLength(1);
    expect(element.parentNode).toBe(null);
    expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(document.documentElement.classList.contains('modal-open')).toBe(false);
});

test('a modal taller than the window scrolls', async () => {
    const wrapper = mountModal();
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 500, configurable: true });
    Object.defineProperty(wrapper.find('.ks-modal-wrapper').element, 'clientHeight', { value: 900, configurable: true });

    wrapper.vm.open();
    await wrapper.vm.$nextTick();

    expect(wrapper.classes()).toContain('modal-scroll');
});
