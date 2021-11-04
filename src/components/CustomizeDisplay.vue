<template>
  <div class="xy-customize-display__wrapper">
    <Button @click="showCustomizeDisplay">
      Customize Display
      <template #icon><EditOutlined /></template>
    </Button>

    <Modal
      :keyboard="keyboard"
      :visible="propsvisible"
      :closable="closable"
      :maskClosable="maskClosable"
      wrapClassName="xy-customize-display"
      :width="580"
    >
      <draggable :list="selectedItem" ghost-class="ghost" :move="onMove">
        <div
          v-for="(element, index) in selectedItem"
          :key="element.label"
          class="xy-customize-display__list-group-item"
          :class="{ 'not-draggable': element.fixed }"
        >
          <li>
            <Row type="flex">
              <Col>
                <Space size="small">
                  <img src="@/assets/drag_outline.svg" className="anticon" />
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
        show-search
        :value="emptyvalue"
        style="width: 100%"
        placeholder="Column"
        @change="OnSelectChange"
      >
        <SelectOption
          v-for="(item, index) in propsItemOption"
          :key="index"
          :value="item.value"
          :title="item.label"
          :disabled="selectedItem.some((filteritem) => filteritem.value === item.value)"
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
          <Button type="primary" @click="clickConfirm">Confirm</Button>
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
      type: Array as PropType<CustomizeDisplayItemOptType[]>,
      required: true,
      default() {
        return [];
      },
    },
    defaultSelected: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ['clickCustomizeConfirm'],
  setup(props: any, { emit }) {
    console.log('props=>', props);
    const propsvisible = ref(props.visible);
    const propsdefaultSelected = ref(props.defaultSelected);
    const propsItemOption = ref(props.itemOption);
    const keyboard = ref<boolean>(false);
    const closable = ref<boolean>(false);
    const maskClosable = ref<boolean>(false);
    const selectedItem = ref<CustomizeDisplayItemOptType[]>([]);
    const needColumnTextRight = ref<string>('Please select one column at least');
    const selectedCountWrong = ref<boolean>(false);
    const headerText = ref<string>('');
    const emptyvalue = ref([]);

    function CheckSelectedItem(): void {
      if (selectedItem.value.length > 1) {
        selectedCountWrong.value = false;
        headerText.value = '';
      }
    }

    const currentNumber = computed(() => selectedItem.value.length);

    const showCustomizeDisplay = () => {
      propsvisible.value = true;
    };
    const clickCancel = () => {
      propsvisible.value = false;
    };
    const clickConfirm = () => {
      // TODO emit right value
      console.log('selectedItem.value', selectedItem.value);
      emit('clickCustomizeConfirm', selectedItem.value);
      propsvisible.value = false;
    };

    const onMove = (evt: any) => {
      const relatedElement = evt.relatedContext.element;
      const draggedElement = evt.draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    };

    const clickResetDefault = () => {
      selectedItem.value = JSON.parse(JSON.stringify(propsdefaultSelected.value));
      emptyvalue.value = [];
      CheckSelectedItem();
    };

    const removeAt = (idx: number) => {
      if (selectedItem.value.length <= 1) {
        selectedCountWrong.value = true;
        headerText.value = needColumnTextRight.value;
        return;
      }
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
      CheckSelectedItem();
    };

    // const filteredOptions = computed(() =>
    //   propsItemOption.value.filter(
    //     (o: CustomizeDisplayItemOptType) => !selectedItem.value.includes(o),
    //   ),
    // );

    // console.log('filteredOptions->', filteredOptions.value);

    watch(
      () => propsvisible.value,
      (NewVal) => {
        console.log('watch visible=>', NewVal);
        console.log('propsvisible=>', propsvisible.value);
        if (NewVal) {
          selectedCountWrong.value = false;
        }
      },
      { deep: true },
    );

    watch(
      () => propsdefaultSelected.value,
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
      propsvisible,
      propsdefaultSelected,
      propsItemOption,
      keyboard,
      closable,
      maskClosable,
      currentNumber,
      selectedItem,
      needColumnTextRight,
      selectedCountWrong,
      headerText,
      emptyvalue,
    };
  },
});
</script>

<style lang="scss" scoped>
.not-draggable {
  cursor: no-drop;
  background-color: #f5f5f5;
}
.ghost {
  opacity: 0.5;
  background: #dadcde;
}
.xy-customize-display {
  &--media-query {
    color: $toolbar-text-color;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  &__list-group-item {
    width: 530px;
    height: 36px;
    margin: 8px 0;
    padding: 6px 14px 6px 14px;
    border-radius: 4px;
    border: solid 1px #dadcde;
    cursor: move;
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
}
// :deep(.ant-modal-body) {
//   min-height: 200px;
//   max-height: 400px;
//   overflow: hidden auto;
//   padding: 27px 40px;
// }
:deep(.ant-modal-footer) {
  border: transparent;
}
:deep(.ant-btn) {
  &:focus {
    color: $toolbar-text-color;
    border-color: #d9d9d9;
  }
}
</style>
