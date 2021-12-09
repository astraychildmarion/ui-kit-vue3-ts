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
      control: 'array',
      description:
        'data to render Select Item. It is an Array includes objects. Each object has label and value 2 attributes.',
    },
    defaultSelected: {
      control: 'array',
      description: 'Array to set default 8 selected items.',
    },
    userSelected: {
      control: 'array',
      description: "Array to set user's selected item.",
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
      value: 'hostname',
    },
    {
      label: 'CPU',
      value: 'cpu',
    },
    {
      label: 'RAM (GB)',
      value: 'ram_gb',
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
      value: 'disk_capacity_gb',
    },
    {
      label: 'Disk Partition',
      value: 'diskPartitionInlineText',
    },
    {
      label: 'OS',
      value: 'os',
    },
    {
      label: 'Last Update',
      value: 'lastUpdateFormatted',
    },
    {
      label: 'Layer',
      value: 'layer',
    },
    {
      label: 'Type',
      value: 'server_type',
    },
    {
      label: 'Shared with',
      value: 'shared_with',
    },
    {
      label: 'Environment',
      value: 'env',
    },
    {
      label: 'iLo',
      value: 'ilo',
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
      value: 'hostname',
      fixed: false,
    },
    {
      label: 'CPU',
      value: 'cpu',
      fixed: false,
    },
    {
      label: 'RAM (GB)',
      value: 'ram_gb',
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
  userSelected: [
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
      value: 'hostname',
      fixed: false,
    },
    {
      label: 'RAM (GB)',
      value: 'ram_gb',
      fixed: false,
    },
  ],
};
