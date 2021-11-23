<template>
  <div class="xy-toolbar__wrapper">
    <div class="xy-toolbar__left">
      <Space>
        <CustomizeDisplay
          :itemOption="customizeDisplayCheckboxOption"
          :defaultSelected="customizeDisplayDefaultSelected"
          :userSelected="customizeUserSelected"
          @clickCustomizeConfirm="clickCustomizeConfirm"
        />
        <Filter
          :dropdownOption="filterDropdownOption"
          :filterDefaultValue="filterDefaultValue"
          @filterChange="filterChange"
        />
        <ActionButton
          :isToolbar="true"
          :actionOption="actionOption"
          :isTableCheckbox="isTableCheckbox"
          @clickAction="clickAction"
        />
      </Space>
    </div>
    <div class="xy-toolbar__right">
      <Space size="large">
        <ExportButton
          :exportExcelOption="exportExcelOption"
          @clickExport="clickExport"
          :loading="isExportLoading"
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
import { defineComponent, PropType, ref, watch } from 'vue';
import { Space } from 'ant-design-vue';
import Filter from './Filter.vue';
import ActionButton from './ActionButton.vue';
import ExportButton from './ExportButton.vue';
import XYPagination from './Pagination.vue';
import CustomizeDisplay from './CustomizeDisplay.vue';

import {
  ActionOptionType,
  CustomizeDisplayItemOptType,
  ExportExcelDropdownData,
  DropdownOption,
  FilterDefaultValue,
} from './interface';

export default defineComponent({
  name: 'Toolbar',
  components: { Filter, ActionButton, ExportButton, XYPagination, CustomizeDisplay, Space },
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
      required: true,
      type: Array,
    },
    customizeUserSelected: {
      required: true,
      type: Array,
    },
    filterDropdownOption: {
      required: true,
      type: Array as PropType<DropdownOption[]>,
    },
    filterDefaultValue: {
      type: Array as PropType<FilterDefaultValue[]>,
    },
    actionOption: {
      required: true,
      type: Array as PropType<ActionOptionType[]>,
    },
    exportExcelOption: {
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
    const propsIsExportLoading = ref<boolean>(props.isExportLoading);
    function changePage(data: object) {
      emit('changePage', data);
    }
    function showSizeChange(...pageSize: [number, number]) {
      emit('showSizeChange', ...pageSize);
    }
    function clickExport(data: string) {
      emit('clickExport', data);
    }
    function filterChange(data: object) {
      emit('filterChange', data);
    }
    function clickAction(data: string) {
      emit('clickAction', data);
    }
    function clickCustomizeConfirm(data: object[]) {
      emit('clickCustomizeConfirm', data);
    }
    watch(
      () => props.isExportLoading,
      (NewVal) => {
        if (NewVal) {
          propsIsExportLoading.value = NewVal;
        }
      },
      { deep: true },
    );
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
