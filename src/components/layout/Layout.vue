<template>
  <div class="xy-layout">
    <XYAppListDrawer
      v-show="!hideUI"
      :ver="ver"
      :appListDrawerData="appListDrawerData"
      :selectAppListDrawerKey="selectAppListDrawerKey"
      :appListDrawerShow="appListDrawerShow"
      @clickAppListDrawerMenu="clickAppListDrawerMenu"
    >
      <template v-for="item in appListDrawerData" #[`appListDrawer_`+item.icon]>
        <slot :name="`appListDrawer_` + item.icon" />
      </template>
    </XYAppListDrawer>
    <Layout :style="fixLayoutStyle">
      <LayoutHeader
        v-show="!hideUI"
        :style="{
          width: '100%',
          padding: '0',
          height: '72px',
          lineHeight: '72px',
          position: 'fixed',
          top: 0,
          zIndex: 999,
        }"
      >
        <XYHeader
          :bellCount="bellCount"
          :manageAuth="manageAuth"
          :logoUrl="logoUrl"
          height="72"
          :manageMenu="manageMenu"
          :logoLink="logoLink"
          :userMenu="userMenu"
          :userInfo="userInfo"
          @clickTopLeftCorner="clickTopLeftCorner"
          @logOut="$emit('logOut')"
          @clickBell="clickBell"
        >
          <template v-for="item in manageMenu" #[`manageMenu_`+item.icon]>
            <slot :name="`manageMenu_` + item.icon" />
          </template>
          <template v-for="item in userMenu" #[`userMenu_`+item.icon]>
            <slot :name="`userMenu_` + item.icon" />
          </template>
        </XYHeader>
      </LayoutHeader>
      <Layout :style="fixLayoutStyle">
        <LayoutSider
          v-show="!hideUI && !hideSider"
          v-model:collapsed="isSiderCollapse"
          breakpoint="xxl"
          collapsible
          collapsedWidth="72"
          width="256"
          :style="{
            height: '100%',
            top: '72px',
            visibility: 'hidden',
          }"
        />
        <LayoutSider
          v-show="!hideUI && !hideSider"
          v-model:collapsed="isSiderCollapse"
          breakpoint="xxl"
          collapsible
          :trigger="null"
          collapsedWidth="72"
          width="256"
          :style="{
            backgroundColor: '#051322',
            position: 'fixed',
            top: '72px',
            zIndex: 2,
          }"
          @breakpoint="onBreakpoint"
        >
          <XYSider
            theme="dark"
            v-model:selectedKeys="selectedInnerKeys"
            :siderData="siderData"
            :isSiderCollapse="isSiderCollapse"
            @clickMenu="clickMenu"
          >
            <template v-for="item in siderData" #[`sider_`+item.icon]>
              <slot :name="`sider_` + item.icon" />
            </template>
          </XYSider>
          <div class="ant-layout-sider-trigger" :style="collapseStyle" @click="handlerSider">
            <MenuUnfoldOutlined v-if="isSiderCollapse" />
            <MenuFoldOutlined v-else />
            <span v-show="!isSiderCollapse" :style="{ paddingLeft: '10px' }">Close</span>
          </div>
        </LayoutSider>
        <LayoutContent>
          <slot name="content" />
        </LayoutContent>
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, PropType } from 'vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { Layout } from 'ant-design-vue';
import XYHeader from './Header.vue';
import XYSider from './Sider.vue';
import XYAppListDrawer from './ApplistDrawer.vue';
import { SiderData, HeaderUserMenu, BellCardDataType } from '../interface';

export default defineComponent({
  name: 'XYAppLayout',
  components: {
    Layout,
    LayoutHeader: Layout.Header,
    LayoutSider: Layout.Sider,
    LayoutContent: Layout.Content,
    XYHeader,
    XYSider,
    XYAppListDrawer,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  data() {
    return {
      fixLayoutStyle: {
        padding: '0',
        margin: '0',
        maxWidth: 'inherit',
      },
    };
  },
  emits: ['clickAppListDrawerMenu', 'clickMenu', 'onBreakpoint', 'logOut', 'clickBell'],
  props: {
    hideUI: {
      type: Boolean,
      default: false,
    },
    hideSider: {
      type: Boolean,
      default: false,
    },
    // sider
    selectedKeys: {
      type: Array,
      default: () => ['1'],
    },
    siderData: {
      type: Array as PropType<SiderData[]>,
      required: true,
    },
    // app list drawer
    appListDrawerData: {
      type: Array as PropType<SiderData[]>,
      required: true,
    },
    selectAppListDrawerKey: {
      type: Array,
      default: () => [],
    },
    ver: {
      type: String,
    },
    // header
    logoUrl: {
      type: String,
      default: '',
      required: true,
    },
    logoLink: {
      type: String,
      default: '',
      required: true,
    },
    manageMenu: {
      type: Array as PropType<HeaderUserMenu[]>,
      default: () => [],
    },
    userMenu: {
      type: Array as PropType<HeaderUserMenu[]>,
      default: () => [],
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
    manageAuth: {
      type: Boolean,
      default: false,
    },
    bellCount: {
      type: Number,
      default: 0,
    },
    bellDataSource: {
      type: Array as PropType<BellCardDataType[]>,
      default: () => [],
    },
    bellDataStatus: {
      type: String as PropType<'loading' | 'compete' | 'ready'>,
      default: 'ready',
    },
  },
  setup(props, { emit }) {
    const isSiderCollapse = ref<boolean>(false);
    const appListDrawerShow = ref<boolean>(false);
    const selectedInnerKeys = ref(props.selectedKeys);

    function clickAppListDrawerMenu($event: Event) {
      emit('clickAppListDrawerMenu', $event);
    }
    function clickTopLeftCorner(boo: boolean) {
      appListDrawerShow.value = !boo;
    }
    function clickMenu({ key }: { key: string }) {
      emit('clickMenu', key);
    }
    function siderCollapse(boo: boolean) {
      isSiderCollapse.value = !boo;
    }
    function onBreakpoint(broken: boolean) {
      emit('onBreakpoint', broken);
    }
    function clickBell() {
      emit('clickBell');
    }
    function handlerSider() {
      isSiderCollapse.value = !isSiderCollapse.value;
    }
    const collapseStyle = computed(() => ({
      width: isSiderCollapse.value ? '72px' : '256px',
    }));

    watch(
      () => props.selectedKeys,
      (n) => {
        selectedInnerKeys.value = n;
      },
    );

    return {
      isSiderCollapse,
      appListDrawerShow,
      selectedInnerKeys,
      collapseStyle,
      handlerSider,
      clickAppListDrawerMenu,
      clickTopLeftCorner,
      clickMenu,
      siderCollapse,
      clickBell,
      onBreakpoint,
    };
  },
});
</script>

<style lang="scss" scoped>
.xy-layout {
  position: relative;
  :deep(.ant-layout-header) {
    padding: 0;
  }
}
.ant-layout-sider-trigger {
  background: #051322;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  padding-left: 31px;
  text-align: left;
}
</style>
