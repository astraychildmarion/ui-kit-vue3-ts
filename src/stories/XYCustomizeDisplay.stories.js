import XYCustomizeDisplay from '../components/XYCustomizeDisplay.vue';

export default {
  title: 'UI-KIT/XYCustomizeDisplay',
  component: XYCustomizeDisplay,
  argTypes: {
    clickCustomizeConfirm: {
      action: 'clickCustomizeConfirm',
      description:
        'A custom event triggered after click confirm. Pass selected checkboxes as argument. Please remember to close the modal by yourself.',
    },
    ItemOption: {
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
  components: { XYCustomizeDisplay },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <XYCustomizeDisplay v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  visible: false,
  ItemOption: [
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
