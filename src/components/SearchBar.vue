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
import { SearchBarTargetType } from './interface';

export default defineComponent({
  components: { Input, SearchOutlined },
  emits: ['searchBarEnter'],
  setup(props, { emit }) {
    const searchContent = ref<string>('');
    function searchBarEnter({ target }: SearchBarTargetType) {
      emit('searchBarEnter', target.value);
    }
    return {
      searchContent,
      searchBarEnter,
    };
  },
});
</script>
