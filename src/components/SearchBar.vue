<template>
  <div class="xy-search-bar__wrapper">
    <Input
      v-model:value="searchContent"
      id="xy-search-bar"
      @pressEnter="searchBarEnter"
      @change="searchBarChange"
      :placeholder="placeholder"
      allow-clear
    >
      <template #suffix>
        <SearchOutlined :style="{ color: '#9c9c9c' }" v-show="searchContent.length < 1" />
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
  emits: ['searchBarEnter', 'searchBarChange'],
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
    function searchBarChange({ target }: SearchBarTargetType) {
      emit('searchBarChange', target.value);
    }
    return {
      searchContent,
      searchBarEnter,
      searchBarChange,
    };
  },
});
</script>
<style lang="scss">
input.ant-calendar-input::placeholder,
input.ant-calendar-range-picker-input::placeholder,
input.ant-input::placeholder,
.ant-select-selection-search input.ant-select-selection-search-input::placeholder {
  color: $placeholder-color;
}
</style>
<style lang="scss" scoped>
.xy-search-bar {
  &__wrapper {
    width: 224px;
  }
}
</style>
