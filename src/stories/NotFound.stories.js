import NotFound from '../components/NotFound.vue';

export default {
  title: 'UI-KIT/NotFound',
  component: NotFound,
  argTypes: {
    buttonText: {
      description: 'To set button text. Default is "Back to home".',
      type: 'string',
    },
    onClick: {
      action: 'clickBtn',
      description: 'Event name is `clickBtn`. No parameter emitted.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { NotFound },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <NotFound v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  buttonText: 'Back to home',
};
