<template>
  <div class="xy-pencil-input">
    <div class="xy-pencil-input__text" v-if="!editMode">
      {{ inputText }}
      <div class="xy-pencil-input__icon" @click="clickPen">
        <EditOutlined style="color: #102e4d; font-size: 15px" />
      </div>
    </div>
    <div class="xy-pencil-input__wrapper">
      <Input v-if="editMode" v-model:value="editValue" @pressEnter="pressEnter" />
    </div>
    <div class="xy-pencil-input__icon-check" @click="pressEnter">
      <CheckOutlined
        style="color: #5c666f; font-size: 16px"
        v-if="editMode && editValue.length < 1"
      />
      <CheckOutlined
        style="color: #37c5a0; font-size: 16px"
        v-if="editMode && editValue.length > 0"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
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
  components: { Input, EditOutlined, CheckOutlined },
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
    display: inline-block;
    width: 400px;
  }
  &__text {
    font-weight: bold;
    color: $pencil-title-color;
    font-size: 24px;
  }
  &__icon {
    display: inline-block;
    font-weight: bold;
    margin-left: 10px;
    cursor: pointer;
  }
  &__icon-check {
    display: inline-block;
    padding: 5px 10px;
    cursor: pointer;
  }
}
</style>
