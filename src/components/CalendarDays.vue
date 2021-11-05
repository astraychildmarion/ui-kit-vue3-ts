<template>
  <Days :cleanDayValue="cleanDayValue" :defaultValue="defaultDaysValue" />
  <RangePicker v-model:value="rangeValue" format="MM-DD-YYYY" :disabledDate="disabledDate">
    <template #suffixIcon>
      <CalendarOutlined />
    </template>
  </RangePicker>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
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
  emits: ['filterChange'],
  setup() {
    const cleanDayValue = ref<boolean>(false);
    const rangeValue = ref<[]>([]);
    const disabledDate = (current: Moment) => current && current > moment().endOf('day');
    return {
      cleanDayValue,
      rangeValue,
      disabledDate,
    };
  },
});
</script>
