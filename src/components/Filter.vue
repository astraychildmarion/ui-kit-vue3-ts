<template>
  <Dropdown
    v-model:visible="visible"
    overlayClassName="xy-filter"
    :class="{ 'xy-filter--active': active }"
    :trigger="['click']"
    :overlayStyle="{ zIndex: 998 }"
  >
    <Button
      class="xy-filter__button"
      @click="
        (e) => {
          e.preventDefault;
        }
      "
    >
      <template #icon>
        <CheckCircleOutlined v-if="active" />
        <FilterOutlined v-else />
      </template>
      <span class="xy-filter--media-query">Filter</span>
    </Button>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <div class="xy-filter__wrapper">
          <div class="xy-filter__title">{{ titleText }}</div>
          <div class="xy-filter__body">
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
               {{ filterItem }}
                <Select
                  v-model:value="filterItem.dataIndex"
                  class="xy-filter__body-item-select"
                  @change="checkFormVaildation(filterItem.dataIndex)"
                >
                  <Option
                    v-for="(option, optionIndex) in filterOption"
                    :key="optionIndex"
                    :value="option.dataIndex"
                    :disabled="
                      filterItems.some((filterItem) => filterItem.dataIndex === option.dataIndex)
                    "
                  >
                    {{ option.title }}
                  </Option>
                </Select>
                <Select
                  v-model:value="filterItem.sort"
                  class="xy-filter__body-item-select filter__sort"
                  @change="checkFormVaildation"
                  :disabled="checkSortDisable(filterItem.dataIndex)"
                >
                  <Option v-for="sort in filterSort" :key="sort.value" :value="sort.value">
                    {{ sort.title }}
                  </Option>
                </Select>
                <template v-if="checkOptionType(filterItem.dataIndex) === 'dropdown'">
                  <Select
                    v-model:value="filterItem.value"
                    @change="checkFormVaildation"
                    class="xy-filter__body-item-select-sub"
                  >
                    <Option
                      v-for="subOption in getSuboption(filterItem.dataIndex)"
                      :key="subOption.dataIndex"
                      :value="subOption.dataIndex"
                    >
                      {{ subOption.title }}
                    </Option>
                  </Select>
                </template>
                <template v-if="checkOptionType(filterItem.dataIndex) === 'date'">
                  <DatePicker
                    @change="checkFormVaildation"
                    :disabled-date="disabledDate"
                    v-model:value="filterItem.value"
                  />
                </template>
                <template v-if="checkOptionType(filterItem.dataIndex) === undefined">
                  <Input
                    class="xy-filter__body-item-input"
                    placeholder="Value"
                    v-model:value="filterItem.value"
                    @change="checkFormVaildation"
                    :key="filterItem.dataIndex"
                  />
                </template>
                <Button
                  class="xy-filter__body-item-button"
                  @click="deleteFilter(index)"
                >
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
import { PropType, defineComponent, reactive, ref, watchEffect } from 'vue'
import { Button, Dropdown, Select, Input, Form, DatePicker } from 'ant-design-vue';
import { CheckCircleOutlined, FilterOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs'
  interface FilterOption {
      title: string
      dataIndex: string
      type?: string
      typeOption?: any[] 
  }
  interface FilterDefaultValue {
      dataIndex: string
      sort: string
      value: string
  }
  interface FilterTemplate {
    dataIndex: string
    value: string
    sort: string
  }
export default defineComponent({
  props: {
    filterOption: {
      type: Array as PropType<FilterOption[]>,
      required: true
    },
    filterDefaultValue: {
      type: Array as PropType<FilterDefaultValue[]>
    }
  },
  emits: ['filterChange'],
  setup(props, { emit }) {
    const visible = ref(false);
    let filterItems = reactive([]) as Array<FilterDefaultValue>;
    const handleMenuClick = () => {
      visible.value = true;
    }
    const hideFilterPopup = () => {
      visible.value = false;
    }
    const addFilter = () => {
      // e.preventDefault();
      const filterTemplate: FilterTemplate = {
        dataIndex: '',
        value: '',
        sort: 'contain',
      };
      filterItems.push({...filterTemplate});
    }
    const deleteFilter = (index: number) => {
      console.log('delete filter index', index);
      filterItems.splice(index, 1);
      emit('filterChange', filterItems);
    }

    const disabledDate = (current: any) => {
      // Can not select days after today
      return current > dayjs().endOf('day');
    }

    watchEffect(() => {
      if (props.filterDefaultValue?.length > 0) filterItems = reactive(props.filterDefaultValue);
    })

    return { 
      filterItems,
      handleMenuClick,
      addFilter,
      deleteFilter,
      hideFilterPopup,
      disabledDate
    }
  },
  components: {
    Button,
    Select,
    Option: Select.Option,
    Input,
    Dropdown,
    Form,
    FormItem: Form.Item,
    DatePicker,
    CheckCircleOutlined,
    FilterOutlined,
    PlusOutlined,
    DeleteOutlined,
  },
  data() {
    return {
      filterSort: [
        {
          title: 'Contain',
          value: 'contain',
        },
        {
          title: 'Is',
          value: 'is',
        },
      ],
    };
  },
  computed: {
    addFilterBtnDisabled() {
      return this.filterItems.length >= this.filterOption.length;
    },
    active() {
      return this.filterItems.length > 0;
    },
    titleText() {
      const info = 'Introduction';
      const filter = 'Filter Value';
      return this.filterItems.length > 0 ? filter : info;
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.hideFilterPopup);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.hideFilterPopup);
  },
  methods: {
    checkSortDisable(dataIndex: string) {
      const type = this.checkOptionType(dataIndex);
      this.filterItems.forEach((item: FilterDefaultValue) => {
        // eslint-disable-next-line no-param-reassign
        if (item.dataIndex === dataIndex && type !== undefined) item.sort = 'is';
      });
      return type !== undefined;
    },
    checkOptionType(dataIndex: string) {
      const result = this.filterOption.find((item) => {
        return item.dataIndex === dataIndex && item?.type !== undefined;
      });
      return result?.type;
    },
    getSuboption(dataIndex: string) {
      const result = this.filterOption.find((item) => {
        return item.dataIndex === dataIndex && item?.type !== undefined;
      });
      return result?.typeOption;
    },
    checkFormVaildation(dataIndex = null) {
      if (dataIndex !== null) {

        this.filterItems.forEach((item: FilterDefaultValue) => {
          // eslint-disable-next-line no-param-reassign
          if (item.dataIndex === dataIndex) item.value = '';
        });
      }
      this.debounceFilterEmit()
    },
    onFilterChange() {
      this.$emit('filterChange', this.filterItems);
    },
    debounce(fn: any, delay: number) {
      let timer: any
      return function () {
        var context = this
        var args = arguments
        clearTimeout(timer)
        timer = setTimeout(function () {
          fn.apply(context, args)
        }, delay)
      }
    },
    /* eslint-disable */
    debounceFilterEmit() {
      this.debounce(this.onFilterChange(), 5500)
    },
  },
})
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
  }
  &__body {
    padding: 24px;
    &-item {
      &-button {
        display: inline-block;
        :deep(&.ant-btn) {
          border: none;
          box-shadow: none;
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
        width: 150px;
        margin-right: 8px;
      }
    }
    &-plus-button {
      &.button-right {
        position: relative;
        right: -350px;
      }
      :deep(.ant-btn) {
        color: $filter-text-color;
        .anticon {
          font-size: initial;
        }
      }
    }
  }
}
</style>
