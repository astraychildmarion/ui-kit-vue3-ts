<template>
  <Dropdown overlayClassName="xy-action-button">
    <template #overlay>
      <Menu @click="handleMenuClick">
        <template v-for="option in actionInnerOption" :key="option.title">
          <!-- saparate toolbar and single display -->
          <template v-if="!isToolbar">
            <MenuItem
              :title="option.title"
              :class="{ itemDisable: option.disabled }"
              :key="option.title"
            >
              {{ option.title }}
            </MenuItem>
          </template>
          <template v-else>
            <!-- saparate is checkbox cheked -->
            <template v-if="isTableInnerChecked">
              <div class="action_tooltip">
                <Tooltip
                  placement="left"
                  overlayClassName="tooltipCard"
                  :overlayStyle="handlerOverlayStyle(option.tooltipShow)"
                >
                  <template #title>
                    <span>{{ option.tooltipText }}</span>
                  </template>
                  <MenuItem
                    :title="option.title"
                    :class="{ itemDisable: option.disabled }"
                    :key="option.title"
                  >
                    {{ option.title }}
                  </MenuItem>
                </Tooltip>
              </div>
            </template>
            <template v-else>
              <div class="action_tooltip">
                <Tooltip placement="left">
                  <template #title>
                    <span>{{ isCheckboxSelectedText }}</span>
                  </template>
                  <MenuItem :title="option.title" class="itemDisable">
                    {{ option.title }}
                  </MenuItem>
                </Tooltip>
              </div>
            </template>
          </template>
        </template>
      </Menu>
    </template>
    <Button>
      Actions
      <DownOutlined />
    </Button>
  </Dropdown>
</template>
<script lang="ts">
import { PropType, defineComponent, ref, watchEffect } from 'vue';
import { Button, Dropdown, Menu, Tooltip } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
import { ActionOptionType, ActionMenuClickType } from './interface';

export default defineComponent({
  props: {
    isToolbar: {
      default: false,
      type: Boolean as PropType<boolean>,
    },
    actionOption: {
      required: true,
      type: Array as PropType<ActionOptionType[]>,
    },
    isTableCheckbox: {
      default: true,
      type: Boolean as PropType<boolean>,
    },
  },
  emits: ['clickAction'],
  setup(props, { emit }) {
    const isCheckboxSelectedText = 'One or more items from server list must be selected.';
    const actionInnerOption = ref(props.actionOption);
    const isTableInnerChecked = ref(props.isTableCheckbox);

    function handleMenuClick({ item }: ActionMenuClickType) {
      const isDisabled = item.class === 'itemDisable';
      if (isTableInnerChecked.value && !isDisabled) emit('clickAction', item.title);
    }
    function handlerOverlayStyle(tooltipShow: boolean) {
      const noshow = { visibility: 'hidden' };
      return tooltipShow ? undefined : noshow;
    }
    watchEffect(() => {
      actionInnerOption.value = props.actionOption;
      isTableInnerChecked.value = props.isTableCheckbox;
    });
    return {
      handleMenuClick,
      handlerOverlayStyle,
      actionInnerOption,
      isTableInnerChecked,
      isCheckboxSelectedText,
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
.xy-action-button .ant-dropdown-menu {
  :deep(.ant-dropdown-menu-item) {
    &.itemDisable {
      color: $action-item-disabled-text;
      background-color: transparent;
      cursor: default;
    }
    &:hover {
      background-color: $action-item-hover-bg;
      &.itemDisable {
        color: $action-item-disabled-text;
        background-color: transparent;
        cursor: default;
      }
    }
  }
}
</style>
