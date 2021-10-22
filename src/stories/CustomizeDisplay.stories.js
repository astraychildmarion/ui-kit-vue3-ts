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
      label: 'BU',
      value: 'bu',
    },
    {
      label: 'Zone',
      value: 'zone',
    },
    {
      label: 'Environment',
      value: 'env',
    },
    {
      label: 'Hostname',
      value: 'host',
    },
    {
      label: 'Type',
      value: 'type',
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
      label: 'Decom date',
      value: 'decom_date',
    },
    {
      label: 'Disk Partition2',
      value: 'disk_partition2',
    },
    {
      label: 'OS2',
      value: 'os2',
    },
    {
      label: 'Decom date2',
      value: 'decom_date2',
    },
  ],
  defaultSelected: [
    {
      label: 'BU',
      value: 'bu',
    },
    {
      label: 'Hostname',
      value: 'host',
    },
    {
      label: 'Type',
      value: 'type',
    },
    {
      label: 'Zone',
      value: 'zone',
    },
    {
      label: 'OS',
      value: 'os',
    },
    {
      label: 'Decom date',
      value: 'decom_date',
    },
  ],
};
