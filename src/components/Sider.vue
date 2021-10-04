<template>
  <div class="xy-sider__wrapper" :style="collapseStyle">
    <div class="xy-sider__menu-wrapper__first">
      <Menu
        mode="inline"
        :inline-collapsed="collapsed"
        :theme="theme"
        @click="$emit('clickMenu', $event)"
      >
        <MenuItem v-if="firstData.path" :key="firstData.key">
          <slot v-if="firstData.icon" :name="firstData.icon" />
          <img v-if="firstData.iconPath" :src="firstData.iconPath" class="anticon" />
          <span>{{ firstData.name }}</span>
        </MenuItem>
        <Divider />
      </Menu>
    </div>
    <div class="xy-sider__menu-wrapper__second">
      <Menu
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="defaultOpenKeys"
        :inline-collapsed="collapsed"
        :theme="theme"
        @click="$emit('clickMenu', $event)"
      >
        <template v-for="item in restData">
          <MenuItem v-if="item.path" :key="item.key">
            <slot v-if="item.icon" :name="item.icon" /> 
            <img v-if="item.iconPath" :src="item.iconPath" class="anticon" />
            <span>{{ item.name }}</span>
          </MenuItem>
        </template>
      </Menu>
    </div>
  </div>
</template>
<script lang="ts">
  import { Menu } from 'ant-design-vue';
  import { ProfileOutlined } from '@ant-design/icons-vue';
  import { PropType } from 'vue';
  import { defineComponent } from 'vue'
  interface SiderData {
    icon: string,
    name: string,
    path: string,
    key: string,
  }
export default defineComponent({
  name: 'XYSider',
  emits:['clickMenu'],
  props: {
    theme: {
      type: String,
      default: 'light',
    },
    selectedKeys: {
      type: Array,
      default() {
        return ['1'];
      },
    },
    defaultOpenKeys: {
      type: Array,
    },
    siderData: {
      type: Array as PropType<SiderData[]>,
      required: true
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: String as PropType<string>,
    },
  },
  setup(props) {
    const firstData =  props.siderData[0];
    const restData = getRestData();
    function getRestData(){
      const copy = [...props.siderData];
      copy.shift();
      return copy;
    }
    return {
      firstData,
      restData
    }
  },
  components: {
    Menu,
    MenuItem: Menu.Item,
    Divider: Menu.Divider,
    ProfileOutlined
  },
  computed: {
    goToStyle() {
      return {
        '--goTo--color': this.theme === 'dark' ? '#ffffff' : '#3c3c3c',
      }
    },
    collapseStyle() {
      return {
        '--wrapper--width': this.collapsedWidth ? '72px' : '256px',
        '--wrapper--bg': this.theme === 'dark' ? '#051322' : '#f0f0f0',
      };
    },
  },
  methods: {
    goTo(val:string) {
      window.location.replace(val)
    },
  },
})
</script>
<style lang="scss" scoped>
.xy-sider {
  &__wrapper {
    width: var(--wrapper--width);
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
            margin: 0 16px 0 6px;
            color: $sider-item-icon-dark;
          }
        }
      }
      // light theme
      &.ant-menu-light {
        background: $sider-bg-light;
        color: $sider-item-text-light;

        .ant-menu-item {
          a {
            color: $sider-item-text-light;
          }
          &-selected {
            background: $sider-item-selected-light;
            color: $sider-item-text-light;
            &::after {
              border-right: 3px solid $sider-item-selected-border-light;
              transform: scaleY(1);
              opacity: 1;
            }
          }
          &-active {
            background: $sider-item-active-light;
            color: $sider-item-text-light;
          }
        }
        .ant-menu-submenu {
          > .ant-menu {
            background-color: $sider-bg-light;
          }
        }
      }
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
      .ant-menu.ant-menu-dark .ant-menu-item-selected {
        background-color: $sider-bg-dark;
        &::after {
          border-right: 0px solid $sider-item-selected-border-dark;
          transform: scaleY(0);
          opacity: 0;
        }
      }
    }
    &__second {
      padding-bottom: 56px;
      overflow: hidden overlay;
      height: calc(100vh - 140px)
    }
  }
  .goTo--style {
    color: var(--goTo--color);
  }
}
</style>
