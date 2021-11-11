<template>
  <div class="xy-calendar-day-wrapper">
    <div class="xy-calendar-day">
      <Days
        :cleanDayValue="cleanDayValue"
        :defaultValue="defaultDaysValue"
        @clickDayButton="clickDayButton"
        @changeDefaultValue="changeDaysDefault"
      />
    </div>
    <div class="xy-calendar-day">
      <RangePicker
        v-model:value="rangeValue"
        format="MMM-DD-YYYY"
        showTime
        :disabledDate="disabledDate"
        @ok="handlerRangePicker"
      >
        <template #suffixIcon>
          <CalendarOutlined />
        </template>
      </RangePicker>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref, watch } from 'vue';
import { DatePicker } from 'ant-design-vue';
import { CalendarOutlined } from '@ant-design/icons-vue';
/* eslint-disable import/no-extraneous-dependencies */
import moment, { Moment } from 'moment';
import Days from './Days.vue';

export default defineComponent({
  name: 'CalandarDays',
  components: { Days, RangePicker: DatePicker.RangePicker, CalendarOutlined },
  props: {
    defaultDaysValue: {
      type: String as PropType<string>,
      default: '7',
    },
    defaultRangePickerValue: {
      type: [] as PropType<[]>,
      default: [],
    },
  },
  emits: ['changeTime'],
  setup(props, { emit }) {
    const cleanDayValue = ref<boolean>(false);
    const rangeValue = ref<[]>([]);
    const daysValue = ref<[]>([]);
    const disabledDate = (current: Moment) => current && current > moment().endOf('day');
    const clickDayButton = (data: []) => {
      cleanDayValue.value = false;
      daysValue.value = data;
      rangeValue.value = [];
      emit('changeTime', data);
    };
    const changeDaysDefault = () => {};
    const handlerRangePicker = () => {
      if (rangeValue.value.length > 0) {
        cleanDayValue.value = true;
        const first = rangeValue.value.slice(0, 1);
        const last = rangeValue.value.slice(1, 2);
        const editValue = {
          start: first[0],
          end: last[0],
          dates: rangeValue.value,
        };
        emit('changeTime', editValue);
      }
    };
    watch(
      () => props.defaultRangePickerValue,
      (n) => {
        if (n.length > 0) {
          rangeValue.value = props.defaultRangePickerValue;
          cleanDayValue.value = true;
        }
      },
    );

    return {
      cleanDayValue,
      rangeValue,
      disabledDate,
      clickDayButton,
      changeDaysDefault,
      handlerRangePicker,
    };
  },
});
</script>
<style lang="scss">
.xy-calendar-day {
  &:first-child {
    margin-right: 8px;
  }
  &-wrapper {
    display: flex;
  }
}
.ant-calendar .ant-calendar-ok-btn {
  font-size: 0;
}

.ant-calendar .ant-calendar-ok-btn:after {
  content: 'Confirm';
  font-size: 14px; /* original font size */
}
</style>
