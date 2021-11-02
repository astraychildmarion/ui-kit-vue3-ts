<template>
  <Alert
    v-if="propsisShow"
    :type="alertType"
    :message="alertMsg"
    :style="alertType === 'success' ? successStyle : errorStyle"
    showIcon
    closable
    :afterClose="handleClose"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
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
      type: String,
    },
    alertMsg: {
      type: String,
    },
  },
  setup(props: any) {
    console.log('props=>', props);
    const propsisShow = ref(props.isShow);
    const propsAlertType = ref(props.alertType);

    const countDown = () => {
      let secondsToGo = 3;
      const interval = setInterval(() => {
        secondsToGo -= 1;
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        propsisShow.value = false;
        console.log(propsisShow.value, interval);
      }, secondsToGo * 1000);
    };

    const showCustomizeDisplay = () => {
      propsisShow.value = true;
      if (propsisShow.value && propsAlertType.value === 'success') {
        countDown();
      }
    };
    const handleClose = () => {
      propsisShow.value = false;
    };

    watch(
      () => propsisShow.value,
      (NewVal) => {
        console.log('alertTtl watch visible=>', NewVal);
        if (propsisShow.value && propsAlertType.value === 'success') {
          countDown();
        }
      },
      { immediate: true },
    );

    return {
      showCustomizeDisplay,
      handleClose,
      propsisShow,
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
:deep(.ant-alert-message) {
  font-size: 14px;
  line-height: 1.57;
  color: rgba(5, 19, 34, 0.65);
  margin-left: 5px;
  margin-right: 5px;
}

:deep(.ant-alert-success .ant-alert-icon) {
  color: #37c5a0;
}

:deep(.ant-alert-error .ant-alert-icon) {
  color: #fac7d3;
}
</style>
