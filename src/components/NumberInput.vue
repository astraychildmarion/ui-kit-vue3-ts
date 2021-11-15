<template>
  <div class="xy-number-input-wrapper">
    <Space :size="40">
      <Button class="iconbtn" :disabled="!decreasable" @click="decrease">
        <template #icon>
          <MinusSquareOutlined />
        </template>
      </Button>
      <Space :size="40">
        <span class="vmqty">{{ inputValue }} VM</span>
        <Button class="iconbtn" @click="increase">
          <template #icon>
            <PlusSquareOutlined />
          </template>
        </Button>
      </Space>
    </Space>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { Button, Space } from 'ant-design-vue';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'NumberInput',
  components: { Button, Space, PlusSquareOutlined, MinusSquareOutlined },
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
  emits: ['clickChange'],
  setup(props: any, { emit }) {
    const inputValue = ref<number>(props.min);
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

    return {
      increase,
      decrease,
      inputValue,
      decreasable,
    };
  },
});
</script>

<style lang="scss" scoped>
.xy-number-input-wrapper {
  width: 180px;
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
  .vmqty {
    display: inline-block;
    width: 3rem;
    height: 22px;
    flex-grow: 0;
    margin: 0 9px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
    text-align: center;
    color: #5c666f;
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
}
</style>
