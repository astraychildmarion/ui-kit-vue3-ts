<template>
  <div class="xy-customize-modal" ref="divref"></div>
  <div class="xy-customize-display__wrapper">
    <Button @click="showCustomizeDisplay" class="xy-customize-display__button">
      Customize Display
      <template #icon><EditOutlined /></template>
    </Button>

    <Modal
      :keyboard="keyboard"
      :visible="propsVisible"
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
        @change="OnSelectChange"
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
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import { Button, Modal, Select, Row, Col, Space } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { VueDraggableNext } from 'vue-draggable-next';
/* eslint-disable import/no-extraneous-dependencies */
import xorBy from 'lodash/xorBy';

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
    visible: {
      type: Boolean,
    },
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
    const propsVisible = ref(props.visible);
    const propsDefaultSelected = ref(props.defaultSelected);
    const propsUserSelected = ref(props.userSelected);
    const propsItemOption = ref(props.itemOption);
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
      propsVisible.value = true;
    };
    const clickCancel = () => {
      propsVisible.value = false;
    };
    const clickConfirm = () => {
      emit('clickCustomizeConfirm', JSON.parse(JSON.stringify(selectedItem.value)));
      propsVisible.value = false;
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

    const OnSelectChange = (value: any, option: any) => {
      const objItem: CustomizeDisplayItemOptType = {
        label: option.title,
        value: option.value,
        fixed: false,
      };
      selectedItem.value.push(objItem);
      emptyvalue.value = [];
    };
    const filteredOptions = computed(() =>
      xorBy(selectedItem.value, propsItemOption.value, 'label'),
    );

    watch(
      () => propsUserSelected.value,
      (NewVal) => {
        selectedItem.value = JSON.parse(JSON.stringify(NewVal));
      },
      { immediate: true },
    );

    return {
      showCustomizeDisplay,
      clickCancel,
      clickConfirm,
      removeAt,
      clickResetDefault,
      OnSelectChange,
      onMove,
      getContainer,
      filteredOptions,
      divref,
      propsVisible,
      propsDefaultSelected,
      propsUserSelected,
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
  background: #dadcde;
}

.xy-customize-display__button.ant-btn:focus {
  color: $antd-button-text;
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
    margin: 8px 0;
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
