<template>
  <div class="xy-confirm-modal__ref" ref="divref"></div>
  <div>
    <Modal
      v-model:visible="propsisShow"
      :closable="false"
      :maskClosable="false"
      :keyboard="false"
      width="416px"
      class="xy-confirm-modal"
      :getContainer="getContainer"
    >
      <div class="ant-modal-confirm-body-wrapper">
        <span class="ant-modal-confirm-body">
          <ExclamationCircleOutlined :class="typeStyle" />
          <Space size="small" direction="vertical">
            <span class="ant-modal-confirm-title">{{ title }}</span>
            <span class="ant-modal-confirm-content">{{ content }}</span>
          </Space>
        </span>
      </div>
      <template #footer>
        <Button @click="handleCancel">Cancel</Button>
        <Button @click="handleOk" :class="typeStyle">Confirm</Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { Modal, Space, Button } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'XYConfirmModal',
  emits: ['clickConfirm'],
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
      type: String as PropType<'error' | 'success' | 'warning' | 'info'>,
      default: 'error',
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  setup(props: any, { emit }) {
    const propsisShow = ref(props.isShow);
    const divref = ref(null);
    const propsConfirmType = ref(props.confirmType);
    const getContainer = () => divref.value;
    const showModal = () => {
      propsisShow.value = true;
    };
    const handleCancel = () => {
      propsisShow.value = false;
    };
    const handleOk = () => {
      emit('clickConfirm');
      propsisShow.value = false;
    };
    const ConfirmStyle = (ConfirmType: any) => {
      switch (ConfirmType) {
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
    const typeStyle = ConfirmStyle(propsConfirmType.value);

    return {
      showModal,
      getContainer,
      handleCancel,
      handleOk,
      typeStyle,
      divref,
      propsisShow,
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
    color: #ed952e;
    &.ant-btn {
      color: #fff;
      background-color: #ed952e;
      border-color: #ed952e;
    }
  }
  &__error {
    color: #ef476f;
    &.ant-btn {
      color: #fff;
      background-color: #ef476f;
      border-color: #ef476f;
    }
  }
  &__info {
    color: #0488c5;
    &.ant-btn {
      color: #fff;
      background-color: #0488c5;
      border-color: #0488c5;
    }
  }
  &__success {
    color: #37c5a0;
    &.ant-btn {
      color: #fff;
      background-color: #37c5a0;
      border-color: #37c5a0;
    }
  }
}
</style>
