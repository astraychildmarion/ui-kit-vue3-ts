<template>
  <Alert
    class="xy-alert"
    :type="alertType"
    :message="alertMsg"
    :style="alertType === 'success' ? successStyle : errorStyle"
    showIcon
    :closable="closable"
  >
  </Alert>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { Alert } from 'ant-design-vue';

export default defineComponent({
  name: 'XYAlertMsg',
  components: {
    Alert,
  },
  props: {
    alertType: {
      type: String as PropType<'error' | 'success'>,
      default: 'success',
    },
    alertMsg: {
      type: String,
    },
  },
  setup(props: any) {
    const closable = computed(() => {
      if (props.alertType === 'success') {
        return false;
      }
      return true;
    });
    const indexClass = `alert-${props.alertIndex}`;
    return {
      indexClass,
      closable,
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
@keyframes remove {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
.xy-alert {
  width: 395px;
  align-items: start;
  margin-top: 16px;
  &.remove {
    animation: remove 0.5s;
  }
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
<style lang="scss">
.xy-alert-wrapper {
  position: fixed;
  left: 50%;
  top: 48px;
  z-index: 1000;
  transform: translateX(-50%);
}
</style>
