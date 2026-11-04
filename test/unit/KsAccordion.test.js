import { mount } from '@vue/test-utils';
import { expect, test } from 'vitest';
import KsAccordion from '../../src/components/KsAccordion.vue';
import KsAccordionRow from '../../src/components/KsAccordionRow.vue';
import KsStepThrough from '../../src/components/KsStepThrough.vue';

function mountAccordion(collapsible = true) {
    return mount({
        template: `
            <ks-accordion ref="accordion" :collapsible="collapsible">
                <ks-accordion-row title="One">First</ks-accordion-row>
                <div><ks-accordion-row title="Two">Second</ks-accordion-row></div>
            </ks-accordion>`,
        components: { KsAccordion, KsAccordionRow },
        data: () => ({ collapsible }),
    });
}

function openRows(wrapper) {
    return wrapper.findAllComponents(KsAccordionRow).wrappers.filter(row => row.vm.showContent).map(row => row.props('title'));
}

test('opens one row at a time when collapsible, including nested rows', async () => {
    const wrapper = mountAccordion();
    const titles = wrapper.findAll('.ks-accordion-title');

    await titles.at(0).trigger('click');
    expect(openRows(wrapper)).toEqual(['One']);

    await titles.at(1).trigger('click');
    expect(openRows(wrapper)).toEqual(['Two']);

    await titles.at(1).trigger('click');
    expect(openRows(wrapper)).toEqual([]);
});

test('opens many rows when not collapsible', async () => {
    const wrapper = mountAccordion(false);
    const titles = wrapper.findAll('.ks-accordion-title');

    await titles.at(0).trigger('click');
    await titles.at(1).trigger('click');

    expect(openRows(wrapper)).toEqual(['One', 'Two']);
});

test('collapseAll closes every row and row-clicked is emitted', async () => {
    const wrapper = mountAccordion(false);
    await wrapper.findAll('.ks-accordion-title').at(0).trigger('click');

    wrapper.vm.$refs.accordion.collapseAll();

    expect(openRows(wrapper)).toEqual([]);
    expect(wrapper.findAllComponents(KsAccordionRow).at(0).emitted('row-clicked')).toHaveLength(1);
});

test('a row works without an accordion', async () => {
    const row = mount(KsAccordionRow, { propsData: { title: 'Alone' } });

    await row.find('.ks-accordion-title').trigger('click');

    expect(row.vm.showContent).toBe(true);
});

test('KsStepThrough shows the completed mark', async () => {
    const wrapper = mount(KsStepThrough, { propsData: { steps: ['One', 'Two'], activeStep: 1 } });

    wrapper.vm.completeStep();
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('li').at(0).classes()).toContain('completed');
    expect(wrapper.findAll('.num').at(0).text()).toBe('✔');
    expect(wrapper.emitted('input')[0]).toEqual([2]);
});

test('KsStepThrough only changes on click when interactive', async () => {
    const wrapper = mount(KsStepThrough, { propsData: { steps: ['One', 'Two'] } });

    await wrapper.findAll('a').at(1).trigger('click');
    expect(wrapper.emitted('input')).toBeUndefined();

    await wrapper.setProps({ allowInteraction: true });
    await wrapper.findAll('a').at(1).trigger('click');
    expect(wrapper.emitted('input')[0]).toEqual([2]);
});
