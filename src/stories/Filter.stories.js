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
      dataIndex: 'business_unit',
      type: 'dropdown',
      typeOption: [
        { title: 'YT-CWD', dataIndex: 'YT-CWD' },
        { title: 'XJ', dataIndex: 'XJ' },
        { title: 'SBK', dataIndex: 'SBK' },
      ],
    },
    {
      title: 'Shared with',
      dataIndex: 'shared_with',
      type: 'dropdown',
      typeOption: [
        { title: '188Asia', dataIndex: '188Asia' },
        { title: 'BI', dataIndex: 'BI' },
        { title: 'Innovation Lab', dataIndex: 'Innovation Lab' },
        { title: 'INFRA-APP', dataIndex: 'INFRA-APP' },
        { title: 'INFRA-CEM', dataIndex: 'INFRA-CEM' },
        { title: 'INFRA-STORM', dataIndex: 'INFRA-STORM' },
      ],
    },
    {
      title: 'ServiceLAN IP',
      dataIndex: 'service_lan_ip',
    },
    {
      title: 'Hostname',
      dataIndex: 'hostname',
    },
    {
      title: 'BU Application Name',
      dataIndex: 'bu_application',
    },
    {
      title: 'Type',
      dataIndex: 'server_type',
      type: 'dropdown',
      typeOption: [
        {
          title: 'VM',
          dataIndex: 'vm',
        },
        {
          title: 'PHY',
          dataIndex: 'phy',
        },
      ],
    },
    {
      title: 'CPU (GB)',
      dataIndex: 'cpu',
    },
    {
      title: 'RAM (GB)',
      dataIndex: 'ram',
    },
    {
      title: 'Disk (GB)',
      dataIndex: 'disk',
    },
    {
      title: 'OS',
      dataIndex: 'os',
      type: 'dropdown',
      typeOption: [
        {
          title: 'Windows',
          dataIndex: 'windows',
        },
        {
          title: 'Linux',
          dataIndex: 'linux',
        },
      ],
    },
    {
      title: 'Last Update',
      dataIndex: 'last_update',
      type: 'date',
    },
  ],
  filterDefaultValue: [
    {
      dataIndex: 'hostname',
      sort: 'in',
      value: ['host', '1234', 'abc'],
    },
    {
      dataIndex: 'server_type',
      sort: 'in',
      value: ['phy'],
    },
    {
      dataIndex: 'last_update',
      sort: 'in',
      value: [moment('2021-08-01 18:01:44'), moment('2021-08-01 18:01:44')],
    },
  ],
};
