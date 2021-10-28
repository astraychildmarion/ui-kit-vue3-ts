<template>
  <div class="xy-toolbar__wrapper">
    <div class="xy-toolbar__left">
      <Space>
        <CustomizeDisplay
          :itemOption="customizeDisplayCheckboxOption"
          :defaultSelected="customizeDisplayDefaultSelected"
          @clickCustomizeConfirm="clickCustomizeConfirm"
        />
        <Filter
          :filterOption="filterOption"
          :filterDefaultValue="filterDefaultValue"
          @filterChange="filterChange"
        />
        <ActionButton
          :actionOption="actionOption"
          :isTableCheckbox="isTableCheckbox"
          @clickAction="clickAction"
        />
      </Space>
    </div>
    <div class="xy-toolbar__right">
      <Space size="large">
        <ExportExcelButton
          :exportExcelOption="exportExcelOption"
          @clickExport="clickExport"
          :isLoading="isExportLoading"
        />
        <XYPagination
          :total="tablePageSetting.total"
          :defaultCurrent="tablePageSettingDefaultCurrent"
          :defaultPageSize="tablePageSetting.dafaultPageSize"
          @changePage="changePage"
          @showSizeChange="showSizeChange"
        />
      </Space>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Space } from 'ant-design-vue';
import Filter from './Filter.vue';
import ActionButton from './ActionButton.vue';
import ExportExcelButton from './ExportExcelButton.vue';
import XYPagination from './Pagination.vue';
import CustomizeDisplay from './CustomizeDisplay.vue';

import {
  ActionOptionType,
  CustomizeDisplayItemOptType,
  ExportExcelDropdownData,
  FilterOption,
  FilterDefaultValue,
} from './interface';

export default defineComponent({
  name: 'Toolbar',
  components: { Filter, ActionButton, ExportExcelButton, XYPagination, CustomizeDisplay, Space },
  emits: [
    'clickExport',
    'filterChange',
    'changePage',
    'showSizeChange',
    'clickAction',
    'clickCustomizeConfirm',
  ],
  props: {
    customizeDisplayCheckboxOption: {
      required: true,
      type: Array as PropType<CustomizeDisplayItemOptType[]>,
    },
    customizeDisplayDefaultSelected: {
      type: Array,
    },
    filterOption: {
      required: true,
      type: Array as PropType<FilterOption[]>,
    },
    filterDefaultValue: {
      type: Array as PropType<FilterDefaultValue[]>,
    },
    actionOption: {
      required: true,
      type: Array as PropType<ActionOptionType[]>,
    },
    exportExcelOption: {
      required: true,
      type: Array as PropType<ExportExcelDropdownData[]>,
    },
    isTableCheckbox: {
      type: Boolean,
      default: false,
      required: true,
    },
    isExportLoading: {
      type: Boolean,
      default: false,
    },
    tablePageSetting: {
      type: Object,
      required: true,
    },
    tablePageSettingDefaultCurrent: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    function changePage(data: object) {
      console.log('change page', data);
      emit('changePage', data);
    }
    function showSizeChange(...pageSize: [number, boolean]) {
      console.log('show size change', ...pageSize);
      emit('showSizeChange', ...pageSize);
    }
    function clickExport(data: string) {
      console.log('click export', data);
      emit('clickExport', data);
    }
    function filterChange(data: object) {
      console.log('filter change', data);
      emit('filterChange', data);
    }
    function clickAction(data: string) {
      console.log('click action', data);
      emit('clickAction', data);
    }
    function clickCustomizeConfirm(data: object[]) {
      console.log('click action', data);
      emit('clickCustomizeConfirm', data);
    }
    return {
      changePage,
      showSizeChange,
      clickExport,
      filterChange,
      clickAction,
      clickCustomizeConfirm,
    };
  },
});
</script>
<style lang="scss" scoped>
.xy-toolbar {
  &__wrapper {
    display: flex;
    justify-content: space-between;
  }
}
</style>
