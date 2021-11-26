import AlertMsg from '../components/AlertMsg.vue';

export default {
  title: 'UI-KIT/AlertMsg',
  component: AlertMsg,
  argTypes: {
    alertType: {
      options: ['success', 'error'],
      control: { type: 'select' },
    },
    seconds: {
      description: 'To set seconds till Alert disappear. Default is 3.',
      type: 'number',
    },
    isShow: {
      description: '`iShow(v-model)` The alert is show or not.',
      control: 'boolean',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AlertMsg },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <AlertMsg v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  isShow: false,
  alertMsg: 'alert message',
  alertType: 'success',
  seconds: 3,
};
