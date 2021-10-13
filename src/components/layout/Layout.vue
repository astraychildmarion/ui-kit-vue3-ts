<template>
  <div class="xy-layout">
    <XYAppListDrawer
      v-show="!hideUI"
      :VER="VER"
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
          :manageAuth="manageAuth"
          :logoUrl="logoUrl"
          height="72"
          :manageMenu="manageMenu"
          :logoLink="logoLink"
          :userMenu="userMenu"
          :userInfo="userInfo"
          @clickTopLeftCorner="clickTopLeftCorner"
          @logOut="$emit('logOut')"
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
          v-if="!hideUI && !hideSider"
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
          v-if="!hideUI && !hideSider"
          v-model:collapsed="isSiderCollapse"
          breakpoint="xxl"
          collapsible
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
          <template #trigger>
            <div
              :style="{
                paddingLeft: '31px',
                textAlign: 'left',
                backgroundColor: '#051322',
              }"
            >
              <MenuUnfoldOutlined v-if="isSiderCollapse"/>
              <MenuFoldOutlined v-else/>
              <span v-show="!isSiderCollapse" :style="{ paddingLeft: '10px' }">Close</span>
            </div>
          </template>
        </LayoutSider>
        <LayoutContent>
          <slot name="content" />
        </LayoutContent>
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect  } from 'vue';
import { Layout } from 'ant-design-vue';
import XYHeader from './XYHeader.vue';
import XYSider from './Sider.vue';
import XYAppListDrawer from './ApplistDrawer.vue';

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
  },
  data() {
    return {
      fixLayoutStyle: {
        padding: '0',
        margin: '0',
        maxWidth: 'inherit',
      }
    }
  },
  emits: ['clickAppListDrawerMenu', 'clickMenu', 'onBreakpoint'],
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
      default() {
        return ['1'];
      },
    },
    siderData: {
      type: Array,
    },
    // app list drawer
    appListDrawerData: {
      type: Array,
    },
    selectAppListDrawerKey: {
      type: Array,
    },
    VER: {
      type: String,
    },
    // header
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
  setup(props, { emit }) {
    const isSiderCollapse = ref(false)
    const appListDrawerShow = ref(false)
    const selectedInnerKeys = ref(props.selectedKeys)
    
    function clickAppListDrawerMenu($event: Event) {
      emit('clickAppListDrawerMenu', $event);
    }
    function clickTopLeftCorner(boo: boolean) {
      console.log('click!@', boo);
      appListDrawerShow.value = !boo;
      console.log('appListDrawerShow.value', appListDrawerShow.value);
    }
    function clickMenu({ key }) {
      emit('clickMenu', key);
    }
    function siderCollapse(boo: boolean) {
      isSiderCollapse.value = !boo;
    }
    function onBreakpoint(broken) {
      emit('onBreakpoint', broken);
    }

    watchEffect(() => {
      selectedInnerKeys.value = props.selectedKeys;
    })

    return {
      isSiderCollapse,
      appListDrawerShow,
      selectedInnerKeys,
      clickAppListDrawerMenu,
      clickTopLeftCorner,
      clickMenu,
      siderCollapse,
      onBreakpoint
    }
  }
});
</script>

<style lang="scss" scoped>
.xy-layout {
  position: relative;
  :deep(.ant-layout-header) {
    padding: 0;
  }
}
</style>
