<template>
  <div class="xy-confirm-modal__ref" ref="divref"></div>
  <div>
    <Modal
      v-model:visible="propsIsShow"
      :closable="false"
      :maskClosable="false"
      :keyboard="false"
      centered
      width="416px"
      :getContainer="getContainer"
    >
      <div class="ant-modal-confirm-body-wrapper">
        <Space size="middle" align="start" class="ant-modal-confirm-body">
          <ExclamationCircleOutlined :class="typeStyle" style="font-size: 22px" />
          <Space size="small" direction="vertical">
            <span class="ant-modal-confirm-title">{{ title }}</span>
            <span class="ant-modal-confirm-content">{{ content }}</span>
          </Space>
        </Space>
      </div>
      <template #footer>
        <Button @click="handleCancel">{{ cancelButtonText }}</Button>
        <Button @click="handleOk" :class="typeStyle">{{ confirmButtonText }}</Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Modal, Space, Button } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'XYConfirmModal',
  emits: ['clickConfirm', 'clickCancel'],
  components: {
    Modal,
    Space,
    ExclamationCircleOutlined,
    Button,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    confirmType: {
      type: String,
      default: 'error',
    },
    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    confirmButtonText: {
      type: String,
      default: 'Confirm',
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  setup(props: any, { emit }) {
    const propsIsShow = ref(props.isShow);
    const divref = ref(null);
    const getContainer = () => divref.value;

    const handleOk = () => {
      emit('clickConfirm');
    };
    const handleCancel = () => {
      emit('clickCancel');
    };

    const SetConfirmStyle = (confirmType: string) => {
      switch (confirmType) {
        case 'error':
          return 'confirm-modal__error';
        case 'warning':
          return 'confirm-modal__warning';
        case 'info':
          return 'confirm-modal__info';
        case 'success':
          return 'confirm-modal__success';
        default:
          return 'confirm-modal__error';
      }
    };

    const typeStyle = ref(SetConfirmStyle(props.confirmType));
    watch(
      () => props.confirmType,
      (n) => {
        typeStyle.value = SetConfirmStyle(n);
      },
    );
    watch(
      () => props.isShow,
      (n) => {
        propsIsShow.value = n;
      },
    );
    return {
      getContainer,
      handleCancel,
      handleOk,
      typeStyle,
      divref,
      propsIsShow,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.ant-modal-footer) {
  border-top: none;
}
.xy-confirm-modal__ref .confirm-modal {
  .ant-modal-confirm-title {
    border-bottom: none;
    font-weight: bold;
    font-size: 16px;
  }

  .ant-modal-confirm-content {
    background-color: #fff;
    color: #5c666f;
    font-size: 16px;
  }
  .ant-modal-body {
    background-color: #fff;
    padding: 24px;
  }
  &__warning {
    color: $warn-color;
    &.ant-btn {
      color: #fff;
      background-color: $warn-color;
      border-color: $warn-color;
    }
  }
  &__error {
    color: $error-color;
    &.ant-btn {
      color: #fff;
      background-color: $error-color;
      border-color: $error-color;
    }
  }
  &__info {
    color: $primary-color;
    &.ant-btn {
      color: #fff;
      background-color: $primary-color;
      border-color: $primary-color;
    }
  }
  &__success {
    color: $success-color;
    &.ant-btn {
      color: #fff;
      background-color: $success-color;
      border-color: $success-color;
    }
  }
}
</style>
