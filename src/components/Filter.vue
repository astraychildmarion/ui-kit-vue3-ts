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
                  v-if="checkDataFormat(filterItem.field) !== 'calendar'"
                  v-model:value="filterItem.mode"
                  class="xy-filter__body-item-select filter__sort"
                  @change="debounceFilterEmit"
                  :disabled="checkSortDisable(filterItem.field)"
                >
                  <Option v-for="sort in filterSort" :key="sort.value" :value="sort.value">{{
                    sort.title
                  }}</Option>
                </Select>
                <template v-if="checkDataFormat(filterItem.field) === 'dropdown'">
                  <Select
                    v-model:value="filterItem.value"
                    mode="multiple"
                    @change="debounceFilterEmit"
                    class="xy-filter__body-item-select-sub"
                  >
                    <Option
                      v-for="subOption in getSuboption(filterItem.field)"
                      :key="subOption.field"
                      :value="subOption.field"
                      >{{ subOption.title }}</Option
                    >
                  </Select>
                </template>
                <template v-if="checkDataFormat(filterItem.field) === 'calendar'">
                  <RangePicker
                    :disabled-date="disabledDate"
                    v-model:value="rangeValue"
                    format="MM-DD-YYYY"
                    @change="handlerGetRange"
                  />
                </template>
                <template v-if="checkDataFormat(filterItem.field) === undefined">
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
import { PropType, defineComponent, reactive, ref, watchEffect, computed } from 'vue';
import { Button, Dropdown, Select, Input, Form, DatePicker, Menu, Tooltip } from 'ant-design-vue';
import {
  CheckCircleOutlined,
  FilterOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue';
/* eslint-disable import/no-extraneous-dependencies */
import moment, { Moment } from 'moment';
import debounce from 'lodash/debounce';
import { FilterDefaultValue, FilterOption } from './interface';

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
      const filterTemplate: FilterDefaultValue = {
        field: '',
        value: '',
        mode: 'contain',
      };
      filterItems.push({ ...filterTemplate });
    };
    const checkDataFormat = (field: string) => {
      const result = props.filterOption.find(
        (item) => item.field === field && item?.format !== undefined,
      );
      console.log(field, result?.format);
      return result?.format;
    };
    const checkSortDisable = (field: string) => {
      const type = checkDataFormat(field);
      filterItems.forEach((item: FilterDefaultValue) => {
        // eslint-disable-next-line no-param-reassign
        if (item.field === field && type !== undefined) item.mode = 'in';
      });
      return type !== undefined;
    };
    /* eslint-disable */
    const debounceFilterEmit = debounce(function () {
      // check data sort
      // sort is IN coerece to array
      // sort is contain coerece to string
      const editFilterItems = filterItems.map(item => {
        if (item.mode === 'contain' && typeof item.value === 'string') {
          return item
        } else if (item.mode === 'contain' && typeof item.value !== 'string') {
          item.value = String(item.value)
          return item
        } else if (item.mode === 'in' && Array.isArray(item.value)) {
          return item
        } else if (item.mode === 'in' && !Array.isArray(item.value)) {
          item.value = item.value.split(',')
          return item
        } else {
          console.log('WEIRED!', item);
        }
      })
      emit('filterChange', editFilterItems);
    }, 500);

    // clean value input when selector changed
    const changeFilterSelector = (field: string): void => {
      filterItems.forEach((item: FilterDefaultValue) => {
        // eslint-disable-next-line no-param-reassign
        if (item.field === field) {
          if (checkDataFormat(field) === 'dropdown' || checkDataFormat(field) === 'calendar') {
            item.value = [];
          } else {
            item.value = '';
          }
        }
      });
      debounceFilterEmit();
    };
    const deleteFilter = (index: number): void => {
      const name = filterItems[index]['field'];
      const type = checkDataFormat(name);
      if (type === 'calendar') rangeValue.value = [];
      filterItems.splice(index, 1);
      // emit('filterChange', filterItems);
      debounceFilterEmit();
    };
    const getSuboption = (field: string) => {
      const result = props.filterOption.find(
        (item) => item.field === field && item?.format !== undefined,
      );
      return result?.formatOption;
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
    const handlerOverlayStyle = (text: string) => {
      const noshow = { visibility: 'hidden' };
      // 19 digits and the input can not show the whole phase
      return text.length > 18 ? undefined : noshow;
    }
    const hideFilterPopup = () => {
      visible.value = false;
    };
    const handlerGetRange = () => {
      filterItems.forEach((item) => {
        item.value = rangeValue.value;
        item.mode = 'in';
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
          if (checkDataFormat(item.field) === 'calendar') {
            rangeValue.value = item.value;
            item.mode = 'in';
          }
          if (item.mode === 'in' && checkDataFormat(item.field) === undefined) {
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
      handlerOverlayStyle,
      addFilter,
      deleteFilter,
      disabledDate,
      changeFilterSelector,
      checkSortDisable,
      checkDataFormat,
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
