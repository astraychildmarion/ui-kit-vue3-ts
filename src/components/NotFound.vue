<template>
  <div class="not-found-page">
    <div class="not-found-page__content">
      <Space align="center" direction="vertical" size="large">
        <img src="@/assets/XY-cloud-img.svg" />
        <img src="@/assets/404.svg" />
        <Button type="primary" @click="clickBtn">{{ propsButtonText }}</Button>
      </Space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Button, Space } from 'ant-design-vue';

export default defineComponent({
  name: 'XYNotFoundPage',
  components: { Button, Space },
  props: {
    buttonText: {
      type: String,
      default: 'Back to home',
    },
  },
  emits: ['clickBtn'],

  setup(props: any, { emit }) {
    const propsButtonText = ref(props.buttonText);

    const clickBtn = () => {
      emit('clickBtn');
    };

    watch(
      () => props.buttonText,
      (val) => {
        propsButtonText.value = val;
      },
    );
    return {
      clickBtn,
      propsButtonText,
    };
  },
});
</script>

<style lang="scss">
.not-found-page {
  background: white;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 1199px) {
    min-height: 90vh;
  }

  @media (min-width: 1200px) and (max-width: 1599px) {
    min-height: 90vh;
  }

  @media (min-width: 1600px) and (max-width: 1699px) {
    min-height: 90vh;
  }

  @media (min-width: 1700px) and (max-width: 2000px) {
    min-height: 88vh;
  }

  @media only screen and (min-width: 2001px) {
    min-height: 94vh;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
