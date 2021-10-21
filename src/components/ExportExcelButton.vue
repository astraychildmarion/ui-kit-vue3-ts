<template>
  <Dropdown :trigger="['click']" class="xy-export-excel__wrapper">
    <template #overlay>
      <Menu @click="click">
        <template v-for="item in exportExcelOption" :key="item.value">
          <MenuItem>{{ item.title }}</MenuItem>
        </template>
      </Menu>
    </template>
    <Button :loading="loading">
      <template #icon>
        <ExportOutlined />
      </template>
      <span class="xy-export-excel--media-query">Export excel</span>
    </Button>
  </Dropdown>
</template>
<script lang="ts">
import { PropType } from 'vue';
import { Dropdown, Button, Menu } from 'ant-design-vue';
import { ExportOutlined } from '@ant-design/icons-vue';

interface DropdownData {
  title: string;
  value: string;
}
interface MenuClickType {
  item: object;
  key: string;
  keyPath: string;
}
export default {
  name: 'ExportExcelButton',
  components: { Dropdown, Button, Menu, MenuItem: Menu.Item, ExportOutlined },
  emits: ['clickExport'],
  props: {
    loading: {
      default: false,
      type: Boolean,
    },
    exportExcelOption: {
      type: Array as PropType<DropdownData[]>,
      default() {
        return [
          { title: 'All Servers', value: '1' },
          { title: 'Current Environment', value: '2' },
          { title: 'Filtered Result', value: '3' },
        ];
      },
    },
  },
  methods: {
    click({ key }: MenuClickType) {
      this.$emit('clickExport', key);
    },
  },
};
</script>
<style lang="scss" scoped>
.xy-export-excel--media-query {
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
</style>
