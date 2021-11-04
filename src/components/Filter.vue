<template>
  <Dropdown
    v-model:visible="visible"
    overlayClassName="xy-filter"
    :class="{ 'xy-filter--active': active }"
    :trigger="['click']"
    :overlayStyle="{ zIndex: 998 }"
  >
    <Button
      className="xy-filter__button"
      @click="
				(e: any) => {
					e.preventDefault;
				}
			"
    >
      <template #icon>
        <CheckCircleOutlined v-if="active" />
        <FilterOutlined v-else />
      </template>
      <span className="xy-filter--media-query">Filter</span>
    </Button>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <div className="xy-filter__wrapper">
          <div className="xy-filter__title">
            {{ titleText }}
            <Button @click="handlerClean" type="link" class="xy-filter__title__button"
              >Clean all</Button
            >
          </div>
          <div className="xy-filter__body">
            <p v-show="filterItems.length < 1">
              Please click "Add a filter" to start, user may use multiple filters to get specific
              results.
            </p>
            <Form ref="formRef">
              <FormItem
                v-for="(filterItem, index) in filterItems"
                :key="index"
                class="xy-filter__body-item"
              >
                <Select
                  v-model:value="filterItem.dataIndex"
                  class="xy-filter__body-item-select"
                  @change="changeFilterSelector(filterItem.dataIndex)"
                >
                  <Option
                    v-for="(option, optionIndex) in filterOption"
                    :key="optionIndex"
                    :value="option.dataIndex"
                    :disabled="
                      filterItems.some((filterItem) => filterItem.dataIndex === option.dataIndex)
                    "
                    >{{ option.title }}</Option
                  >
                </Select>
                <Select
                  v-if="checkOptionType(filterItem.dataIndex) !== 'date'"
                  v-model:value="filterItem.sort"
                  class="xy-filter__body-item-select filter__sort"
                  @change="debounceFilterEmit"
                  :disabled="checkSortDisable(filterItem.dataIndex)"
                >
                  <Option v-for="sort in filterSort" :key="sort.value" :value="sort.value">{{
                    sort.title
                  }}</Option>
                </Select>
                <template v-if="checkOptionType(filterItem.dataIndex) === 'dropdown'">
                  <Select
                    v-model:value="filterItem.value"
                    mode="multiple"
                    @change="debounceFilterEmit"
                    class="xy-filter__body-item-select-sub"
                  >
                    <Option
                      v-for="subOption in getSuboption(filterItem.dataIndex)"
                      :key="subOption.dataIndex"
                      :value="subOption.dataIndex"
                      >{{ subOption.title }}</Option
                    >
                  </Select>
                </template>
                <template v-if="checkOptionType(filterItem.dataIndex) === 'date'">
                  <RangePicker
                    :disabled-date="disabledDate"
                    v-model:value="rangeValue"
                    format="MM-DD-YYYY"
                    @change="handlerGetRange"
                  />
                </template>
                <template v-if="checkOptionType(filterItem.dataIndex) === undefined">
                  <Input
                    class="xy-filter__body-item-input"
                    placeholder="Value"
                    v-model:value="filterItem.value"
                    @change="debounceFilterEmit"
                    :key="filterItem.dataIndex"
                  />
                </template>
                <Button class="xy-filter__body-item-button" @click="deleteFilter(index)">
                  <template #icon>
                    <DeleteOutlined />
                  </template>
                </Button>
              </FormItem>

              <Button
                :class="{ 'button-right': filterItems.length < 1 }"
                class="xy-filter__body-plus-button"
                :disabled="addFilterBtnDisabled"
                @click="addFilter"
              >
                <template #icon>
                  <PlusOutlined />
                </template>
                Add a filter
              </Button>
            </Form>
          </div>
        </div>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
import { PropType, defineComponent, reactive, ref, watchEffect, computed } from 'vue';
import { Button, Dropdown, Select, Input, Form, DatePicker, Menu } from 'ant-design-vue';
import {
  CheckCircleOutlined,
  FilterOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';
/* eslint-disable import/no-extraneous-dependencies */
import moment, { Moment } from 'moment';
import debounce from 'lodash/debounce';
import { FilterDefaultValue, FilterOption, FilterTemplate } from './interface';

export default defineComponent({
  name: 'XYFilter',
  props: {
    filterOption: {
      type: Array as PropType<FilterOption[]>,
      required: true,
    },
    filterDefaultValue: {
      type: Array as PropType<FilterDefaultValue[]>,
    },
  },
  emits: ['filterChange'],
  setup(props, { emit }) {
    const visible = ref(false);
    const rangeValue = ref<[]>([]);
    let filterItems = reactive([]) as Array<FilterDefaultValue>;
    const addFilter = () => {
      // e.preventDefault();
      const filterTemplate: FilterTemplate = {
        dataIndex: '',
        value: '',
        sort: 'contains',
      };
      filterItems.push({ ...filterTemplate });
    };
    const checkOptionType = (dataIndex: string) => {
      const result = props.filterOption.find(
        (item) => item.dataIndex === dataIndex && item?.type !== undefined,
      );
      return result?.type;
    };
    const checkSortDisable = (dataIndex: string) => {
      const type = checkOptionType(dataIndex);
      filterItems.forEach((item: FilterDefaultValue) => {
        // eslint-disable-next-line no-param-reassign
        if (item.dataIndex === dataIndex && type !== undefined) item.sort = 'in';
      });
      return type !== undefined;
    };
    /* eslint-disable */
    const debounceFilterEmit = debounce(function () {
      // check data sort
      // sort is IN coerece to array
      // sort is Contains coerece to string
      const editFilterItems = filterItems.map(item => {
        if (item.sort === 'contains' && typeof item.value === 'string') {
          return item
        } else if (item.sort === 'contains' && typeof item.value !== 'string') {
          item.value = String(item.value)
          return item
        } else if (item.sort === 'in' && Array.isArray(item.value)) {
          return item
        } else if (item.sort === 'in' && !Array.isArray(item.value)) {
          item.value = item.value.split(',')
          return item
        } else {
          console.log('WEIRED!', item);
        }
      })
      emit('filterChange', editFilterItems);
    }, 500);
    const checkDataType = (dataIndex: string) => {
      const result = props.filterOption.find(
        (item) => item.dataIndex === dataIndex && item?.type !== undefined,
      );
      return result?.type;
    };
    // clean value input when selector changed
    const changeFilterSelector = (dataIndex: string): void => {
      filterItems.forEach((item: FilterDefaultValue) => {
        // eslint-disable-next-line no-param-reassign
        if (item.dataIndex === dataIndex) {
          if (checkDataType(dataIndex) === 'dropdown' || checkDataType(dataIndex) === 'date') {
            item.value = [];
          } else {
            item.value = '';
          }
        }
      });
      debounceFilterEmit();
    };
    const deleteFilter = (index: number): void => {
      const name = filterItems[index]['dataIndex'];
      const type = checkDataType(name);
      if (type === 'date') rangeValue.value = [];
      filterItems.splice(index, 1);
      // emit('filterChange', filterItems);
      debounceFilterEmit();
    };
    const getSuboption = (dataIndex: string) => {
      const result = props.filterOption.find(
        (item) => item.dataIndex === dataIndex && item?.type !== undefined,
      );
      return result?.typeOption;
    };
    const handleMenuClick = () => {
      visible.value = true;
    };
    const handlerClean = () => {
      rangeValue.value = [];
      filterItems.splice(0, filterItems.length);
      // emit('filterChange', filterItems);
      debounceFilterEmit();
    };
    const hideFilterPopup = () => {
      visible.value = false;
    };
    const handlerGetRange = () => {
      filterItems.forEach((item) => {
        if (item.dataIndex === 'last_update') {
          item.value = rangeValue.value;
          item.sort = 'in';
        }
      });
      // emit('filterChange', filterItems);
      debounceFilterEmit();
    };
    // Can not select days after today
    const disabledDate = (current: Moment) => {
      return current && current > moment().endOf('day');
    };
    watchEffect(() => {
      if (props.filterDefaultValue && props.filterDefaultValue.length > 0) {
        filterItems = reactive(props.filterDefaultValue);
        // specially update range
        filterItems.forEach((item) => {
          if (item.dataIndex === 'last_update' || item.dataIndex === 'date') {
            rangeValue.value = item.value;
            item.sort = 'in';
          }
          if (item.sort === 'in' && checkOptionType(item.dataIndex) === undefined) {
            item.value = item.value.toString()
          }
        });
      }
    });

    const addFilterBtnDisabled = computed(() => {
      return filterItems.length >= props.filterOption.length;
    });
    const active = computed(() => {
      return filterItems.length > 0;
    });
    const titleText = computed(() => {
      const info = 'Introduction';
      const filter = 'Filter Value';
      return filterItems.length > 0 ? filter : info;
    });

    return {
      visible,
      filterItems,
      debounceFilterEmit,
      rangeValue,
      addFilterBtnDisabled,
      active,
      titleText,
      handleMenuClick,
      handlerClean,
      handlerGetRange,
      hideFilterPopup,
      addFilter,
      deleteFilter,
      disabledDate,
      changeFilterSelector,
      checkSortDisable,
      checkOptionType,
      getSuboption,
    };
  },
  components: {
    Button,
    Select,
    Option: Select.Option,
    Input,
    Dropdown,
    Form,
    FormItem: Form.Item,
    RangePicker: DatePicker.RangePicker,
    Menu,
    CheckCircleOutlined,
    FilterOutlined,
    PlusOutlined,
    DeleteOutlined,
  },
  data() {
    return {
      filterSort: [
        {
          title: 'Contains',
          value: 'contains',
        },
        {
          title: 'IN',
          value: 'in',
        },
      ],
    };
  },
  beforeMount() {
    window.addEventListener('resize', this.hideFilterPopup);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.hideFilterPopup);
  },
});
</script>
<style lang="scss" scoped>
menu.ant-dropdown-content {
  padding-inline-start: 0px;
  margin-block-start: 0;
}
.xy-filter {
  &--active {
    color: $filter-active-icon;
    border-color: $filter-active-icon;
    background-color: #fff;
  }
  &--media-query {
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  &__wrapper {
    box-shadow: $box-shadow;
    border-radius: $box-radius;
    border: $box-border;
    width: 530px;
    background-color: $filter-bg;
    :deep(.ant-select-selection-selected-value) {
      color: $filter-title-color;
    }
  }
  &__title {
    border-bottom: $box-border;
    padding: 16px 24px;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: $filter-title-color;
    &__button {
      float: right;
      color: $filter-title-btn-color;
    }
  }
  &__body {
    padding: 24px;
    &-item {
      &-button {
        display: inline-block;
        &.ant-btn {
          border-color: transparent;
          box-shadow: unset;
          color: $filter-text-color;
        }
      }
      &-select {
        margin-right: 8px;
        width: 170px;
        &.filter__sort {
          width: 100px;
        }
        &-sub {
          width: 150px;
          margin-right: 8px;
        }
      }
      &-input {
        width: 150px;
        margin-right: 8px;
      }
      .ant-calendar-picker {
        width: 258px !important;
        margin-right: 8px;
      }
    }
    &-plus-button {
      &.button-right {
        position: relative;
        right: -350px;
      }
      .ant-btn {
        color: $filter-text-color;
        .anticon {
          font-size: initial;
        }
      }
    }
  }
  .ant-dropdown-menu {
    box-shadow: none;
    padding: 0;
  }
}
</style>
