import { createLocalVue, mount } from '@vue/test-utils';
import { afterEach, beforeEach, expect, test } from 'vitest';
import KsTooltipDirective from '../../src/directives/KsTooltip';
import { setViewport } from '../helpers/layout';

const localVue = createLocalVue();
localVue.directive('ks-tooltip', KsTooltipDirective);

function mountDirective(binding, data = {}) {
    return mount({
        template: `<div><button ${binding}>Hover</button></div>`,
        data: () => data,
    }, { localVue, attachTo: document.body });
}

beforeEach(() => {
    setViewport(1000, 800);
});

afterEach(() => {
    document.body.innerHTML = '';
});

test('shows the text on hover and hides on leave', () => {
    const wrapper = mountDirective(`v-ks-tooltip="'Hello <b>there</b>'"`);
    const button = wrapper.find('button');

    button.trigger('mouseenter');
    const tooltip = document.body.querySelector(':scope > .ks-tooltip');
    expect(tooltip.textContent).toBe('Hello <b>there</b>');
    expect(tooltip.querySelector('b')).toBe(null);
    expect(tooltip.classList.contains('show-arrow')).toBe(true);

    button.trigger('mouseleave');
    expect(tooltip.style.display).toBe('none');
});

test('renders HTML only when asked', () => {
    const wrapper = mountDirective(`v-ks-tooltip="{ content: '<b>Bold</b>', html: true, showArrow: false }"`);

    wrapper.find('button').trigger('mouseenter');
    const tooltip = document.body.querySelector(':scope > .ks-tooltip');

    expect(tooltip.querySelector('b').textContent).toBe('Bold');
    expect(tooltip.classList.contains('show-arrow')).toBe(false);
});

test('keeps state per element', () => {
    const wrapper = mount({
        template: `<div><button class="one" v-ks-tooltip="'One'"></button><button class="two" v-ks-tooltip="'Two'"></button></div>`,
    }, { localVue, attachTo: document.body });

    wrapper.find('.one').trigger('mouseenter');
    wrapper.find('.two').trigger('mouseenter');
    wrapper.find('.one').trigger('mouseleave');

    const visible = [...document.body.querySelectorAll(':scope > .ks-tooltip')].filter(el => el.style.display !== 'none');
    expect(visible.map(el => el.textContent)).toEqual(['Two']);
});

test('the click modifier toggles on click', () => {
    const wrapper = mountDirective(`v-ks-tooltip.click="'Clicked'"`);
    const button = wrapper.find('button');

    button.trigger('click');
    const tooltip = document.body.querySelector(':scope > .ks-tooltip');
    expect(tooltip.style.display).toBe('');

    document.body.click();
    expect(tooltip.style.display).toBe('none');
});

test('updates the content and isActive', async () => {
    const wrapper = mountDirective(`v-ks-tooltip="{ content: text, isActive: active }"`, { text: 'First', active: true });

    wrapper.find('button').trigger('mouseenter');
    wrapper.setData({ text: 'Second' });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector(':scope > .ks-tooltip').textContent).toBe('Second');

    wrapper.setData({ active: false });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector(':scope > .ks-tooltip').style.display).toBe('none');
});

test('unbind removes the tooltip element', () => {
    const wrapper = mountDirective(`v-ks-tooltip="'Bye'"`);
    wrapper.find('button').trigger('mouseenter');

    wrapper.destroy();

    expect(document.body.querySelector('.ks-tooltip')).toBe(null);
});
