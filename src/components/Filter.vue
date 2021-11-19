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
                  v-model:value="filterItem.field"
                  class="xy-filter__body-item-select"
                  dropdownClassName="xy-filter__body-dropdown"
                  @change="changeFilterSelector(filterItem.field)"
                >
                  <Option
                    v-for="(option, optionIndex) in filterOption"
                    :key="optionIndex"
                    :value="option.field"
                    :disabled="filterItems.some((filterItem) => filterItem.field === option.field)"
                    >{{ option.title }}</Option
                  >
                </Select>
                <Select
                  v-if="formatMap.get(filterItem.field) !== 'calendar'"
                  v-model:value="filterItem.mode"
                  class="xy-filter__body-item-select filter__sort"
                  dropdownClassName="xy-filter__body-dropdown"
                  @change="debounceFilterEmit"
                  :disabled="checkSortDisable(filterItem.field)"
                >
                  <Option v-for="sort in filterSort" :key="sort.value" :value="sort.value">{{
                    sort.title
                  }}</Option>
                </Select>
                <template v-if="formatMap.get(filterItem.field) === 'dropdown'">
                  <Select
                    v-model:value="filterItem.value"
                    mode="multiple"
                    @change="debounceFilterEmit"
                    class="xy-filter__body-item-select-sub"
                    dropdownClassName="xy-filter__body-dropdown"
                  >
                    <Option
                      v-for="subOption in getSuboption(filterItem.field)"
                      :key="subOption"
                      :value="subOption"
                      >{{ subOption }}</Option
                    >
                  </Select>
                </template>
                <template v-if="formatMap.get(filterItem.field) === 'calendar'">
                  <RangePicker
                    :disabled-date="disabledDate"
                    v-model:value="rangeValue"
                    format="MMM-DD-YYYY"
                    @change="handlerGetRange"
                  >
                    <template #suffixIcon>
                      <CalendarOutlined />
                    </template>
                  </RangePicker>
                </template>
                <template
                  v-if="
                    formatMap.get(filterItem.field) === 'text' ||
                    formatMap.get(filterItem.field) === undefined
                  "
                >
                  <Tooltip placement="top" :overlayStyle="handlerOverlayStyle(filterItem.value)">
                    <template #title>
                      <span>{{ filterItem.value }}</span>
                    </template>
                    <Input
                      class="xy-filter__body-item-input"
                      placeholder="Value"
                      v-model:value="filterItem.value"
                      @change="debounceFilterEmit"
                      :key="filterItem.field"
                    />
                  </Tooltip>
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
import { PropType, defineComponent, ref, watchEffect, computed } from 'vue';
import { Button, Dropdown, Select, Input, Form, DatePicker, Menu, Tooltip } from 'ant-design-vue';
import {
  CheckCircleOutlined,
  FilterOutlined,
  PlusOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from '@ant-design/icons-vue';
/* eslint-disable import/no-extraneous-dependencies */
import moment, { Moment } from 'moment';
import debounce from 'lodash/debounce';
import { FilterDefaultValue, FilterOption, DropdownOption } from './interface';
import { dropdownMap, formatMap } from './dropdownMap';

export default defineComponent({
  name: 'XYFilter',
  props: {
    dropdownOption: {
      type: Array as PropType<DropdownOption[]>,
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
    const filterItems = ref<FilterDefaultValue[]>([]);
    // map field, add format, return an array filterOption
    const filterOption = computed(() =>
      dropdownMap.map((item: FilterOption) => {
        props.dropdownOption.forEach((option) => {
          if (option.field === item.field) {
            /* eslint-disable no-param-reassign */
            item.options = option.options;
          }
        });
        return item;
      }),
    );
    const addFilter = () => {
      // e.preventDefault();
      const filterTemplate: FilterDefaultValue = {
        field: '',
        mode: 'in',
        value: '',
      };
      filterItems.value.push({ ...filterTemplate });
    };
    const checkSortDisable = (field: string) => {
      if (field === 'disk_partition') {
        return true;
      }
      const format = formatMap.get(field);
      return format === 'calendar' || format === 'dropdown';
    };
    /* eslint-disable */
    const debounceFilterEmit = debounce(function () {
      // check data sort
      // sort is IN coerece to array
      // sort is contain coerece to string
      const deepCloneFilterItems = JSON.parse(JSON.stringify(filterItems.value));
      const editFilterItems = deepCloneFilterItems.map((item: FilterDefaultValue) => {
        if (item.mode === 'contain' && typeof item.value !== 'string') {
          item.value = String(item.value);
        } else if (item.mode === 'in' && !Array.isArray(item.value)) {
          item.value = item.value.length === 0 ? [] : item.value.split(',');
          if (item.value.length > 1) {
            item.value = item.value.filter((i: string) => i.length > 0);
          }
        } else if (item.field === 'last_update_at') {
          const copy = [...rangeValue.value];
          if (copy.length > 0) {
            const start = copy.shift();
            const end = copy.shift();
            item.value = [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')];
          }
        }
        return item;
      });
      emit('filterChange', editFilterItems);
    }, 800);

    // clean value input when selector changed
    const changeFilterSelector = (field: string): void => {
      filterItems.value.forEach((item: FilterDefaultValue) => {
        // eslint-disable-next-line no-param-reassign
        if (item.field === field) {
          if (field === 'disk_partition') {
            item.value = '';
            item.mode = 'contain';
          } else if (formatMap.get(field) === 'dropdown' || formatMap.get(field) === 'calendar') {
            item.value = [];
            item.mode = 'in';
          } else {
            item.value = '';
          }
        }
      });
      debounceFilterEmit();
    };
    const deleteFilter = (index: number): void => {
      const name = filterItems.value[index]['field'];
      const type = formatMap.get(name);
      if (type === 'calendar') rangeValue.value = [];
      filterItems.value.splice(index, 1);
      debounceFilterEmit();
    };
    const getSuboption = (field: string) => {
      const result = filterOption.value.find(
        (item) => item.field === field && formatMap.get(field) !== 'text',
      );
      return result?.options;
    };
    const handleMenuClick = () => {
      visible.value = true;
    };
    const handlerClean = () => {
      rangeValue.value = [];
      filterItems.value.splice(0, filterItems.value.length);
      debounceFilterEmit();
    };
    const handlerOverlayStyle = (text: string) => {
      const noshow = { visibility: 'hidden' };
      // 19 digits and the input can not show the whole phase
      return text.length > 18 ? undefined : noshow;
    };
    const hideFilterPopup = () => {
      visible.value = false;
    };
    const handlerGetRange = () => {
      filterItems.value.forEach((item) => {
        if (formatMap.get(item.field) === 'calendar') {
          item.value = rangeValue.value;
          item.mode = 'in';
        }
      });
      debounceFilterEmit();
    };
    // Can not select days after today
    const disabledDate = (current: Moment) => {
      return current && current > moment().endOf('day');
    };
    watchEffect(() => {
      if (props.filterDefaultValue && props.filterDefaultValue.length > 0) {
        // specially update range
        filterItems.value = props.filterDefaultValue.map((item) => {
          if (formatMap.get(item.field) === 'calendar') {
            rangeValue.value = item.value;
            return { ...item, mode: 'in' };
          }
          if (item.mode === 'in' && formatMap.get(item.field) === 'text') {
            return { ...item, value: item.value.toString() };
          }
          return { ...item };
        });
      }
    });

    const addFilterBtnDisabled = computed(() => {
      return filterItems.value.length >= filterOption.value.length;
    });
    const active = computed(() => {
      return filterItems.value.length > 0;
    });
    const titleText = computed(() => {
      const info = 'Introduction';
      const filter = 'Filter Value';
      return filterItems.value.length > 0 ? filter : info;
    });

    return {
      visible,
      filterItems,
      debounceFilterEmit,
      rangeValue,
      addFilterBtnDisabled,
      active,
      titleText,
      filterOption,
      formatMap,
      handleMenuClick,
      handlerClean,
      handlerGetRange,
      hideFilterPopup,
      handlerOverlayStyle,
      addFilter,
      deleteFilter,
      disabledDate,
      changeFilterSelector,
      checkSortDisable,
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
    Tooltip,
    CheckCircleOutlined,
    FilterOutlined,
    PlusOutlined,
    CalendarOutlined,
    DeleteOutlined,
  },
  data() {
    return {
      filterSort: [
        {
          title: 'Contains',
          value: 'contain',
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
<style lang="scss">
.xy-filter__body-dropdown .ant-select-item-option-selected {
  background-color: $dropdown-selected-bg;
  font-weight: 600;
  &:not(.ant-select-item-option-disabled) {
    background-color: $dropdown-selected-bg;
  }
}
.xy-filter__body-dropdown .ant-select-item-option-active {
  background-color: $dropdown-hover-bg;
  &:not(.ant-select-item-option-disabled) {
    background-color: $dropdown-hover-bg;
  }
}
</style>
<style lang="scss" scoped>
menu.ant-dropdown-content {
  padding-inline-start: 0px;
  margin-block-start: 0;
}
.xy-filter--active {
  color: $filter-active-icon;
  border-color: $filter-active-icon;
  background-color: #fff;
}

.xy-filter {
  .ant-dropdown-menu {
    box-shadow: none;
    padding: 0;
  }

  .xy-filter {
    &--media-query {
      @media screen and (max-width: 1000px) {
        display: none;
      }
    }
    &__wrapper {
      box-shadow: $box-shadow;
      border-radius: $box-radius;
      border: $box-border;
      width: 664px;
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
      max-height: 342px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        border-radius: 40px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: #d8d8d8;
        border-radius: 8px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgb(124, 122, 122);
      }

      &::-webkit-scrollbar-track:hover {
        background: #f4f1f1;
      }
      &-item {
        &-button {
          display: inline-block;
          &.ant-btn {
            border-color: transparent;
            box-shadow: unset;
            color: $filter-text-color;
                margin-left: 8px;
          }
        }
        &-select {
          margin-right: 8px;
          width: 190px;
          &.filter__sort {
            width: 100px;
          }
          &-sub {
            width: 250px;
            margin-right: 8px;
          }
        }
        &-input {
          width: 250px;
          margin-right: 8px;
        }
        .ant-calendar-picker {
          width: 358px !important;
          margin-right: 8px;
        }
      }
      &-plus-button {
        &.button-right {
          position: relative;
          right: -480px;
        }
        &:focus {
          color: $antd-button-text;
          background: #fff;
          border-color: $antd-button-border-color;
        }
        .ant-btn {
          color: $filter-text-color;
          .anticon {
            font-size: initial;
          }
        }
      }
    }
  }
}
</style>
