<template>
  <div class="xy-header">
    <div class="xy-header__icon" @click="clickTopLeftCorner">
      <AppstoreOutlined :style="{ color: '#ffffff', fontSize: '24px' }" />
    </div>
    <div class="xy-header__container">
      <div class="xy-header__logo">
        <a :href="logoLink">
          <img :src="logoUrl" alt="XYCloud Logo" />
        </a>
      </div>
      <div class="xy-header__user">
        <div class="xy-header__user-notification">
          <Badge dot>
            <BellOutlined :style="bellStyle" />
          </Badge>
        </div>
        <Dropdown @visibleChange="(visible) => (manageMenuVisible = visible)" v-if="manageAuth">
          <a class="xy-header__user-manage ant-dropdown-link" href="#">
            Manage
            <UpOutlined :style="menuArrowStyle" v-if="manageMenuVisible" />
            <DownOutlined :style="menuArrowStyle" v-else />
          </a>
          <template #overlay>
            <div class="xy-header__user-manage__menu">
              <div
                v-for="(item, index) in manageMenu"
                :key="index"
                class="xy-header__user-manage__menu-item"
              >
                <a :href="item.url">
                  <span>{{ item.name }}</span>
                  <slot v-if="item.icon" :name="`manageMenu_${item.icon}`" />
                  <img v-if="item.iconPath" :src="item.iconPath" class="anticon" />
                </a>
              </div>
            </div>
          </template>
        </Dropdown>
        <Dropdown>
          <a class="xy-header__user-info ant-dropdown-link" href="#">
            <div class="xy-header__user-info__avatar">
              <Avatar>{{ userInfo.avatar }}</Avatar>
            </div>
            <div class="xy-header__user-info__name">{{ userInfo.name }}</div>
          </a>
          <template #overlay>
            <div class="xy-header__user-manage__menu">
              <div
                v-for="(item, index) in userMenu"
                :key="index"
                class="xy-header__user-manage__menu-item"
              >
                <a :href="item.url">
                  <span>{{ item.name }}</span>
                  <slot v-if="item.icon" :name="`userMenu_${item.icon}`" />
                  <img v-if="item.iconPath" :src="item.iconPath" class="anticon" />
                </a>
              </div>
              <div class="xy-header__user-manage__menu-item" @click="$emit('logOut')">
                <div>
                  <span>Log Out</span>
                  <LogoutOutlined />
                </div>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  LogoutOutlined,
  AppstoreOutlined,
  DownOutlined,
  UpOutlined,
  BellOutlined,
} from '@ant-design/icons-vue';
import { Dropdown, Avatar, Badge } from 'ant-design-vue';

export default defineComponent({
  name: 'XYHeader',
  components: {
    LogoutOutlined,
    AppstoreOutlined,
    DownOutlined,
    UpOutlined,
    BellOutlined,
    Dropdown,
    Avatar,
    Badge,
  },
  props: {
    logoUrl: {
      type: String,
      default: '',
    },
    logoLink: {
      type: String,
      default: '',
    },
    manageMenu: {
      type: Array,
      default() {
        return [];
      },
    },
    userMenu: {
      type: Array,
      default() {
        return [];
      },
    },
    userInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    manageAuth: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['clickTopLeftCorner', 'logOut'],
  setup(props, { emit }) {
    const manageMenuVisible = ref(false);
    const isDrawerClose = ref(true);
    function clickTopLeftCorner() {
      isDrawerClose.value = !isDrawerClose.value;
      emit('clickTopLeftCorner', isDrawerClose.value);
    }
    return {
      manageMenuVisible,
      isDrawerClose,
      clickTopLeftCorner,
    };
  },
  data() {
    return {
      menuArrowStyle: {
        marginLeft: '4.8px',
        fontSize: '10px',
        width: '12px',
      },
      bellStyle: {
        color: '#ffffff',
        fontSize: '18px',
      },
    };
  },
});
</script>

<style lang="scss" scoped>
a,
a:active,
a:hover {
  color: inherit;
}
.xy-header {
  height: 72px;
  display: grid;
  grid-template-columns: 72px 1fr;
  background-color: $header-bg;

  &__icon {
    cursor: pointer;
    background-color: $header-bar-icon-bg;
    display: grid;
    justify-content: center;
    align-content: center;
    height: 100%;
  }
  &__container {
    display: grid;
    grid-template-columns: min-content auto;
    padding-left: 32px;
  }
  &__logo {
    height: 72px;
    line-height: 72px;
  }
  &__user {
    justify-self: flex-end;
    display: flex;
    align-items: center;
  }

  &__user {
    color: $header-text;
    &-notification {
      display: grid;
      align-items: center;
      padding: 0 10px;
      height: 100%;
      cursor: pointer;
      &:hover {
        background-color: $header-hover-bg;
      }
    }
    &-info {
      min-width: 160px;
      display: flex;
      padding: 0 10px;
      flex-direction: row;
      align-items: center;
      height: 100%;
      &:hover {
        background-color: $header-hover-bg;
      }
      &__avatar {
        margin-right: 10px;
      }
    }

    &-manage {
      display: flex;
      padding: 0 10px;
      align-items: center;
      min-width: 100px;
      height: 100%;
      &:hover {
        background-color: $header-hover-bg;
      }
      &__icon {
        margin-left: 4.8px;
        font-size: 10px;
        width: 12px;
      }
    }
    &-manage__menu {
      margin-top: -4px;
      &-item {
        color: $header-text;
        height: 40px;
        line-height: 40px;
        background-color: $header-dropdown-bg;
        &:hover {
          background-color: $header-dropdown-hover-bg;
        }
        i {
          margin-left: 12.3px;
        }
        a,
        div {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
