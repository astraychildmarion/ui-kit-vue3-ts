<template>
  <div class="xy-pencil-input__wrapper">
    <div class="xy-pencil-input__text" v-if="!editMode">
      {{ inputText }}
      <div class="xy-pencil-input__icon" @click="clickPen">
        <EditOutlined style="color: #102e4d; font-size: 14px" />
      </div>
    </div>
    <Input v-if="editMode" v-model:value="editValue" @pressEnter="pressEnter">
      <template #suffix>
        <CheckCircleOutlined style="color: #5c666f" v-if="editValue.length < 1" />
        <CheckCircleOutlined style="color: #37c5a0" v-else />
      </template>
    </Input>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { Input } from 'ant-design-vue';
import { EditOutlined, CheckCircleOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'XYPencilInput',
  props: {
    text: {
      required: true,
      type: String as PropType<string>,
    },
  },
  emits: ['pressEnter'],
  components: { Input, EditOutlined, CheckCircleOutlined },
  setup(props, { emit }) {
    const inputText = ref<string>(props.text || '');
    const editMode = ref<boolean>(false);
    const editValue = ref<string>('');
    const clickPen = () => {
      editMode.value = true;
      editValue.value = inputText.value;
    };
    const pressEnter = () => {
      if (editValue.value.length < 1) return;
      inputText.value = editValue.value;
      emit('pressEnter', editValue.value);
      editMode.value = false;
    };
    return {
      inputText,
      editMode,
      editValue,
      clickPen,
      pressEnter,
    };
  },
});
</script>
<style lang="scss">
.xy-pencil-input {
  &__wrapper {
    width: 400px;
  }
  &__text {
    font-weight: 600;
    color: $pencil-title-color;
    font-size: 24px;
  }
  &__icon {
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
