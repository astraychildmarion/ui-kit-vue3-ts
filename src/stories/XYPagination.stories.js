import XYPagination from '../components/XYPagination.vue';

export default {
  title: 'UI-KIT/XYPagination',
  component: XYPagination,
  argTypes: {
    total: {
      type: 'number',
      description: 'Qualtity of data',
    },
    defaultCurrent: {
      type: 'number',
      description: 'Default initial page number',
    },
    defaultPageSize: {
      type: 'number',
      description: 'Default number of data displayed per page',
    },
    onChangePage: {
      action: 'changePage',
      description:
        'A callback function, executed when the pages changed, and it takes the resulting page number and pageSize as its arguments',
    },
    onShowSizeChange: {
      action: 'showSizeChange',
      description:
        'A callback function, executed when the quantity of displayed data per page is changed, and it takes the resulting page number and pageSize as its arguments',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { XYPagination },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
      <div style="padding: 1rem">
      <XYPagination v-bind="args" />
      </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  total: 35780,
  defaultCurrent: 10000,
  defaultPageSize: 30,
};
