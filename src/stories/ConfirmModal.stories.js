import ConfirmModal from '../components/ConfirmModal.vue';

export default {
  title: 'UI-KIT/ConfirmModal',
  component: ConfirmModal,
  argTypes: {
    confirmType: {
      options: ['warning', 'error', 'info', 'success'],
      control: { type: 'select' },
    },
    onClickConfirm: {
      action: 'click',
      description: 'Event name is "clickConfirm".',
    },
    onClickCancel: {
      action: 'click',
      description: 'Event name is "clickCancel".',
    },
    cancelButtonText: {
      type: String,
      description: 'Text to show on button, default is Cancel.',
    },
    confirmButtonText: {
      type: String,
      description: 'Text to show on button, default is Confirm',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ConfirmModal },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <ConfirmModal v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  isShow: false,
  confirmType: 'error',
  title: 'message title',
  content: 'message content,message content, message content, message content',
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
};
