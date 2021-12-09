<template>
  <div class="xy-customize-modal" ref="divref"></div>
  <div class="xy-customize-display__wrapper">
    <Button @click="showCustomizeDisplay" class="xy-customize-display__button">
      Customize Display
      <template #icon><EditOutlined /></template>
    </Button>

    <Modal
      :keyboard="keyboard"
      :visible="visible"
      :closable="closable"
      :maskClosable="maskClosable"
      wrapClassName="xy-customize-display"
      :width="580"
      :getContainer="getContainer"
    >
      <draggable :list="selectedItem" ghost-class="ghost" :move="onMove">
        <div
          v-for="(element, index) in selectedItem"
          :key="element.label"
          :class="[{ 'not-draggable': element.fixed }, 'xy-customize-display__list-group-item']"
        >
          <li>
            <Row type="flex">
              <Col>
                <Space size="small">
                  <img src="@/assets/drag_outline.svg" className="anticon" v-if="!element.fixed" />
                  {{ element.label }}
                </Space>
              </Col>
              <Col :flex="2" style="text-align: right">
                <DeleteOutlined @click="removeAt(index)" v-if="!element.fixed" />
              </Col>
            </Row>
          </li>
        </div>
      </draggable>
      <Select
        :value="emptyvalue"
        show-search
        style="width: 100%"
        placeholder="Column"
        @change="onSelectChange"
        dropdownClassName="xy-customize-display__dropdown"
        optionFilterProp="title"
      >
        <SelectOption
          v-for="(item, index) in filteredOptions"
          :key="index"
          :value="item.value"
          :title="item.label"
        >
          {{ item.label }}
        </SelectOption>
      </Select>
      <template #title>
        <div class="xy-customize-display__section-wrapper">
          Customize Display
          <span @click="clickResetDefault" class="xy-customize-display__reset-to-default">
            reset to default
          </span>
        </div>
      </template>
      <template #footer>
        <Space size="middle">
          <Button @click="clickCancel">Cancel</Button>
          <Button class="btn-color" @click="clickConfirm">Confirm</Button>
        </Space>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed, nextTick } from 'vue';
import { Button, Modal, Select, Row, Col, Space } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { VueDraggableNext } from 'vue-draggable-next';
/* eslint-disable import/no-extraneous-dependencies */
import xorBy from 'lodash/xorBy';
import sortBy from 'lodash/sortBy';

import { CustomizeDisplayItemOptType } from './interface';

export default defineComponent({
  name: 'XYCustomizeDisplay',
  components: {
    Button,
    Modal,
    Select,
    Row,
    Col,
    Space,
    SelectOption: Select.Option,
    EditOutlined,
    DeleteOutlined,
    draggable: VueDraggableNext,
  },
  props: {
    itemOption: {
      required: true,
      type: Array as PropType<CustomizeDisplayItemOptType[]>,
      default() {
        return [];
      },
    },
    defaultSelected: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    userSelected: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ['clickCustomizeConfirm'],
  setup(props: any, { emit }) {
    const visible = ref(false);
    const propsDefaultSelected = ref(props.defaultSelected);
    const propsItemOption = ref(
      sortBy(props.itemOption, [(item) => item.label.toLowerCase()], ['label']),
    );
    const keyboard = ref<boolean>(false);
    const closable = ref<boolean>(false);
    const maskClosable = ref<boolean>(false);
    const selectedItem = ref<CustomizeDisplayItemOptType[]>([]);
    const emptyvalue = ref([]);
    const divref = ref(null);

    function getContainer() {
      return divref.value;
    }

    const showCustomizeDisplay = () => {
      visible.value = true;
    };
    const clickCancel = () => {
      visible.value = false;
      nextTick(() => {
        const body = document.querySelector('.xy-customize-display .ant-modal-body');
        if (body) {
          body?.scroll({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
    };
    const clickConfirm = () => {
      emit('clickCustomizeConfirm', JSON.parse(JSON.stringify(selectedItem.value)));
      visible.value = false;
      nextTick(() => {
        const body = document.querySelector('.xy-customize-display .ant-modal-body');
        if (body) {
          body?.scroll({
            top: 0,
            behavior: 'smooth',
          });
        }
      });
    };

    const onMove = (evt: any) => {
      const relatedElement = evt.relatedContext.element;
      const draggedElement = evt.draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    };

    const clickResetDefault = () => {
      selectedItem.value = JSON.parse(JSON.stringify(propsDefaultSelected.value));
      emptyvalue.value = [];
    };

    const removeAt = (idx: number) => {
      selectedItem.value.splice(idx, 1);
    };

    const onSelectChange = (value: any, option: any) => {
      const objItem: CustomizeDisplayItemOptType = {
        label: option.title,
        value: option.value,
        fixed: false,
      };
      selectedItem.value.push(objItem);
      emptyvalue.value = [];
      nextTick(() => {
        const body = document.querySelector('.xy-customize-display .ant-modal-body');
        if (body) {
          const customizeBodyHeight = body?.scrollHeight;
          const customizeBodyClientHeight = body?.clientHeight;
          body?.scroll({
            top: customizeBodyHeight - customizeBodyClientHeight,
            behavior: 'smooth',
          });
        }
      });
    };
    const filteredOptions = computed(() =>
      xorBy(selectedItem.value, propsItemOption.value, 'label'),
    );
    watch(
      () => visible.value,
      () => {
        selectedItem.value = JSON.parse(JSON.stringify(props.userSelected));
      },
      { immediate: true },
    );

    return {
      showCustomizeDisplay,
      clickCancel,
      clickConfirm,
      removeAt,
      clickResetDefault,
      onSelectChange,
      onMove,
      getContainer,
      filteredOptions,
      divref,
      visible,
      propsDefaultSelected,
      propsItemOption,
      keyboard,
      closable,
      maskClosable,
      selectedItem,
      emptyvalue,
    };
  },
});
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background-color: $dropdown-hover-bg;
}
:deep(.ant-modal-body) {
  max-height: 436px;
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
    background: $scroll-thumb-color;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $scroll-thumb-color-hover;
  }

  &::-webkit-scrollbar-track:hover {
    background: $scroll-track-color-hover;
  }
}

.xy-customize-display__button.ant-btn:focus {
  color: #5c666f;
  background: #fff;
  border-color: $antd-button-border-color;
}
.xy-customize-modal .xy-customize-display {
  .btn-color {
    color: #ffff;
    background-color: $primary-color;
    border: none;
  }
  &--media-query {
    color: $toolbar-text-color;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  &__list-group-item {
    height: 36px;
    margin: 0 0 8px 0;
    padding: 6px 14px 6px 14px;
    border-radius: 4px;
    border: solid 1px #dadcde;
    &.not-draggable {
      cursor: no-drop;
      background-color: #f5f5f5;
    }
    &:hover {
      cursor: move;
      &.not-draggable {
        cursor: no-drop;
        background-color: #f5f5f5;
      }
    }
  }
  &__reset-to-default {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    text-align: right;
    color: #969ca1;
    cursor: pointer;
    float: right;
  }
  &__section {
    &-wrapper {
      // display: flex;
      justify-content: space-between;
      font-weight: bold;
      color: #102e4d;
      span {
        font-weight: normal;
        font-size: 14px;
      }
    }
  }

  :deep(.ant-modal-footer) {
    border-top: none;
  }
  :deep(.ant-btn) {
    &:focus {
      color: $toolbar-text-color;
      border-color: #d9d9d9;
    }
  }
}
</style>
<style lang="scss">
.xy-customize-display__dropdown .ant-select-item-option-selected {
  background-color: $dropdown-selected-bg;
  &:not(.ant-select-item-option-disabled) {
    background-color: $dropdown-selected-bg;
  }
}
.xy-customize-display__dropdown .ant-select-item-option-active {
  background-color: $dropdown-hover-bg;
  &:not(.ant-select-item-option-disabled) {
    background-color: $dropdown-hover-bg;
  }
}
</style>
