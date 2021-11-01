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
                  <span>{{ isCheckboxSelectedText }}</span>
                </template>
                <MenuItem :title="option.title" disabled>
                  {{ option.title }}
                </MenuItem>
              </Tooltip>
            </div>
          </template>
        </template>
        <!-- TODO in Resize: same os or different os -->
        <!-- <MenuItem title="Decom">
          Decom
        </MenuItem> -->
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
    actionType: {
      required: true,
      default: 'serverlist',
      type: String as PropType<'resize' | 'severlist'>,
    },
    actionOption: {
      required: true,
      type: Array as PropType<ActionOptionType[]>,
    },
    isTableCheckbox: {
      default: false,
      type: Boolean as PropType<boolean>,
    },
    isSameOS: {
      default: true,
      type: Boolean as PropType<boolean>,
    },
  },
  emits: ['clickAction'],
  setup(props, { emit }) {
    const isCheckboxSelectedText = 'You need to select an item or more on the list.';
    const isSameOSText = 'Batch resize only support the same OS.';
    let actionInnerOption = reactive(props.actionOption);
    const isTableInnerChecked = ref(props.isTableCheckbox);
    const isSameOSInner = ref(props.isSameOS);

    function handleMenuClick({ key }: ActionMenuClickType) {
      if (isTableInnerChecked.value) emit('clickAction', key);
    }
    watchEffect(() => {
      actionInnerOption = reactive(props.actionOption);
      isTableInnerChecked.value = props.isTableCheckbox;
      isSameOSInner.value = props.isSameOS;
    });
    return {
      handleMenuClick,
      actionInnerOption,
      isTableInnerChecked,
      isSameOSInner,
      isCheckboxSelectedText,
      isSameOSText,
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
:deep(.ant-dropdown-menu-item) {
  &:hover {
    background-color: $action-item-hover-bg;
  }
}
:deep(.ant-dropdown-menu-item-disabled) {
  &:hover {
    background-color: transparent;
  }
}
</style>
