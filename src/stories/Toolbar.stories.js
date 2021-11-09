import Toolbar from '../components/Toolbar.vue';
import * as customizeDisplay from './CustomizeDisplay.stories';
import * as filter from './Filter.stories';
import * as actionButton from './ActionButton.stories';
import * as tablePager from './Pagination.stories';

export default {
  title: 'UI-Kit/Toolbar',
  component: Toolbar,
  parameter: {
    docs: {
      description: {
        component:
          'A multi-funciton component mixed with customize display, filter, day button, range-picker, paginition, download excel button and a slot button for decom, restore...',
      },
    },
  },
  argTypes: {
    customizeDisplayCheckboxOption: {
      type: 'array',
      description:
        "Props data for Customize display component 's checkboxOption. You can see CustomizeDisplay for more info.",
    },
    customizeDisplayDefaultSelected: {
      type: 'array',
      description:
        "Props data for Customize display component 's defaultSelected. You can see CustomizeDisplay for more info.",
    },
    filterDropdownOption: {
      type: 'object',
      description: "Filter's field dropdown option data.",
    },
    exportExcelOption: {
      type: 'object',
      description:
        'Props data for ExportExcelOption in Object format.For more info pls see ExportExcelOption.',
    },
    tablePageSetting: {
      type: 'object',
      description:
        'Props data for Paginition component in Object format.<br>The object include 2 attributes: total, defaultPageSize. For more info pls see Paginition.',
    },
    tablePageSettingDefaultCurrent: {
      type: 'string',
      description: 'Default page number.',
    },
    isExportLoading: {
      type: 'boolean',
      description: 'Set the loading status of button. Default is false.',
    },
    onFilterChange: {
      action: 'filterChange',
      description:
        "Event name is `filterChange`. Callback when filter changes. Refering to Filter's event.",
    },
    onClickAction: {
      action: 'clickAction',
      description:
        "Event name is `clickAction`. Callback when filter changes. Refering to Action's event.",
    },
    onClickExport: {
      action: 'clickExport',
      description:
        "Event name is `clickExport`. Callback when click. Refering to ExportButton's event.",
    },
    onChangePage: {
      action: 'changePage',
      description:
        "Event name is `changePage`. Callback when page changes. Refering to Paginition's event.",
    },
    onShowSizeChange: {
      action: 'showSizeChange',
      description:
        'Event name is `showSizeChange`. A callback function, executed when the quantity of displayed data per page is changed, and it takes the resulting page number and pageSize as its arguments',
    },
    onClickCustomizeConfirm: {
      action: 'clickCustomizeConfirm',
      description:
        'Event name is `clickCustomizeConfirm`. A callback function, executed when clicked confirm. Throw back an array of selected item.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Toolbar },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<toolbar v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  customizeDisplayCheckboxOption: customizeDisplay.Default.args.itemOption,
  customizeDisplayDefaultSelected: customizeDisplay.Default.args.defaultSelected,
  filterDropdownOption: filter.Default.args.dropdownOption,
  filterDefaultValue: filter.Default.args.filterDefaultValue,
  actionOption: actionButton.Default.args.actionOption,
  isTableCheckbox: actionButton.Default.args.isTableCheckbox,
  tablePageSetting: {
    total: tablePager.Default.args.total,
    defaultPageSize: tablePager.Default.args.defaultPageSize,
  },
  isExportLoading: false,
  tablePageSettingDefaultCurrent: tablePager.Default.args.defaultCurrent,
};
