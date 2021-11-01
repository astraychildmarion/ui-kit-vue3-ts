import ActionButton from '../components/ActionButton.vue';

export default {
  title: 'UI-KIT/ActionButton',
  component: ActionButton,
  argTypes: {
    actionOption: {
      description: "Data to render Action's items.",
      type: 'array',
    },
    isTableCheckbox: {
      description:
        "A boolean to control the tooltip. True means table's checkboxes had been checked and user can choose actions.",
      type: 'boolean',
    },
    isSameOS: {
      description:
        'A boolean to control the tooltip. True means user choose multiple VM with same OS, so it is ok to resize.',
      type: 'boolean',
    },
    onClickAction: {
      action: 'click',
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
  <ActionButton v-bind="args" ></ActionButton>
  `,
});

export const Default = Template.bind({});
Default.args = {
  actionOption: [
    { title: 'Resize', disabled: true },
    { title: 'Create from', disabled: false },
    { title: 'Rollback', disabled: false },
    { title: 'Decom', disabled: false },
  ],
  isTableCheckbox: true,
  isSameOS: true,
  actionType: 'serverlist',
};
