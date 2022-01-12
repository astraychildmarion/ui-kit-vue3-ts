import Toolbar from '../components/Toolbar.vue';
import * as customizeDisplay from './CustomizeDisplay.stories';
import * as filter from './Filter.stories';
import * as actionButton from './ActionButton.stories';
import * as tablePager from './Pagination.stories';
import { csFilterSelectorMap, csFilterInputFormat } from '../components/filterSelectorMapCS';

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
    customizeUserSelected: {
      type: 'array',
      description:
        "Props data for Customize display component 's userSelected. You can see CustomizeDisplay for more info.",
    },
    filterDropdownOption: {
      type: 'object',
      description: "Filter's field dropdown option data.",
    },
    filterSelectorFormat: {
      description: 'To bind field to datatype, default is CS version.',
    },
    filterSelector: {
      description: 'To set filter selectors, default is CS version.',
    },
    filterRangePickerFormat: {
      description: 'range picker data type',
      options: ['MMM/DD/YYYY', 'YYYY/MM/DD'],
      control: { type: 'select' },
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
    noCheckboxText: {
      default: 'One or more items from server list must be selected.',
      type: 'string',
    },
    tablePageSettingDefaultCurrent: {
      type: 'string',
      description: 'Default page number.',
    },
    isExportLoading: {
      type: 'boolean',
      description: 'Set the loading status of export excel button. Default is false.',
    },
    isShowActionButton: {
      type: 'boolean',
      description: 'To hide or show action button. Default is true.',
    },
    isShowCustomizeDisplay: {
      type: 'boolean',
      description: 'To hide or show customize display. Default is true.',
    },
    isShowExportButton: {
      type: 'boolean',
      description: 'To hide or show export button. Default is true.',
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
  customizeUserSelected: customizeDisplay.Default.args.userSelected,
  filterDropdownOption: filter.Default.args.dropdownOption,
  filterDefaultValue: filter.Default.args.filterDefaultValue,
  actionOption: actionButton.Default.args.actionOption,
  isTableCheckbox: actionButton.Default.args.isTableCheckbox,
  tablePageSetting: {
    total: tablePager.Default.args.total,
    defaultPageSize: tablePager.Default.args.defaultPageSize,
  },
  isExportLoading: false,
  isShowActionButton: true,
  isShowCustomizeDisplay: true,
  isShowExportButton: true,
  tablePageSettingDefaultCurrent: tablePager.Default.args.defaultCurrent,
  filterSelector: csFilterSelectorMap,
  filterSelectorFormat: csFilterInputFormat,
  noCheckboxText: 'You can customize the text when no checkbox.',
};
