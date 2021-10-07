<template>
  <button type="button" :class="classes" @click="onClick" :style="style">{{ label }}</button>
</template>

<script lang="ts">
import './button.css';
import { reactive, computed } from 'vue';

export default {
  name: 'my-button',
  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  emits: ['click'],

  setup(props, { emit }) {
    const componentProps = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-button': true,
        'storybook-button--primary': componentProps.primary,
        'storybook-button--secondary': !componentProps.primary,
        [`storybook-button--${componentProps.size || 'medium'}`]: true,
      })),
      style: computed(() => ({
        backgroundColor: componentProps.backgroundColor,
      })),
      onClick() {
        emit('click');
      }
    }
  },
};
</script>
