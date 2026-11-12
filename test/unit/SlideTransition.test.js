import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import SlideTransition from '../../src/components/transitions/SlideTransition.vue';

test('shows and hides its content', async () => {
    const wrapper = mount({
        template: '<div><slide-transition><p v-show="open">Content</p></slide-transition></div>',
        components: { SlideTransition },
        data: () => ({ open: false }),
    }, { attachTo: document.body });

    expect(wrapper.find('p').element.style.display).toBe('none');

    await wrapper.setData({ open: true });
    expect(wrapper.find('p').element.style.display).toBe('');
    expect(wrapper.find('p').element.style.overflow).toBe('');

    await wrapper.setData({ open: false });
    expect(wrapper.find('p').element.style.display).toBe('none');

    wrapper.destroy();
});
