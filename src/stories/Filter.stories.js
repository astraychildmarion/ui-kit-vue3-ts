/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
import XYFilter from '../components/Filter.vue';

export default {
  title: 'UI-Kit/Filter',
  component: XYFilter,
  argTypes: {
    dropdownOption: {
      description: "The data source for dropdown's option.",
      control: 'array',
    },
    filterDefaultValue: {
      control: 'array',
      description: 'To set default filter condition. You can use it in `change log` page.',
    },
    onFilterChange: {
      description:
        'Event name is `filterChange`. The function would be trigger when all displayed inputs are filled, and emit a object of value.',
      action: 'filterChange',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { XYFilter },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<x-y-filter v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  dropdownOption: [
    {
      field: 'bu',
      options: ['188Asia', 'BI', 'CAS', 'CP', 'FYT', 'INFRA-APP', 'INFRA-CEM', 'XJ'],
    },
    {
      field: 'shared_with',
      options: ['188Asia', 'BI', 'Innovation Lab', 'INFRA-APP', 'INFRA-CEM', 'INFRA-STORM'],
    },
    {
      field: 'cpu',
      options: ['1gb', '4gb', '8gb'],
    },
    {
      field: 'vm_status',
      options: ['Proceeding', 'Enable', 'Disable', 'Offline'],
    },
    {
      field: 'ltm_status',
      options: ['Proceeding', 'Enable', 'Disable', 'Offline'],
    },
    {
      field: 'ram_gb',
      options: ['1gb', '4gb', '8gb'],
    },
    {
      field: 'os',
      options: [
        'CentOs7.0',
        'CentOs9.0',
        'Oracle Enterprise Linux 6.6 (UEK)',
        'W2K12R2 Storage Server',
      ],
    },
    {
      field: 'server_type',
      options: ['VM', 'PHY'],
    },
    {
      field: 'env',
      options: ['UAT', 'Prod'],
    },
  ],
  filterDefaultValue: [
    {
      field: 'hostname',
      mode: 'contain',
      value: 'host123',
    },
    {
      field: 'server_type',
      mode: 'in',
      value: ['PHY'],
    },
    {
      field: 'last_update_at',
      mode: 'in',
      value: [moment('2021-11-08 18:01:44'), moment('2021-11-10 18:01:44')],
    },
  ],
};
