<template>
  <div class="xy-sider__wrapper">
    <div className="xy-sider__menu-wrapper__first">
      <Menu mode="inline" theme="dark" @click="$emit('clickMenu', $event)">
        <MenuItem v-if="firstData.path" :key="firstData.key">
          <template #icon>
            <slot v-if="firstData.icon" :name="`sider_${firstData.icon}`"></slot>
            <img v-if="firstData.iconPath" :src="firstData.iconPath" className="anticon" />
          </template>
          <span>{{ firstData.name }}</span>
        </MenuItem>
        <Divider />
      </Menu>
    </div>
    <div class="xy-sider__menu-wrapper__second">
      <Menu
        mode="inline"
        :selectedKeys="selectedKeys"
        theme="dark"
        @click="$emit('clickMenu', $event)"
      >
        <template v-for="item in restData">
          <MenuItem v-if="item.path" :key="item.key">
            <template #icon>
              <slot v-if="item.icon" :name="`sider_${item.icon}`" />
              <img v-if="item.iconPath" :src="item.iconPath" class="anticon" />
            </template>
            <span>{{ item.name }}</span>
          </MenuItem>
        </template>
      </Menu>
    </div>
  </div>
</template>
<script lang="ts">
import { Menu } from 'ant-design-vue';
import { PropType, defineComponent, reactive, ref } from 'vue';
import { SiderData } from '../interface';

export default defineComponent({
  name: 'XYSider',
  emits: ['clickMenu'],
  props: {
    selectedKeys: {
      type: Array,
      default: () => ['1'],
    },
    siderData: {
      type: Array as PropType<SiderData[]>,
      required: true,
    },
  },
  setup(props) {
    const firstData = ref(props.siderData[0]);
    const selectedKeysInnerData = reactive(props.selectedKeys);
    function getRestData() {
      const copy = [...props.siderData];
      copy.shift();
      return copy;
    }
    const restData = getRestData();
    return {
      firstData,
      restData,
      selectedKeysInnerData,
    };
  },
  components: {
    Menu,
    MenuItem: Menu.Item,
    Divider: Menu.Divider,
  },
});
</script>
<style lang="scss" scoped>
.xy-sider {
  &__wrapper {
    max-width: 256px;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    :deep(.ant-menu) {
      &.ant-menu-inline-collapsed {
        width: 72px;
        > .ant-menu-item {
          padding: 0 24px !important;
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
      // dark theme
      &.ant-menu-dark {
        background-color: $sider-bg-dark;
        .ant-menu-item:hover {
          background-color: $sider-item-selected-dark;
        }
        .ant-menu-item {
          color: $sider-item-text-dark;
          a {
            color: $sider-item-text-dark;
          }
          &-selected {
            background-color: $sider-item-selected-dark;

            &::after {
              border-right: 4px solid $sider-item-selected-border-dark;
              transform: scaleY(1);
              opacity: 1;
            }
          }
          &-active {
            background-color: $sider-item-active-dark;
          }
          .anticon {
            margin: 5px;
            color: $sider-item-icon-dark;
          }
        }
      }
      // light theme
      // &.ant-menu-light {
      //   background: $sider-bg-light;
      //   color: $sider-item-text-light;

      //   .ant-menu-item {
      //     a {
      //       color: $sider-item-text-light;
      //     }
      //     &-selected {
      //       background: $sider-item-selected-light;
      //       color: $sider-item-text-light;
      //       &::after {
      //         border-right: 3px solid $sider-item-selected-border-light;
      //         transform: scaleY(1);
      //         opacity: 1;
      //       }
      //     }
      //     &-active {
      //       background: $sider-item-active-light;
      //       color: $sider-item-text-light;
      //     }
      //   }
      //   .ant-menu-submenu {
      //     > .ant-menu {
      //       background-color: $sider-bg-light;
      //     }
      //   }
      // }
    }
    ::-webkit-scrollbar {
      width: 5px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: rgba($sider-bg-dark, 0.2);
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(#ccc, 0.4);
      border-radius: 8px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(#ccc, 0.5);
    }
  }
  &__menu-wrapper {
    &__first {
      padding-top: 16px;
      :deep(.ant-menu.ant-menu-dark) .ant-menu-item-selected {
        background-color: $sider-bg-dark;
        &::after {
          border-right: 0px solid $sider-item-selected-border-dark;
          transform: scaleY(0);
          opacity: 0;
        }
      }
    }
    &__second {
      overflow: hidden overlay;
      height: calc(100vh - 195px);
    }
  }
  .goTo--style {
    color: #ffffff;
  }
}
</style>
