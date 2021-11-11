<template>
  <div class="xy-pencil-input">
    <div class="xy-pencil-input__text" v-if="!editMode">
      {{ inputText }}
      <div class="xy-pencil-input__icon" @click="clickPen">
        <EditOutlined style="color: #102e4d; font-size: 15px" />
      </div>
    </div>
    <div class="xy-pencil-input__wrapper">
      <Input v-if="editMode" v-model:value="inputText" @pressEnter="pressEnter" />
    </div>
    <div class="xy-pencil-input__icon-check" @click="pressEnter">
      <CheckOutlined
        style="color: #5c666f; font-size: 16px"
        v-if="editMode && inputText.length < 1"
      />
      <CheckOutlined
        style="color: #37c5a0; font-size: 16px"
        v-if="editMode && inputText.length > 0"
      />
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
  components: { Input, EditOutlined, CheckOutlined },
  setup(props, { emit }) {
    const inputText = ref<string>(props.text || '');
    const editMode = ref<boolean>(false);
    const clickPen = () => {
      editMode.value = true;
    };
    const pressEnter = () => {
      if (inputText.value.length < 1) return;
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
