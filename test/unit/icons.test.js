import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import IconCheckmark from '../../src/components/icons/IconCheckmark.vue';
import IconChevronDown from '../../src/components/icons/IconChevronDown.vue';
import IconClose from '../../src/components/icons/IconClose.vue';
import IconDotsHorizontal from '../../src/components/icons/IconDotsHorizontal.vue';
import IconMenu from '../../src/components/icons/IconMenu.vue';

describe('icons', () => {
    // Component styles color icons through `svg path { fill }`, as 2.x did
    test.each([
        ['IconCheckmark', IconCheckmark],
        ['IconChevronDown', IconChevronDown],
        ['IconClose', IconClose],
        ['IconDotsHorizontal', IconDotsHorizontal],
        ['IconMenu', IconMenu],
    ])('%s draws its shape with a path', (name, icon) => {
        const wrapper = mount(icon);

        expect(wrapper.findAll('path').length).toBeGreaterThan(0);
        expect(wrapper.findAll('polygon, rect, circle, polyline').length).toBe(0);
    });
});
