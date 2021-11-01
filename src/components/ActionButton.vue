<template>
  <Dropdown>
    <template #overlay>
      <Menu @click="handleMenuClick">
        <template v-for="option in actionInnerOption" :key="option.title">
          <template v-if="isTableInnerChecked">
            <MenuItem :title="option.title" :disabled="option.disabled" :key="option.title">
              {{ option.title }}
            </MenuItem>
          </template>
          <template v-else>
            <div class="action_tooltip">
              <Tooltip placement="left">
                <template #title>
                  <span>{{ tooltipText }}</span>
                </template>
                <MenuItem :title="option.title">
                  {{ option.title }}
                </MenuItem>
              </Tooltip>
            </div>
          </template>
        </template>
      </Menu>
    </template>
    <Button>
      Action
      <DownOutlined />
    </Button>
  </Dropdown>
</template>
<script lang="ts">
import { PropType, defineComponent, reactive, ref, watchEffect } from 'vue';
import { Button, Dropdown, Menu, Tooltip } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { ActionOptionType, ActionMenuClickType } from './interface';

export default defineComponent({
  props: {
    actionOption: {
      required: true,
      type: Array as PropType<ActionOptionType[]>,
    },
    isTableCheckbox: {
      required: true,
      default: false,
      type: Boolean as PropType<boolean>,
    },
  },
  emits: ['clickAction'],
  setup(props, { emit }) {
    let actionInnerOption = reactive(props.actionOption);
    const isTableInnerChecked = ref(props.isTableCheckbox);
    function handleMenuClick({ key }: ActionMenuClickType) {
      if (isTableInnerChecked.value) emit('clickAction', key);
    }
    watchEffect(() => {
      actionInnerOption = reactive(props.actionOption);
      isTableInnerChecked.value = props.isTableCheckbox;
    });
    return {
      handleMenuClick,
      actionInnerOption,
      isTableInnerChecked,
    };
  },
  data() {
    return {
      tooltipText: 'You need to select an item or more on the list.',
    };
  },
  components: {
    Button,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    Tooltip,
    DownOutlined,
  },
});
</script>

<style lang="scss" scoped>
.action_tooltip {
  :deep(.ant-dropdown-menu-item),
  :deep(.ant-dropdown-menu-submenu-title) {
    color: rgba(0, 0, 0, 0.25);
    cursor: default;
  }
  .ant-dropdown-menu-item:hover,
  .ant-dropdown-menu-submenu-title:hover {
    background-color: none;
  }
}
</style>
