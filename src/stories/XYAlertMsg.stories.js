import XYAlertMsg from '../components/XYAlertMsg.vue';

export default {
  title: 'UI-KIT/XYAlertMsg',
  component: XYAlertMsg,
  argTypes: {
    alertType: {
      options: ['success', 'error'],
      control: { type: 'select' },
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { XYAlertMsg },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <XYAlertMsg v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  isShow: false,
  alertMsg: 'alert message',
  alertType: 'success',
};
