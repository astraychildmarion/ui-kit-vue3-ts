<template>
  <Input v-model:value="searchContent" id="xy-search-bar" @pressEnter="searchBarEnter">
    <template #prefix>
      <SearchOutlined />
    </template>
  </Input>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Input } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';

interface TargetType {
  target: { value: string };
}

export default defineComponent({
  components: { Input, SearchOutlined },
  emits: ['searchBarEnter'],
  setup(props, { emit }) {
    const searchContent = ref<string>('');
    function searchBarEnter({ target }: TargetType) {
      emit('searchBarEnter', target.value);
    }
    return {
      searchContent,
      searchBarEnter,
    };
  },
});
</script>
