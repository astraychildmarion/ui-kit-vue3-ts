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
        "Props data for Customize display component 's checkboxOption. You can see XYCustomizeDisplay for more info.",
    },
    customizeDisplayDefaultSelected: {
      type: 'array',
      description:
        "Props data for Customize display component 's defaultSelected. You can see XYCustomizeDisplay for more info.",
    },
    filterOption: {
      type: 'object',
      description:
        'Props data for Filter component in Object format.<br>The object include 1 attrubute: filterOption, please see XYFilter for more info.',
    },
    exportExcelOption: {
      type: 'object',
      description:
        'Props data for Dropdown icon button component in Object format.<br>The object include 3 attributes: buttontext, icon, loading. For more info pls see XYDropdownIconButton.',
    },
    tablePageSetting: {
      type: 'object',
      description:
        'Props data for Table paginition component in Object format.<br>The object include 3 attributes: total, defaultCurrent, defaultPageSize. For more info pls see XYTablePaginition.',
    },
    onFilterChange: {
      action: 'filterChange',
      description: "Callback when filter changes. Refering to XYFilter's event.",
    },
    onClickAction: {
      action: 'clickAction',
      description: "Callback when filter changes. Refering to XYFilter's event.",
    },
    onClickExport: {
      action: 'clickExport',
      description: "Callback when dropdown changes. Refering to XYDropdownIconButton's event.",
    },
    onChangePage: {
      action: 'changePage',
      description: 'Callback when page changes. Refering to XYTablePaginition event.',
    },
    onShowSizeChange: {
      action: 'showSizeChange',
      description:
        'A callback function, executed when the quantity of displayed data per page is changed, and it takes the resulting page number and pageSize as its arguments',
    },
    onClickCustomizeConfirm: {
      action: 'clickCustomizeConfirm',
      description:
        'A callback function, executed when clicked confirm. Throw back an array of selected item.',
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
  filterOption: [...filter.Default.args.filterOption],
  filterDefaultValue: filter.Default.args.filterDefaultValue,
  actionOption: actionButton.Default.args.actionOption,
  isTableCheckbox: actionButton.Default.args.isTableCheckbox,
  tablePageSetting: {
    total: tablePager.Default.args.total,
    defaultPageSize: tablePager.Default.args.defaultPageSize,
  },
  tablePageSettingDefaultCurrent: tablePager.Default.args.defaultCurrent,
};
