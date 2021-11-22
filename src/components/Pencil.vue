<template>
  <div class="xy-pencil-input">
    <div class="xy-pencil-input__text" v-if="!editMode">
      {{ inputText }}
    </div>
    <div class="xy-pencil-input__icon" @click="clickPen" v-if="!editMode">
      <EditOutlined style="color: #102e4d; font-size: 15px" />
    </div>
    <div class="xy-pencil-input__wrapper" v-if="editMode">
      <TextArea
        showCount
        :maxlength="50"
        v-model:value="inputText"
        @pressEnter="pressEnter"
        :autosize="{ minRows: 1, maxRows: 2 }"
      />
    </div>
    <div class="xy-pencil-input__icon-check" @click="pressEnter">
      <CheckOutlined style="color: #37c5a0; font-size: 16px" v-if="editMode" />
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref, watch } from 'vue';
import { Input } from 'ant-design-vue';
import { EditOutlined, CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'XYPencilInput',
  props: {
    text: {
      required: true,
      type: String as PropType<string>,
    },
  },
  emits: ['pressEnter'],
  components: { TextArea: Input.TextArea, EditOutlined, CheckOutlined },
  setup(props, { emit }) {
    const inputText = ref<string>(props.text || '');
    const editMode = ref<boolean>(false);
    const clickPen = () => {
      editMode.value = true;
    };
    const pressEnter = () => {
      if (inputText.value.length > 50) {
        inputText.value = inputText.value.substring(0, 50);
      }
      emit('pressEnter', inputText.value);
      editMode.value = false;
    };
    watch(
      () => props.text,
      (n) => {
        inputText.value = n;
      },
    );
    return {
      inputText,
      editMode,
      clickPen,
      pressEnter,
    };
  },
});
</script>
<style lang="scss">
.xy-pencil-input .ant-input-textarea-show-count::after {
  font-size: 12px;
  display: inline-block !important;
  width: 45px;
}
.xy-pencil-input {
  display: flex;
  align-items: baseline;
  &__wrapper {
    .ant-input {
      width: 450px;
    }
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
  }
  &__icon-check {
    padding: 5px 10px;
    cursor: pointer;
  }
}
</style>
