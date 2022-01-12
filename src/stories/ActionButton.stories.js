import ActionButton from '../components/ActionButton.vue';

export default {
  title: 'UI-KIT/ActionButton',
  component: ActionButton,
  argTypes: {
    actionOption: {
      description:
        "Data to render Action's items. `disabled` decide it is clickable, `tooltipShow` decide whether to show tooltip, `tooltipText` is the tooltip text.",
      type: 'array',
    },
    isToolbar: {
      description:
        "An inner setting to saparate toolbar complex component and simple display. Basically you don't need to handle this.",
      type: 'boolean',
    },
    isTableCheckbox: {
      description:
        "A boolean to control the tooltip. `True` means table's checkboxes had been checked and user can choose actions.",
      type: 'boolean',
    },
    onClickAction: {
      action: 'clickAction',
      description: 'Event name is "clickAction". Click Action\'s menu and return title.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ActionButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <div style="margin: 20px 0 0 300px"><ActionButton v-bind="args" ></ActionButton></div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  actionOption: [
    {
      title: 'Resize',
      disabled: true,
      tooltipShow: true,
      tooltipText: 'Batch resize only support the same OS. ',
    },
    {
      title: 'Create from',
      disabled: true,
      tooltipShow: true,
      tooltipText: 'Only support single source VM selection ',
    },
    { title: 'Rollback', disabled: false, tooltipShow: false, tooltipText: '' },
    { title: 'Decom', disabled: false, tooltipShow: false, tooltipText: '' },
  ],
  isTableCheckbox: true,
  isToolbar: false,
};
