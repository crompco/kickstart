import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import KsTooltip from '../../src/components/KsTooltip.vue';
import { flushPromises, setViewport } from '../helpers/layout';

function mountWithTarget(props = {}, slot = 'Tip') {
    return mount({
        template: `<div><button ref="target">Hover</button><span class="host"><ks-tooltip v-bind="props">${slot}</ks-tooltip></span></div>`,
        components: { KsTooltip },
        data: () => ({ props }),
    }, { attachTo: document.body });
}

beforeEach(() => {
    setViewport(1000, 800);
});

afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
});

describe('hover', () => {
    test('shows on mouseenter of the parent element and moves to body', async () => {
        const wrapper = mountWithTarget();
        await wrapper.vm.$nextTick();
        const tooltip = wrapper.findComponent(KsTooltip);

        wrapper.find('.host').trigger('mouseenter');
        await wrapper.vm.$nextTick();
        await flushPromises();

        expect(tooltip.vm.showing).toBe(true);
        expect(tooltip.element.parentNode).toBe(document.body);
        expect(tooltip.element.style.position).toBe('absolute');
        expect(tooltip.emitted('tooltip-showed')).toHaveLength(1);
    });

    test('hides after the hide delay', async () => {
        vi.useFakeTimers();
        const wrapper = mountWithTarget({ hideDelay: 100 });
        await wrapper.vm.$nextTick();
        const tooltip = wrapper.findComponent(KsTooltip);

        wrapper.find('.host').trigger('mouseenter');
        wrapper.find('.host').trigger('mouseleave');
        vi.advanceTimersByTime(99);
        expect(tooltip.vm.showing).toBe(true);

        vi.advanceTimersByTime(1);
        expect(tooltip.vm.showing).toBe(false);
        expect(tooltip.emitted('tooltip-hidden')).toHaveLength(1);
    });

    test('waits for the hover delay', async () => {
        vi.useFakeTimers();
        const wrapper = mountWithTarget({ hoverDelay: 300 });
        await wrapper.vm.$nextTick();
        const tooltip = wrapper.findComponent(KsTooltip);

        wrapper.find('.host').trigger('mouseenter');
        vi.advanceTimersByTime(299);
        expect(tooltip.vm.showing).toBe(false);

        vi.advanceTimersByTime(1);
        expect(tooltip.vm.showing).toBe(true);
    });

    test('stays hidden when it is not active', async () => {
        const wrapper = mountWithTarget({ isActive: false });
        await wrapper.vm.$nextTick();

        wrapper.find('.host').trigger('mouseenter');

        expect(wrapper.findComponent(KsTooltip).vm.showing).toBe(false);
    });
});

describe('click', () => {
    test('toggles on click and hides on an outside click', async () => {
        const wrapper = mountWithTarget({ trigger: 'click', target: 'target' });
        await wrapper.vm.$nextTick();
        const tooltip = wrapper.findComponent(KsTooltip);

        wrapper.find('button').trigger('click');
        expect(tooltip.vm.showing).toBe(true);

        document.body.click();
        expect(tooltip.vm.showing).toBe(false);

        wrapper.find('button').trigger('click');
        wrapper.find('button').trigger('click');
        expect(tooltip.vm.showing).toBe(false);
    });
});

test('destroy removes the listeners and the element in body', async () => {
    const wrapper = mountWithTarget({ trigger: 'click', target: 'target' });
    await wrapper.vm.$nextTick();
    const tooltip = wrapper.findComponent(KsTooltip);
    const button = wrapper.find('button').element;
    const remove = vi.spyOn(button, 'removeEventListener');
    const removeDocument = vi.spyOn(document, 'removeEventListener');

    button.click();
    await wrapper.vm.$nextTick();
    expect(tooltip.element.parentNode).toBe(document.body);

    const element = tooltip.element;
    wrapper.destroy();

    expect(remove).toHaveBeenCalledWith('click', expect.any(Function));
    expect(removeDocument).toHaveBeenCalledWith('click', expect.any(Function));
    expect(element.parentNode).toBe(null);
});

test('accepts an element as the target', async () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const wrapper = mount(KsTooltip, { propsData: { target: button }, slots: { default: 'Tip' } });
    await wrapper.vm.$nextTick();

    button.dispatchEvent(new MouseEvent('mouseenter'));

    expect(wrapper.vm.showing).toBe(true);
});
