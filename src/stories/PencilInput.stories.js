import PencilInput from '../components/Pencil.vue';

export default {
  title: 'UI-KIT/PencilInput',
  component: PencilInput,
  argTypes: {
    text: {
      type: String,
      description: "The server's name.",
    },
    onPressEnter: {
      action: 'pressEnter',
      description: "Trigger when user press enter and sent the input's value.",
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { PencilInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <PencilInput v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  text: 'BU___002',
};
