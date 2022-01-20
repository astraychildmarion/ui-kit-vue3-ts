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
    <p>You can use alert by api method. </p>
    <pre>
    import { XYAlertMsgApi } from '@xycloud/xycloud-ui-kit-2';
    AlertMsgApi({
      alertMsg: 'a message to show',
      alertType: 'error',
    });
    </pre>
      <AlertMsg v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  alertMsg: 'alert message',
  alertType: 'success',
  seconds: 3,
};
