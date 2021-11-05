/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
import CalendarDays from '../components/CalendarDays.vue';

export default {
  title: 'UI-KIT/CalendarDays',
  component: CalendarDays,
  argTypes: {
    dayOption: {
      description: 'Data to render days button. It has default setting as 1d, 3d,7d.',
      type: 'array',
    },
    defaultValue: {
      description: 'A value to set the default selected day.',
      type: 'string',
    },
    cleanDayValue: {
      description:
        'A props to tell days button to cancel day choice. Inside the days button would listen to `cleanDayValue`, if it is true, then days would clean..',
      type: 'boolean',
    },

    onChangeTime: {
      action: 'changeTime',
      description:
        "Event name is `changeTime`. A customize event triggered when change RangePicker's value or Days. Return a period of selected time.",
    },
    onChangeDefaultValue: {
      action: 'changeDefaultValue',
      description:
        'Event name is `changeDefaultValue`. Emit an event when default value changes. Return the date range info same as "clickDayButton".',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CalendarDays },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <CalendarDays v-bind="args" ></CalendarDays>
  `,
});

export const Default = Template.bind({});
Default.args = {
  dayOption: [
    { title: '3d', value: '3' },
    { title: '5d', value: '5' },
    { title: '7d', value: '7' },
  ],
  defaultValue: '7',
  cleanDayValue: false,
  defaultRangePickerValue: [moment('2021-08-01 18:01:44'), moment('2021-08-01 18:01:44')],
};
