<template>
  <Drawer
    placement="left"
    v-model:visible="isDrawerShow"
    :mask="false"
    :closable="false"
    :width="256"
    :wrapStyle="{ marginTop: '72px' }"
    :bodyStyle="{ padding: '0px' }"
    @close="closeDrawer"
  >
    <div class="xy-applist-drawer__wrapper">
      <Menu
        mode="inline"
        :inline-collapsed="false"
        theme="light"
        @click="$emit('clickAppListDrawerMenu', $event)"
        class="xy-applist-drawer__first-item"
      >
        <MenuItem v-if="firstData.path" :key="firstData.key">
          <template #icon>
            <span class="fix-icon-position">
              <slot v-if="firstData.icon" :name="`appListDrawer_${firstData.icon}`" />
              <img v-if="firstData.iconPath" :src="firstData.iconPath" class="anticon" />
            </span>
          </template>
          <span>{{ firstData.name }}</span>
        </MenuItem>
        <Divider />
      </Menu>
      <Menu
        mode="inline"
        v-model:selectedKeys="selectedKeysInnerData"
        :inline-collapsed="false"
        theme="light"
        @click="$emit('clickAppListDrawerMenu', $event)"
      >
        <template v-for="item in restData">
          <MenuItem v-if="item.path" :key="item.key">
            <template #icon>
              <span class="fix-icon-position">
                <slot v-if="item.icon" :name="`appListDrawer_${item.icon}`" />
                <img v-if="item.iconPath" :src="item.iconPath" class="anticon" />
              </span>
            </template>
            <span>{{ item.name }}</span>
          </MenuItem>
        </template>
      </Menu>
      <div id="appVersion">
        <div>
          <div>{{ VER }}</div>
          <div>{{ uiKit.name }}: {{ uiKit.version }}</div>
        </div>
      </div>
    </div>
  </Drawer>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType } from 'vue';
import { Drawer, Menu } from 'ant-design-vue';
import { SiderData } from '../interface';
import packageJson from '../../../package.json';

export default defineComponent({
  name: 'XYAppListDrawer',
  components: {
    Drawer,
    Menu,
    MenuItem: Menu.Item,
    Divider: Menu.Divider,
  },
  emits: ['clickAppListDrawerMenu'],
  props: {
    selectedKeys: {
      type: Array,
      default: () => ['1'],
    },
    appListDrawerShow: {
      type: Boolean,
      default: false,
      required: true,
    },
    appListDrawerData: {
      type: Array as PropType<SiderData[]>,
      required: true,
    },
    selectAppListDrawerKey: {
      type: Array,
      default: () => ['1'],
    },
    VER: {
      type: String,
      default: 'default',
    },
  },
  setup(props) {
    const { version } = packageJson;
    const uiKit = {
      name: 'xy-cloud-kit-2',
      version,
    };
    const isDrawerShow = ref(props.appListDrawerShow);
    // get applist item
    const firstData = ref(props.appListDrawerData[0]);
    const selectedKeysInnerData = reactive(props.selectAppListDrawerKey);
    function appListDrawerData() {
      const copy = [...props.appListDrawerData];
      copy.shift();
      return copy;
    }
    const restData = appListDrawerData();

    function closeDrawer() {
      isDrawerShow.value = false;
    }

    watch(
      () => props.appListDrawerShow,
      (n) => {
        isDrawerShow.value = n;
      },
    );

    return {
      firstData,
      restData,
      isDrawerShow,
      closeDrawer,
      selectedKeysInnerData,
      uiKit,
    };
  },
});
</script>
<style lang="scss" scoped>
.xy-applist-drawer {
  &__wrapper {
    background-color: #f0f0f0;
    height: 100vh;
    :deep(.ant-menu) {
      &.ant-menu-inline-collapsed > .ant-menu-item .anticon,
      &.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title .anticon {
        line-height: 0;
      }
      &.ant-menu-inline-collapsed {
        > .ant-menu-item {
          text-align: center;
          padding: 0 24px !important;
        }
        > .ant-menu-submenu > .ant-menu-submenu-title {
          padding: 0 24px !important;
          text-align: center;
        }
      }
      .xy-sider__item {
        display: flex;
        align-items: center;
      }
      .ant-menu-item {
        min-height: 56px;
        line-height: 56px;
        margin-top: 0px;
        margin-bottom: 0px;
        &-divider {
          background-color: #969ca1;
          margin: 1px 16px;
        }
      }

      // light theme
      &.ant-menu-light {
        background: $sider-bg-light;
        color: $sider-item-text-light;
        &.xy-applist-drawer__first-item {
          padding-top: 16px;
          .ant-menu-item-selected {
            background: transparent;
            color: $sider-item-text-light;
            &::after {
              border-right: none;
              transform: scaleY(0);
              opacity: 0;
            }
          }
        }
        .ant-menu-item {
          a {
            color: $sider-item-text-light;
          }
          &-selected {
            background: $sider-item-selected-light;
            color: $sider-item-text-light;
            &::after {
              border-right: 4px solid $sider-item-selected-border-light;
              transform: scaleY(1);
              opacity: 1;
            }
          }
          &-active {
            background: $sider-item-active-light;
            color: $sider-item-text-light;
          }
          .anticon {
            margin-right: 9px;
            padding-left: 6px;
          }
        }
        .ant-menu-submenu {
          > .ant-menu {
            background-color: $sider-bg-light;
          }
        }
      }
    }
  }
}

#appVersion {
  display: flex;
  flex-direction: row;
  cursor: default;
  transition: 0.3s;
  position: fixed;
  bottom: 15px;
  color: transparent;
  padding: 0 32px !important;
  &:hover {
    color: #696969;
  }
}
</style>
