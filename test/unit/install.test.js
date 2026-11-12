import { createLocalVue } from '@vue/test-utils';
import { afterEach, expect, test, vi } from 'vitest';
import Kickstart, { install, KsModal } from '../../src/index';
import api from '../../src/helpers/api';

afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
});

test('the default export has the components and install', () => {
    expect(Kickstart.KsModal).toBe(KsModal);
    expect(Kickstart.install).toBe(install);
});

test('install registers the components, transitions, filters and globals', () => {
    const Vue = createLocalVue();
    Vue.use(Kickstart);

    expect(Vue.options.components['ks-modal']).toBeTruthy();
    expect(Vue.options.components['ks-select']).toBeTruthy();
    expect(Vue.options.components.SlideTransition).toBeTruthy();
    expect(Vue.filter('currency')(1234)).toBe('$1,234.00');
    expect(Vue.filter('ucwords')('a b')).toBe('A B');
    expect(Vue.api).toBe(api);

    const vm = new Vue();
    expect(vm.$api).toBe(api);
    expect(vm.$toast).toBe(Vue.toast);
});

test('install refuses Vue 3', () => {
    expect(() => install({ config: { globalProperties: {} } })).toThrow(/Vue 2\.7/);
});

test('$toast opens a toast and destroys it after it closes', () => {
    vi.useFakeTimers();
    const Vue = createLocalVue();
    Vue.use(Kickstart);

    const toast = Vue.toast({ message: 'Saved', type: 'success', duration: 100 });
    const destroy = vi.spyOn(toast, '$destroy');

    expect(document.querySelectorAll('.ks-toast').length).toBe(1);
    expect(document.querySelector('.ks-toast').textContent).toContain('Saved');

    vi.advanceTimersByTime(100 + 250);
    expect(destroy).toHaveBeenCalled();
    expect(document.querySelector('.ks-toast').textContent).not.toContain('Saved');
});

test('$toast takes a plain message and shares one container', () => {
    const Vue = createLocalVue();
    Vue.use(Kickstart);

    Vue.toast('One');
    Vue.toast('Two');

    expect(document.querySelectorAll('.ks-toast').length).toBe(1);
    expect(document.querySelector('.ks-toast').textContent).toContain('One');
    expect(document.querySelector('.ks-toast').textContent).toContain('Two');
});
