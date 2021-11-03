<template>
  <div class="xy-search-bar__wrapper">
    <Input
      v-model:value="searchContent"
      id="xy-search-bar"
      @pressEnter="searchBarEnter"
      :placeholder="placeholder"
    >
      <template #suffix>
        <SearchOutlined />
      </template>
    </Input>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Input } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { SearchBarTargetType } from './interface';

export default defineComponent({
  components: { Input, SearchOutlined },
  emits: ['searchBarEnter'],
  props: {
    placeholder: {
      default: 'Search on server list',
      type: String,
    },
  },
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
<style lang="scss" scoped>
.xy-search-bar {
  &__wrapper {
    width: 224px;
  }
}
</style>
