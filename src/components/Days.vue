<template>
  <div>
    <Space size="small">
      <RadioGroup
        :cleanDayValue="cleanDayInnerValue"
        :defaultValue="defaultInnerValue"
        button-style="solid"
        v-for="item in dayOption"
        :key="item.value"
        v-model:value="value"
      >
        <RadioButton @click="clickRadioButton" :value="item.value">{{ item.title }}</RadioButton>
      </RadioGroup>
    </Space>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';
import { Radio, Space } from 'ant-design-vue';
import { DayOption, DayClickRadioButtonEvent } from './interface';

export default defineComponent({
  name: 'XYDayButton',
  components: { RadioButton: Radio.Button, RadioGroup: Radio.Group, Space },
  emits: ['clickDayButton', 'changeDefaultValue'],
  props: {
    dayOption: {
      type: Array as PropType<DayOption[]>,
      default: () => [
        { title: '3d', value: '3' },
        { title: '5d', value: '5' },
        { title: '7d', value: '7' },
      ],
    },
    defaultValue: {
      type: String as PropType<string>,
      default: '7',
    },
    cleanDayValue: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { emit }) {
    const value = ref('') as any;
    const currentValue = ref('') as any;
    const defaultInnerValue = ref(props.defaultValue);
    const cleanDayInnerValue = ref(props.cleanDayValue);
    const emitChangeDefaultValue = (payload: any) => {
      emit('changeDefaultValue', payload);
    };

    const calculateDateObjsInRange = (amountOfDaysBefore: number) =>
      Array.from({ length: amountOfDaysBefore }, (_, index) => {
        const todayDateObj = new Date();
        const todayDate = todayDateObj.getDate();
        todayDateObj.setDate(todayDate - index);
        if (index > 0) {
          todayDateObj.setHours(0);
          todayDateObj.setMinutes(0);
          todayDateObj.setSeconds(0);
        }
        return new Date(todayDateObj);
      });

    const generateEventPayload = (val: any) => {
      const isNumber = (n: any) => typeof n === typeof 0;
      const amountOfDaysBefore = isNumber(val) ? val : parseInt(val, 10);
      let payload;
      if (isNumber(amountOfDaysBefore)) {
        const dateObjsInRange = calculateDateObjsInRange(amountOfDaysBefore);
        if (dateObjsInRange.length > 0) {
          payload = {
            start: dateObjsInRange[dateObjsInRange.length - 1],
            end: dateObjsInRange[0],
            dates: dateObjsInRange,
          };
        }
      }
      return payload;
    };

    const onClickDayButtonEvent = (val: string | object) => {
      const payload = generateEventPayload(val);
      emit('clickDayButton', payload);
    };

    const clickRadioButton = ({ target }: DayClickRadioButtonEvent) => {
      if (target.tagName === 'INPUT') {
        if (target.value === currentValue.value) {
          value.value = null;
          currentValue.value = null;
          onClickDayButtonEvent({});
        } else if (target.value !== currentValue) {
          currentValue.value = target.value;
          onClickDayButtonEvent(target.value);
        }
      }
    };
    watch(
      () => props.defaultValue,
      (n) => {
        if (n) {
          value.value = n;
          currentValue.value = n;
          const payload = generateEventPayload(n);
          emitChangeDefaultValue(payload);
        }
      },
      { immediate: true },
    );
    watch(
      () => props.cleanDayValue,
      (n) => {
        if (n) {
          value.value = null;
          currentValue.value = null;
        }
      },
    );

    return {
      value,
      currentValue,
      defaultInnerValue,
      cleanDayInnerValue,
      generateEventPayload,
      clickRadioButton,
      emitChangeDefaultValue,
      onClickDayButtonEvent,
    };
  },
});
</script>
