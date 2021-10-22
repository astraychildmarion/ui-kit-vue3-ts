<template>
  <Button @click="$emit('clickRefresh')">
    Reload
    <template #icon>
      <ReloadOutlined />
    </template>
  </Button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import { ReloadOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  emits: ['clickRefresh'],
  components: {
    Button,
    ReloadOutlined,
  },
});
</script>

<style lang="scss" scoped></style>
