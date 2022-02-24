import { mount } from '@vue/test-utils';
import calendar from '../../src/components/CalendarDays.vue';
/* eslint-disable no-undef */
describe('calendarDays.vue', () => {
  test('props 3 and emit 4 dates', async () => {
    const component = mount(calendar, {
      props: {
        defaultDaysValue: '3',
        defaultRangePickerValue: [],
      },
    });
    expect(component.emitted().changeTime[0][0].dates).toHaveLength(4);
  });
  test('props 5 and emit 6 dates', async () => {
    const component = mount(calendar, {
      props: {
        defaultDaysValue: '5',
        defaultRangePickerValue: [],
      },
    });
    expect(component.emitted().changeTime[0][0].dates).toHaveLength(6);
  });
  test('props 7 and emit 8 dates', async () => {
    const component = mount(calendar, {
      props: {
        defaultDaysValue: '7',
        defaultRangePickerValue: [],
      },
    });
    expect(component.emitted().changeTime[0][0].dates).toHaveLength(8);
  });
  test('props 5 days and click 5 should return undefined', async () => {
    const component = mount(calendar, {
      props: {
        defaultDaysValue: '5',
        defaultRangePickerValue: [],
      },
    });
    await component.findAll('.ant-radio-button-wrapper')[1].trigger('click');
    expect(component.emitted().changeTime[1][0]).toBeUndefined();
  });
});
