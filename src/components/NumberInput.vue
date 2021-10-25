<template>
  <div class="vue-number-input">
    <Space :size="40">
      <Button :disabled="!decreasable" @click="decrease">
        <template #icon>
          <MinusOutlined />
        </template>
      </Button>
      <Space :size="40">
        <Input suffix="VM" style="width: 5rem" v-model:value="inputValue" @change="change" />
        <Button :disabled="!increasable" @click="increase">
          <template #icon>
            <PlusOutlined />
          </template>
        </Button>
      </Space>
    </Space>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { Button, Input, Space } from 'ant-design-vue';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'NumberInput',
  components: { Button, Input, Space, PlusOutlined, MinusOutlined },
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
  setup(props: any) {
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

    /**
     * Decrease the value.
     */
    const decrease = () => {
      inputValue.value -= 1;
    };
    /**
     * Increase the value.
     */
    const increase = () => {
      inputValue.value += 1;
    };
    const change = () => {
      if (inputValue.value > maxVal.value) {
        inputValue.value = maxVal.value;
      } else if (inputValue.value < minVal.value) {
        inputValue.value = minVal.value;
      }
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

.vue-number-input {
  display: block;
  font-size: 0;
  max-width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
