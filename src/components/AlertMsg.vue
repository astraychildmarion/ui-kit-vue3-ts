<template>
  <Alert
    class="xy-alert"
    v-if="isShow"
    :type="alertType"
    :message="alertMsg"
    :style="alertType === 'success' ? successStyle : errorStyle"
    showIcon
    :closable="closable"
    :afterClose="alertClose"
  >
  </Alert>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, PropType } from 'vue';
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
      type: String as PropType<'error' | 'success'>,
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
    const timer = ref<any>(null);
    const closable = computed(() => {
      if (props.alertType === 'success') {
        return false;
      }
      return true;
    });

    const cleanTimer = () => {
      clearInterval(timer.value);
      timer.value = null;
    };

    const alertClose = () => {
      emit('update:isShow', false);
    };

    const startCount = () => {
      if (timer.value) {
        cleanTimer();
      }
      secondsToGo.value = props.seconds;
      timer.value = setInterval(() => {
        if (secondsToGo.value === 0) {
          alertClose();
          cleanTimer();
        } else {
          secondsToGo.value -= 1;
        }
      }, 1000);
    };

    watch(
      () => props.isShow,
      (n) => {
        if (n && props.alertType === 'success') {
          if (timer.value) cleanTimer();
          startCount();
        } else if (timer.value) cleanTimer();
      },
      { immediate: true },
    );

    watch(
      () => props.alertType,
      (n) => {
        if (n === 'success') {
          if (timer.value) cleanTimer();
          startCount();
        } else if (timer.value) cleanTimer();
      },
      { immediate: true },
    );

    return {
      closable,
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
