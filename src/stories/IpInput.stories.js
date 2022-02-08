import IpInput from '../components/IpInput.vue';

export default {
  title: 'UI-KIT/IpInput',
  component: IpInput,
  argTypes: {
    defaultIp: {
      control: 'text',
      description:
        'Given a default value. The Ip form is string: "xxxx.xxx.xxx.xxxx", each value must between 0 ~ 255.',
    },
    showValidation: {
      control: 'boolean',
      description: 'To show validation text. Default is false.',
    },
    validationText: {
      control: 'text',
      description: 'Validation text to display.',
    },
    onChangeIp: {
      action: 'changeIp',
      description:
        'Event name is changeIp. When 4 inputs are filled, the event would be trigger. You can receieve an Ip string.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { IpInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <IpInput v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  defaultIp: '123.34.56.4',
  showValidation: false,
  validationText: 'Please fill Ip.',
};
