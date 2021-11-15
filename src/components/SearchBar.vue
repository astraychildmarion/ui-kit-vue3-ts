<template>
  <div class="xy-search-bar__wrapper">
    <Dropdown>
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
      <template #overlay>
        <Menu @click="clickMenu" v-if="searchHistoryInner?.length !== 0">
          <MenuItem v-for="(item, index) in searchHistoryInner" :key="index" :value="item">
            {{ item }}
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from 'vue';
import { Input, Dropdown, Menu } from 'ant-design-vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { SearchBarTargetType, SearchBarDropdownType } from './interface';

export default defineComponent({
  components: { Input, SearchOutlined, Dropdown, Menu, MenuItem: Menu.Item },
  emits: ['searchBarEnter', 'searchBarChange', 'clickSearchbarMenu'],
  props: {
    placeholder: {
      default: 'Search on server list',
      type: String,
    },
    searchHistory: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const searchContent = ref<string>('');
    const searchHistoryInner = ref(props.searchHistory);
    function searchBarEnter({ target }: SearchBarTargetType) {
      emit('searchBarEnter', target.value);
    }
    function searchBarChange({ target }: SearchBarTargetType) {
      emit('searchBarChange', target.value);
    }
    function clickMenu({ item }: SearchBarDropdownType) {
      emit('clickSearchbarMenu', item.value);
      searchContent.value = item.value;
    }
    watch(
      () => props.searchHistory,
      (n) => {
        searchHistoryInner.value = n;
      },
    );
    return {
      searchContent,
      searchHistoryInner,
      clickMenu,
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
:deep(.ant-dropdown-menu-item) {
  &:hover {
    background-color: $dropdown-hover-bg;
  }
}
.xy-search-bar {
  &__wrapper {
    width: 224px;
  }
}
</style>
