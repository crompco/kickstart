import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, test } from 'vitest';
import KsCalendar from '../../src/components/KsCalendar.vue';
import KsDatepicker from '../../src/components/KsDatepicker.vue';
import { flushPromises } from '../helpers/layout';

let wrapper = null;

function mountCalendar(propsData) {
    wrapper = mount(KsCalendar, { propsData, attachTo: document.body });
    return wrapper;
}

function dayKeys(calendar) {
    return calendar.findAll('.ks-cal-week:not(.ks-cal-week-header) .ks-day-num').wrappers
        .map(day => day.classes().find(name => name.startsWith('ks-date-')).replace('ks-date-', ''));
}

afterEach(() => {
    if ( wrapper ) {
        wrapper.destroy();
        wrapper = null;
    }
    document.body.innerHTML = '';
});

describe('KsCalendar', () => {
    test('fills whole weeks around the month', () => {
        const keys = dayKeys(mountCalendar({ date: '2021-02-10' }));

        expect(keys.length).toBe(35);
        expect(keys[0]).toBe('2021-01-31');
        expect(keys[keys.length - 1]).toBe('2021-03-06');
        expect(wrapper.findAll('.ks-cal-day:not(.ks-cal-week-header .ks-cal-day)').length).toBe(28);
        expect(wrapper.find('.ks-calendar-month-picker').text()).toBe('February');
    });

    test('starts the week on weekStart', () => {
        const keys = dayKeys(mountCalendar({ date: '2021-02-10', weekStart: 1 }));

        expect(keys[0]).toBe('2021-02-01');
        expect(wrapper.find('.ks-cal-week-header .ks-cal-day').text()).toBe('Mon');
        expect(keys.length % 7).toBe(0);
    });

    test('reads a Date in the timezone prop', () => {
        // 2021-03-01 02:00 UTC is still February 28 in New York
        mountCalendar({ date: new Date(Date.UTC(2021, 2, 1, 2)), timezone: 'America/New_York' });

        expect(wrapper.find('.ks-calendar-month-picker').text()).toBe('February');
    });

    test('changeMonth keeps the day inside the month', async () => {
        mountCalendar({ date: '2021-01-31', monthPicker: true });

        wrapper.vm.changeMonth(1);
        expect(wrapper.emitted('input')[0]).toEqual(['2021-02-28']);
    });

    test('changeYear keeps the day inside the month', async () => {
        mountCalendar({ date: '2020-02-29', yearPicker: true });

        wrapper.vm.changeYear(2021);
        expect(wrapper.emitted('input')[0]).toEqual(['2021-02-28']);
        expect(wrapper.vm.year_list[0]).toBe(1921);
        expect(wrapper.vm.year_list[199]).toBe(2120);
    });

    test('next and previous move one month', async () => {
        mountCalendar({ date: '2021-03-31' });

        await wrapper.find('.ks-ctrl-left').trigger('click');
        await wrapper.find('.ks-ctrl-right').trigger('click');

        expect(wrapper.emitted('input')).toEqual([['2021-02-28'], ['2021-04-30']]);
        expect(wrapper.emitted('previous')).toHaveLength(1);
        expect(wrapper.emitted('next')).toHaveLength(1);
    });

    test('min and max dates limit selection', async () => {
        mountCalendar({ date: '2021-02-10', minDate: '2021-02-05', maxDate: new Date(Date.UTC(2021, 1, 20, 23)), interactive: true });

        const day = key => wrapper.find(`.ks-date-${key}`).element.closest('.ks-cal-day, .ks-cal-blank');

        expect(day('2021-02-04').classList).toContain('ks-out_of_scope');
        expect(day('2021-02-04').hasAttribute('tabindex')).toBe(false);
        expect(day('2021-02-05').classList).not.toContain('ks-out_of_scope');
        expect(day('2021-02-05').getAttribute('tabindex')).toBe('0');
        expect(day('2021-02-20').classList).not.toContain('ks-out_of_scope');
        expect(day('2021-02-21').classList).toContain('ks-out_of_scope');

        day('2021-02-04').click();
        day('2021-02-05').click();
        expect(wrapper.emitted('select')).toEqual([['2021-02-05']]);
    });

    test('marks every selected day', () => {
        mountCalendar({ date: '2021-02-10', selection: ['2021-02-01', new Date(Date.UTC(2021, 1, 3))] });

        const selected = wrapper.findAll('.ks-selected .ks-day-num').wrappers.map(day => day.text());
        expect(selected).toEqual(['1', '3']);
    });

    test('marks the local date as today', () => {
        const now = new Date();
        const today = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
        mountCalendar({ date: today });

        expect(wrapper.find('.ks-today .ks-day-num').classes()).toContain(`ks-date-${today}`);
    });

    test('uses the format for keys and events', async () => {
        mountCalendar({ date: '02/10/2021', format: 'm/d/Y' });

        expect(wrapper.find('.ks-calendar-month-picker').text()).toBe('February');
        wrapper.vm.selectDay(wrapper.vm.days[0]);
        expect(wrapper.emitted('select')[0]).toEqual(['02/01/2021']);
    });

    test('removes the mouse hold listeners', async () => {
        mountCalendar({ date: '2021-02-10' });
        await flushPromises();
        expect(wrapper.vm.mousehold_removers).toHaveLength(2);

        await wrapper.setProps({ showControls: false });
        await flushPromises();
        expect(wrapper.vm.mousehold_removers).toHaveLength(0);
    });
});

describe('KsDatepicker', () => {
    function mountPicker(template, data) {
        wrapper = mount({ template, components: { KsDatepicker }, data: () => data }, { attachTo: document.body });
        return wrapper;
    }

    test('shows the value on the first render', () => {
        mountPicker('<ks-datepicker v-model="date"></ks-datepicker>', { date: '2021-02-10' });

        expect(wrapper.find('.ks-datepicker-display').element.value).toBe('02/10/2021');
        expect(wrapper.find('input[type="hidden"]').element.value).toBe('2021-02-10');
    });

    test('typing a full date emits it', async () => {
        mountPicker('<ks-datepicker v-model="date"></ks-datepicker>', { date: '' });

        await wrapper.find('.ks-datepicker-display').setValue('03152021');
        expect(wrapper.find('.ks-datepicker-display').element.value).toBe('03/15/2021');
        expect(wrapper.vm.date).toBe('2021-03-15');
    });

    test('rejects an out of scope date', async () => {
        mountPicker('<ks-datepicker v-model="date" min-date="2021-03-01" @input-error="error = $event"></ks-datepicker>', { date: '2021-03-10', error: null });

        await wrapper.find('.ks-datepicker-display').setValue('02/01/2021');
        await flushPromises();

        expect(wrapper.vm.error).toBe('2021-02-01');
        expect(wrapper.vm.date).toBe('2021-03-10');
        expect(wrapper.find('.ks-datepicker-display').element.value).toBe('03/10/2021');
    });

    test('selecting a day emits it and closes', async () => {
        mountPicker('<ks-datepicker v-model="date"></ks-datepicker>', { date: '2021-03-10' });
        const picker = wrapper.findComponent(KsDatepicker);

        await wrapper.find('.ks-datepicker-display').trigger('focus');
        expect(picker.vm.is_open).toBe(true);

        await wrapper.find('.ks-date-2021-03-12').element.closest('.ks-cal-day').click();
        await flushPromises();

        expect(wrapper.vm.date).toBe('2021-03-12');
        expect(picker.vm.is_open).toBe(false);
        expect(picker.emitted('close')).toHaveLength(1);
    });

    test('reads a Date value in the timezone prop', () => {
        mountPicker('<ks-datepicker :value="date" timezone="America/New_York"></ks-datepicker>', { date: new Date(Date.UTC(2021, 2, 1, 2)) });

        expect(wrapper.find('.ks-datepicker-display').element.value).toBe('02/28/2021');
    });
});
