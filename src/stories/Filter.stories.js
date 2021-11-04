/* eslint-disable import/no-extraneous-dependencies */
import moment from 'moment';
import XYFilter from '../components/Filter.vue';

export default {
  title: 'UI-Kit/Filter',
  component: XYFilter,
  argTypes: {
    filterOption: {
      description: 'The data source for selectors.',
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
  filterOption: [
    {
      title: 'BU',
      field: 'business_unit',
      format: 'dropdown',
      formatOption: [
        { title: 'YT-CWD', field: 'YT-CWD' },
        { title: 'XJ', field: 'XJ' },
        { title: 'SBK', field: 'SBK' },
      ],
    },
    {
      title: 'Shared with',
      field: 'shared_with',
      format: 'dropdown',
      formatOption: [
        { title: '188Asia', field: '188Asia' },
        { title: 'BI', field: 'BI' },
        { title: 'Innovation Lab', field: 'Innovation Lab' },
        { title: 'INFRA-APP', field: 'INFRA-APP' },
        { title: 'INFRA-CEM', field: 'INFRA-CEM' },
        { title: 'INFRA-STORM', field: 'INFRA-STORM' },
      ],
    },
    {
      title: 'ServiceLAN IP',
      field: 'service_lan_ip',
    },
    {
      title: 'Hostname',
      field: 'hostname',
    },
    {
      title: 'BU Application Name',
      field: 'bu_application',
    },
    {
      title: 'Type',
      field: 'server_type',
      format: 'dropdown',
      formatOption: [
        {
          title: 'VM',
          field: 'vm',
        },
        {
          title: 'PHY',
          field: 'phy',
        },
      ],
    },
    {
      title: 'CPU (GB)',
      field: 'cpu',
    },
    {
      title: 'RAM (GB)',
      field: 'ram',
    },
    {
      title: 'Disk (GB)',
      field: 'disk',
    },
    {
      title: 'OS',
      field: 'os',
      format: 'dropdown',
      formatOption: [
        {
          title: 'Windows',
          field: 'windows',
        },
        {
          title: 'Linux',
          field: 'linux',
        },
      ],
    },
    {
      title: 'Last Update',
      field: 'last_update',
      format: 'calendar',
    },
  ],
  filterDefaultValue: [
    {
      field: 'hostname',
      mode: 'in',
      value: ['host', '1234', 'abc'],
    },
    {
      field: 'server_type',
      mode: 'in',
      value: ['phy'],
    },
    {
      field: 'last_update',
      mode: 'in',
      value: [moment('2021-08-01 18:01:44'), moment('2021-08-01 18:01:44')],
    },
  ],
};
