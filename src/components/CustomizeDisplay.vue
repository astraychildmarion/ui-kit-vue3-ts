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
      :width="640"
    >
      <!-- <draggable
        :list="selectedItem"
        item-key="label"
        @start="dragging = true"
        @end="dragging = false"
        ghost-class="ghost"
        handle=".handle"
        :move="onMove"
      >
        <template #item="{ element, index }">
          <li className="list-group-item">
            <Row type="flex">
              <Col>
                <Space>
                  <PushpinOutlined v-if="element.fixed" style="cursor: no-drop" />
                  <MenuOutlined class="handle" v-else />
                  {{ element.label }} /
                  {{ index }}
                </Space>
              </Col>
              <Col :flex="2" style="text-align: right">
                <DeleteOutlined @click="removeAt(index)" v-if="!element.fixed" />
              </Col>
            </Row>
          </li>
        </template>
      </draggable> -->

      <Select
        show-search
        :value="emptyvalue"
        style="width: 100%"
        placeholder="Select an Item"
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
          <span :class="{ 'xy-customize-display__title--alert': selectedCountWrong }">
            {{ currentNumber }}
          </span>
          <span :class="{ 'xy-customize-display__title--alert': selectedCountWrong }">
            {{ headerText }}
          </span>
        </div>
      </template>
      <template #footer>
        <div className="xy-customize-display__section-wrapper">
          <div style="float: left">
            <Button type="link" @click="clickResetDefault">reset to default</Button>
          </div>
          <div style="float: right">
            <Button @click="clickCancel">Cancel</Button>
            <Button type="primary" @click="clickConfirm">Confirm</Button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch, computed } from 'vue';
import { Button, Modal, Select } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';
// import { EditOutlined, MenuOutlined, DeleteOutlined } from '@ant-design/icons-vue';

// import draggable from 'vuedraggable';

import { CustomizeDisplayItemOptType } from './interface';

export default defineComponent({
  name: 'XYCustomizeDisplay',
  components: {
    Button,
    Modal,
    Select,
    SelectOption: Select.Option,
    EditOutlined,
    // MenuOutlined,
    // DeleteOutlined,
    // draggable,
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
    const dragging = ref(false);
    const enabled = ref(true);
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
    // const onMove = ({ relatedContext, draggedContext }) => {
    //   const relatedElement = relatedContext.element;
    //   const draggedElement = draggedContext.element;
    //   return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    // };

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
      const objItem: CustomizeDisplayItemOptType = { label: option.title, value: option.value };
      console.log(objItem);
      selectedItem.value.push(objItem);
      emptyvalue.value = [];
      CheckSelectedItem();
    };

    const filteredOptions = computed(() =>
      propsItemOption.value.filter(
        (o: CustomizeDisplayItemOptType) => !selectedItem.value.includes(o),
      ),
    );
    console.log('filteredOptions->', filteredOptions.value);

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
      // onMove,
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
      dragging,
      enabled,
      emptyvalue,
    };
  },
});
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.icon-align {
  vertical-align: super;
}
.list-group-item {
  padding: 0.25rem 1.25rem;
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: move;
}
.xy-customize-display {
  &--media-query {
    color: $toolbar-text-color;
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  &__section {
    &-wrapper {
      display: flex;
      justify-content: space-between;
      span {
        font-weight: normal;
        font-size: 14px;
        color: $customizeModal-title;
        &.xy-customize-display__title--alert {
          color: $error-color;
        }
      }
    }
  }
}
:deep(.ant-checkbox-group) {
  width: 100%;
  .ant-checkbox-group-item {
    width: 33.3%;
    margin-bottom: 16px;
    margin-right: 0;
    padding-right: 8px;
  }
}
:deep(.ant-modal-body) {
  min-height: 200px;
  max-height: 400px;
  overflow: hidden auto;
  padding: 27px 40px;
}
:deep(.ant-btn) {
  &:focus {
    color: $toolbar-text-color;
    border-color: #d9d9d9;
  }
}
</style>
