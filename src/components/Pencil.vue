<template>
  <div class="xy-pencil-input">
    <div class="xy-pencil-input__show">
      <div class="xy-pencil-input__text" v-if="!editMode">
        {{ showText }}
      </div>
      <div class="xy-pencil-input__icon" @click="clickPen" v-if="!editMode">
        <EditOutlined style="color: #102e4d; font-size: 15px" />
      </div>
    </div>
    <div class="xy-pencil-input__wrapper" v-show="editMode">
      <TextArea
        showCount
        :maxlength="100"
        v-model:value="inputText"
        @pressEnter="pressEnter"
        :autosize="{ minRows: 1, maxRows: 3 }"
      />
    </div>
    <div class="xy-pencil-input__icon-wrapper" v-if="editMode">
      <div class="xy-pencil-input__icon-check" @click="pressCancel">
        <CloseOutlined style="color: #ef476f; font-size: 16px" />
      </div>
      <div class="xy-pencil-input__icon-check" @click="pressEnter">
        <CheckOutlined style="color: #37c5a0; font-size: 16px" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref, watch, onMounted } from 'vue';
import { Input } from 'ant-design-vue';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'XYPencilInput',
  props: {
    text: {
      required: true,
      type: String as PropType<string>,
    },
  },
  emits: ['pressEnter'],
  components: { TextArea: Input.TextArea, EditOutlined, CheckOutlined, CloseOutlined },
  setup(props, { emit }) {
    const showText = ref<string>(props.text);
    const inputText = ref<string>('');
    const editMode = ref<boolean>(false);
    const clickPen = () => {
      editMode.value = true;
      inputText.value = showText.value;
    };
    const pressEnter = () => {
      if (inputText.value.length > 100) {
        inputText.value = inputText.value.substring(0, 100);
      }
      emit('pressEnter', inputText.value);
      editMode.value = false;
    };
    const pressCancel = () => {
      editMode.value = false;
      inputText.value = '';
    };
    watch(
      () => props.text,
      (n) => {
        showText.value = n;
      },
    );

    onMounted(() => {
      const target = document.querySelector('.xy-pencil-input .ant-input-textarea textarea');
      target?.addEventListener('keyup', (event: any) => {
        if (event.code === 'Escape') pressCancel();
      });
    });
    return {
      showText,
      inputText,
      editMode,
      clickPen,
      pressEnter,
      pressCancel,
    };
  },
});
</script>
<style lang="scss">
.xy-pencil-input .ant-input-textarea-show-count::after {
  font-size: 12px;
  margin-right: 72px;
  margin-top: 5px;
  height: 19px;
}
.xy-pencil-input {
  position: relative;
  &__show {
    display: flex;
    align-items: center;
  }
  &__wrapper {
    width: 450px;
  }
  &__text {
    font-weight: bold;
    color: $pencil-title-color;
    font-size: 24px;
    max-width: 850px;
    line-break: anywhere;
  }
  &__icon {
    font-weight: bold;
    margin-left: 10px;
    cursor: pointer;
    &-wrapper {
      display: flex;
      position: relative;
      top: -24px;
      left: 382px;
      font-size: 16px;
      line-height: 21px;
    }
  }
  &__icon-check {
    padding: 4px 8px;
    cursor: pointer;
    border: $box-border;
  }
}
</style>
