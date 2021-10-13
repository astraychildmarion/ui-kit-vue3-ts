<template>
  <div className="xy-table-pagination">
    <Pagination
      show-size-changer
      :current="page"
      :defaultPageSize="pageSize"
      :pageSizeOptions="['30', '50', '100']"
      :total="total"
      :showTotal="
        (total:number, range:string[]) => {
          return pageInfo(total, range);
        }
      "
      @change="onChangePage"
      @showSizeChange="OnShowSizeChange"
    >
      <template #buildOptionText="props"> {{ props.value }} / Page </template>
    </Pagination>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from "vue";
import { Pagination } from "ant-design-vue";

export default defineComponent({
  name: "XYPagination",
  components: { Pagination },
  props: {
    total: {
      type: Number,
      default: 100,
    },
    defaultCurrent: {
      type: Number,
      default: 1,
    },
    defaultPageSize: {
      type: Number,
      default: 30,
    },
  },
  setup(props, { emit }) {
    const page = ref<number>(1);
    const pageSize = ref<number>(30);
    const defaultCurrent = ref(props.defaultCurrent);
    const defaultPageSize = ref(props.defaultPageSize);
    const total = ref(props.total);

    const pageInfo = (totalPage: number, range: string[]) => `${range[0].toLocaleString()}-${range[1].toLocaleString()} of ${totalPage.toLocaleString()}`;
    const onChangePage = (pagenum: number, pagesize: number) => {
      page.value = pagenum;
      emit("changePage", { pagenum, pagesize });
    };
    const OnShowSizeChange = (current: number, size: number) => {
      const exceedTotalAmount = page.value * pageSize.value > total.value;
      if (exceedTotalAmount) {
        page.value = 1;
      }
      pageSize.value = size;
      emit("showSizeChange", size, exceedTotalAmount);
    };
    watchEffect((): void => {
      pageSize.value = defaultPageSize.value;
      page.value = defaultCurrent.value;
    });

    return {
      page,
      pageSize,
      pageInfo,
      onChangePage,
      OnShowSizeChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.xy-table-pagination {
  display: flex;
  flex-direction: row;
  color: $table-pagination-text-color;
  :deep .ant-pagination-item,
  :deep .ant-pagination-jump-next,
  :deep .ant-pagination-jump-prev {
    display: none;
  }
  :deep .ant-pagination-next,
  :deep .ant-pagination-prev {
    min-width: 24px;
    width: 24px;
    height: 24px;
  }
  :deep .ant-pagination-item-link {
    display: grid;
    justify-content: center;
    align-content: center;
  }
  :deep
    .ant-pagination-next:not(.ant-pagination-disabled):focus
    .ant-pagination-item-link,
  :deep
    .ant-pagination-prev:not(.ant-pagination-disabled):focus
    .ant-pagination-item-link,
  :deep
    .ant-pagination-next:not(.ant-pagination-disabled):hover
    .ant-pagination-item-link,
  :deep
    .ant-pagination-prev:not(.ant-pagination-disabled):hover
    .ant-pagination-item-link,
  :deep .ant-select-selection:hover .ant-select-arrow,
  :deep .ant-select-selection:active .ant-select-arrow,
  :deep .ant-select-selection:focus .ant-select-arrow,
  :deep .ant-select-open .ant-select-selection .ant-select-arrow,
  :deep .ant-select-focused .ant-select-selection .ant-select-arrow {
    transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  :deep .ant-select-selection-item {
    line-height: 22px;
    height: 24px;
  }
  :deep .ant-select-selector-selected-value,
  :deep .ant-select-selector__rendered,
  :deep .ant-select-selector {
    line-height: 22px;
    height: 24px;
  }
  :deep .ant-pagination-options {
    margin-left: 4px;
  }
  :deep .ant-pagination-prev {
    margin-right: 4px;
    margin-left: 5px;
  }
  :deep .ant-select-arrow {
    transform: translate(4px, 1.6px);
  }
  &__page-info {
    line-height: 24px;
  }
}
</style>
