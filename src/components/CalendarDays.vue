<template>
  <div class="xy-calendar-day-wrapper">
    <div class="xy-calendar-day">
      <Days
        :cleanDayValue="cleanDayValue"
        :defaultValue="defaultDaysValueInner"
        @clickDayButton="clickDayButton"
        @changeDefaultValue="changeDaysDefault"
      />
    </div>
    <div class="xy-calendar-day">
      <RangePicker
        v-model:value="rangeValue"
        :format="timeFormat"
        showTime
        :disabledDate="disabledDate"
        @ok="handlerRangePicker"
        @change="calendarChange"
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
      required: true,
      type: Array as PropType<Date[]>,
    },
    timeFormat: {
      type: String,
      default: 'MMM/DD/YYYY HH:mm:ss',
    },
  },
  emits: ['changeTime'],
  setup(props, { emit }) {
    const defaultDaysValueInner = ref<string>(props.defaultDaysValue);
    const cleanDayValue = ref<boolean>(false);
    const rangeValue = ref<any[]>([]);
    const daysValue = ref<object>([]);
    const disabledDate = (current: Moment) => current && current > moment().endOf('day');
    const clickDayButton = (data: { end: Date; start: Date; dates: any[] }) => {
      cleanDayValue.value = false;
      daysValue.value = data;
      if (data) {
        rangeValue.value = [moment(data.start), moment(data.end)];
      } else {
        rangeValue.value = [];
      }
      emit('changeTime', data);
    };
    const changeDaysDefault = () => {};
    const calendarChange = (dates: any) => {
      if (dates.length < 2) {
        const emptyDate = {
          start: null,
          end: null,
          dates: [],
        };
        emit('changeTime', emptyDate);
      }
    };

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
          defaultDaysValueInner.value = '';
          cleanDayValue.value = true;
        }
      },
      { immediate: true },
    );

    return {
      cleanDayValue,
      rangeValue,
      disabledDate,
      clickDayButton,
      changeDaysDefault,
      calendarChange,
      handlerRangePicker,
      defaultDaysValueInner,
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
  font-size: 0 !important;
}

.ant-calendar .ant-calendar-ok-btn:after {
  content: 'Confirm';
  font-size: 14px; /* original font size */
}
</style>
