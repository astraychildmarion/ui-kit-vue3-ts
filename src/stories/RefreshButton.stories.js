import RefreshButton from '../components/RefreshButton.vue';

export default {
  title: 'UI-KIT/RefreshButton',
  component: RefreshButton,
  argTypes: {
    onClickRefresh: {
      action: 'clickRefresh',
      description: 'Event name is "clickRefresh".',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { RefreshButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <RefreshButton v-bind="args" ></RefreshButton>
  `,
});

export const Default = Template.bind({});
Default.args = {};
