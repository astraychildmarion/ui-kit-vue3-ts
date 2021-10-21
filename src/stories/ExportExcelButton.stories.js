import ExportExcelButton from '../components/ExportExcelButton.vue';

export default {
  title: 'UI-KIT/ExportExcelButton',
  component: ExportExcelButton,
  argTypes: {
    onClickExport: {
      action: 'clickExport',
      description: "Event name is `clickExport`. Throw back click menu's value.",
    },
    isLoading: {
      type: 'Boolean',
      description: 'Set the loading status of button. Default is false.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { ExportExcelButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <ExportExcelButton v-bind="args" ></ExportExcelButton>
  `,
});

export const Default = Template.bind({});
Default.args = {};
