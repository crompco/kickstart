import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import KsToast from '../../src/components/KsToast.vue';

let wrappers = [];

function toast(propsData = {}, slots = {}) {
    const wrapper = mount(KsToast, { propsData, slots, stubs: { transition: false } });
    wrappers.push(wrapper);

    return wrapper;
}

function container() {
    return document.querySelector('.ks-toast');
}

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    wrappers.forEach(wrapper => wrapper.destroy());
    wrappers = [];
    vi.useRealTimers();
    document.body.innerHTML = '';
});

test('shows the message in a container on the body with the position class', async () => {
    const wrapper = toast({ message: 'Saved <b>job</b>', type: 'success', position: 'bottom-left' });
    await wrapper.vm.$nextTick();

    expect(container().parentElement).toBe(document.body);
    expect(container().className).toBe('ks-toast bottom-left');
    expect(container().contains(wrapper.element)).toBe(true);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['ks-alert', 'success']));
    expect(wrapper.find('b').text()).toBe('job');
    expect(wrapper.element.style.display).not.toBe('none');
});

test('the slot replaces the message', () => {
    const wrapper = toast({ message: 'Ignored' }, { default: '<em>Custom</em>' });

    expect(wrapper.find('em').text()).toBe('Custom');
    expect(wrapper.text()).not.toContain('Ignored');
});

test('closes after the duration and emits closed once it is removed', async () => {
    const wrapper = toast({ message: 'Saved', duration: 1000 });

    vi.advanceTimersByTime(999);
    expect(wrapper.vm.active).toBe(true);

    vi.advanceTimersByTime(1);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.active).toBe(false);
    expect(wrapper.emitted('closed')).toBeUndefined();

    vi.advanceTimersByTime(250);
    expect(wrapper.emitted('closed')).toHaveLength(1);
    expect(container().contains(wrapper.element)).toBe(false);
});

test('a duration of 0 stays open and shows a close button', async () => {
    const wrapper = toast({ message: 'Read me', duration: 0 });

    vi.advanceTimersByTime(60000);
    expect(wrapper.vm.active).toBe(true);
    expect(wrapper.classes()).toContain('has-close');

    await wrapper.find('.close').trigger('click');
    vi.advanceTimersByTime(250);

    expect(wrapper.emitted('closed')).toHaveLength(1);
});

test('the default toast has no close button', () => {
    const wrapper = toast({ message: 'Saved' });

    expect(wrapper.find('.close').exists()).toBe(false);
    expect(wrapper.classes()).not.toContain('has-close');
});

test('toasts share one container', () => {
    toast({ message: 'One' });
    toast({ message: 'Two' });

    expect(document.querySelectorAll('.ks-toast')).toHaveLength(1);
    expect(container().childElementCount).toBe(2);
});

test('a toast over the limit waits until another one closes', () => {
    toast({ message: 'One', duration: 1000, limit: 2 });
    toast({ message: 'Two', duration: 5000, limit: 2 });
    const third = toast({ message: 'Three', duration: 5000, limit: 2 });

    expect(container().childElementCount).toBe(2);
    expect(third.vm.active).toBe(false);

    vi.advanceTimersByTime(1250);
    expect(container().childElementCount).toBe(1);

    vi.advanceTimersByTime(350);
    expect(third.vm.active).toBe(true);
    expect(container().contains(third.element)).toBe(true);
});

test('destroy stops the timers', () => {
    const wrapper = toast({ message: 'Saved', duration: 1000 });

    wrapper.destroy();
    wrappers = [];
    vi.advanceTimersByTime(5000);

    expect(wrapper.vm.active).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
});
