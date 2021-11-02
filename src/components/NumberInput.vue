<template>
  <Space :size="40">
    <Button :disabled="!decreasable" @click="decrease" class="iconbtn">
      <template #icon>
        <MinusSquareOutlined />
      </template>
    </Button>
    <Space :size="40">
      <Input suffix="VM" style="width: 5rem" v-model:value="inputValue" @change="change" />
      <Button :disabled="!increasable" @click="increase" class="iconbtn">
        <template #icon>
          <PlusSquareOutlined />
        </template>
      </Button>
    </Space>
  </Space>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { Button, Input, Space } from 'ant-design-vue';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'NumberInput',
  emits: ['clickChange'],
  components: { Button, Input, Space, PlusSquareOutlined, MinusSquareOutlined },
  props: {
    max: {
      type: Number,
      default: Infinity,
    },
    min: {
      type: Number,
      default: -Infinity,
    },
  },
  setup(props: any, { emit }) {
    const inputValue = ref<number>(1);
    const maxVal = ref<number>(props.max);
    const minVal = ref<number>(props.min);
    const format = (val: string, preVal: string) => {
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(val)) {
        inputValue.value = Number(val);
      } else {
        inputValue.value = Number(preVal);
      }
    };

    watch(inputValue, (val, preVal) => {
      format(val.toString(), preVal.toString());
    });

    const increasable = computed(() => inputValue.value < maxVal.value);
    const decreasable = computed(() => inputValue.value > minVal.value);
    const emitEvent = () => {
      emit('clickChange', Number(inputValue.value));
    };
    /**
     * Decrease the value.
     */
    const decrease = () => {
      inputValue.value -= 1;
      emitEvent();
    };
    /**
     * Increase the value.
     */
    const increase = () => {
      inputValue.value += 1;
      emitEvent();
    };
    const change = () => {
      if (inputValue.value > maxVal.value) {
        inputValue.value = maxVal.value;
      } else if (inputValue.value < minVal.value) {
        inputValue.value = minVal.value;
      }
      emitEvent();
    };
    return {
      increase,
      decrease,
      change,
      inputValue,
      increasable,
      decreasable,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.ant-input),
:deep(.ant-input-affix-wrapper) {
  border: none;
  outline: none;
  box-shadow: none;
  text-align: center;
}
:deep(.ant-btn) {
  &:focus {
    color: $toolbar-text-color;
    border-color: #d9d9d9;
  }
}

.iconbtn {
  display: grid;
  justify-content: center;
  align-content: center;
  border: none;
  outline: none;
  box-shadow: none;
  min-width: 16px;
  width: 16px;
  height: 16px;
  background: none;
}
</style>
