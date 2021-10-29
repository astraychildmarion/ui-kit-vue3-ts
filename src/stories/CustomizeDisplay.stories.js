import CustomizeDisplay from '../components/CustomizeDisplay.vue';

export default {
  title: 'UI-KIT/CustomizeDisplay',
  component: CustomizeDisplay,
  argTypes: {
    onClickCustomizeConfirm: {
      action: 'clickCustomizeConfirm',
      description:
        'Event name is `clickCustomizeConfirm`. A custom event triggered after click confirm. Pass selected checkboxes as argument. Please remember to close the modal by yourself.',
    },
    itemOption: {
      description:
        'data to render Select Item. It is an Array includes objects. Each object has label and value 2 attributes.',
    },
    defaultSelected: {
      description:
        "Array to set default selected item. It is an Array including selectOption's value attribute.<br> For example: `['bu', 'disk_partition]`",
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { CustomizeDisplay },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <CustomizeDisplay v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  visible: false,
  itemOption: [
    {
      label: 'ServiceLan IP',
      value: 'service_lan_ip',
    },
    {
      label: 'BU',
      value: 'bu',
    },
    {
      label: 'Hostname',
      value: 'host',
    },
    {
      label: 'CPU',
      value: 'cpu',
    },
    {
      label: 'RAM (GB)',
      value: 'ram',
    },

    {
      label: 'BU Application Name',
      value: 'bu_application_name',
    },
    {
      label: 'VM Status',
      value: 'vm_status',
    },
    {
      label: 'LTM Status',
      value: 'ltm_status',
    },
    {
      label: 'Disk (GB)',
      value: 'disk',
    },
    {
      label: 'Disk Partition',
      value: 'disk_partition',
    },
    {
      label: 'OS',
      value: 'os',
    },
    {
      label: 'Last Update',
      value: 'last_update',
    },
    {
      label: 'Layer',
      value: 'layer',
    },
    {
      label: 'Type',
      value: 'type',
    },
    {
      label: 'Shared with',
      value: 'shared_with',
    },
    {
      label: 'Environment',
      value: 'environment',
    },
  ],
  defaultSelected: [
    {
      label: 'ServiceLan IP',
      value: 'service_lan_ip',
      fixed: true,
    },
    {
      label: 'BU',
      value: 'bu',
      fixed: false,
    },
    {
      label: 'Hostname',
      value: 'host',
      fixed: false,
    },
    {
      label: 'CPU',
      value: 'cpu',
      fixed: false,
    },
    {
      label: 'RAM (GB)',
      value: 'ram',
      fixed: false,
    },
    {
      label: 'BU Application Name',
      value: 'bu_application_name',
      fixed: false,
    },
    {
      label: 'VM Status',
      value: 'vm_status',
      fixed: false,
    },
    {
      label: 'LTM Status',
      value: 'ltm_status',
      fixed: false,
    },
  ],
};
