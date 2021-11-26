<template>
  <Alert
    class="xy-alert"
    v-if="isShow"
    :type="alertType"
    :message="alertMsg"
    :style="alertType === 'success' ? successStyle : errorStyle"
    showIcon
    closable
    :afterClose="alertClose"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';
import { Alert } from 'ant-design-vue';

export default defineComponent({
  name: 'XYAlertMsg',
  components: {
    Alert,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    alertType: {
      type: String as PropType<'error' | 'success' | 'warning' | 'info'>,
      default: 'success',
    },
    alertMsg: {
      type: String,
    },
    seconds: {
      type: Number,
      default: 3,
    },
  },
  setup(props: any, { emit }) {
    const secondsToGo = ref<number>(0);

    const countDown = () => {
      // update seconds each time before start
      secondsToGo.value = props.seconds;
      const interval = setInterval(() => {
        secondsToGo.value -= 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        emit('update:isShow', false);
      }, secondsToGo.value * 1000);
    };

    const alertClose = () => {
      emit('update:isShow', false);
    };

    watch(
      () => props.isShow,
      (n) => {
        if (n && props.alertType === 'success') {
          countDown();
        }
      },
      { immediate: true },
    );

    return {
      alertClose,
      successStyle: {
        backgroundColor: '#c9fff1',
        borderColor: '#37c5a0',
        borderRadius: '4px',
      },
      errorStyle: {
        backgroundColor: '#fac7d3',
        borderColor: '#ef476f',
        borderRadius: '4px',
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.xy-alert {
  width: 395px;
  align-items: start;
  :deep(.ant-alert-close-icon) {
    padding-top: 4px;
  }
  :deep(.ant-alert-icon) {
    padding-top: 5px;
  }
  :deep(.ant-alert-message) {
    font-size: 14px;
    line-height: 1.57;
    color: rgba(5, 19, 34, 0.65);
    margin-left: 5px;
    margin-right: 5px;
    text-align: left;
  }

  :deep(.ant-alert-success .ant-alert-icon) {
    color: #37c5a0;
  }

  :deep(.ant-alert-error .ant-alert-icon) {
    color: #fac7d3;
  }
}
</style>
