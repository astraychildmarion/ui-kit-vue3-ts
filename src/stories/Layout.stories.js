import {
  TeamOutlined,
  SmileOutlined,
  ControlOutlined,
  ProfileOutlined,
  DatabaseOutlined,
  HistoryOutlined,
  SkinOutlined,
  StarOutlined,
  SkypeOutlined,
  QqOutlined,
  MediumOutlined,
  AmazonOutlined,
  SketchOutlined,
} from '@ant-design/icons-vue';
import XYAppLayout from '../components/layout/Layout.vue';
import * as appListData from './ApplistDrawer.stories';
import * as siderData from './Sider.stories';

export default {
  title: 'UI-KIT/Layout/AppLayout',
  component: XYAppLayout,
  parameters: {
    docs: {
      description: {
        component:
          'The component include appListDrawer, sider and header. Please take note that it need use slot to show ant-design-icon. Please see icon usage.',
      },
    },
  },
  argTypes: {
    // Sider data
    siderData: {
      control: 'array',
      description:
        "Data to render the sider's structure. Allow second layer of data as child. 'Icon' is for a-icon, 'name' is display name, 'to' is the router url",
    },
    selectedKeys: {
      control: 'array',
      description: "Current selected menu item's key. It sould be synchronous with route.",
    },
    // App drawer list data
    appListDrawerData: {
      control: 'array',
      description:
        'An array to render app list drawer. It needs 3 attributes in each object: name, path, icon. If you need to use icon file, please use iconPath.',
    },
    selectAppListDrawerKey: {
      control: 'array',
      description: "Current selected app list drawer item's key. It sould be simulated with route.",
    },
    VER: {
      control: 'array',
      description: 'To identify the version of current product.',
    },
    // header data
    manageAuth: {
      control: 'boolean',
      description: 'Authority/Permission to show the Manage section.',
    },
    logoUrl: {
      control: 'text',
      description: 'A logo link',
    },
    logoLink: {
      control: 'text',
      description: 'A href for logo.',
    },
    manageMenu: {
      control: 'array',
      description: 'Menu items of manage menu, including item text and link',
    },
    userMenu: {
      control: 'array',
      description: 'User items of user menu, including item text, link and icon key',
    },
    userInfo: {
      control: 'object',
      description:
        'User information, including user name and avatar. Avatar is ant design avatar, please prepare content you want to show.',
    },
    hideUI: {
      control: 'boolean',
      description: 'To hide header and sider of applayout.',
    },
    hideSider: {
      control: 'boolean',
      description: 'To hide sider of applayout.',
    },
    // app drawer list action
    onClickAppListDrawerMenu: {
      action: 'clickAppListDrawerMenu',
      description:
        "Event name is `clickAppListDrawerMenu`. Triggered after user clicked app list drawer's item, it would return path of clicked item.",
    },
    // sider action
    onClickMenu: {
      action: 'clickMenu',
      description:
        "Event name is `clickMenu`. Triggered after user clicked sider's item, it would return path of clicked item.",
    },
    // header action
    onLogOut: {
      action: 'logOut',
      description: 'Event name is `logOut`. Emit function for logout',
    },
    content: {
      type: 'component',
      description: 'Slot reserve for app content.',
    },
  },
};

const Template = (args) => ({
  components: {
    XYAppLayout,
    ControlOutlined,
    TeamOutlined,
    ProfileOutlined,
    DatabaseOutlined,
    HistoryOutlined,
    SmileOutlined,
    SkinOutlined,
    StarOutlined,
    SkypeOutlined,
    QqOutlined,
    MediumOutlined,
    AmazonOutlined,
    SketchOutlined,
  },
  setup() {
    return { args };
  },
  template: `
    <XYAppLayout v-bind="args">
      <template #appListDrawer_control>
        <ControlOutlined />
      </template>

      <template #sider_ControlOutlined>
        <ControlOutlined />
      </template>
      <template #sider_DatabaseOutlined>
        <DatabaseOutlined />
      </template>
      <template #sider_ProfileOutlined>
        <ProfileOutlined />
      </template>
      <template #sider_HistoryOutlined>
        <HistoryOutlined />
      </template>
      <template #sider_SmileOutlined>
        <SmileOutlined />
      </template>
      <template #sider_SkinOutlined>
        <SkinOutlined />
      </template>
      <template #sider_StarOutlined>
        <StarOutlined />
      </template>
      <template #sider_SkypeOutlined>
        <SkypeOutlined />
      </template>
      <template #sider_QqOutlined>
        <QqOutlined />
      </template>
      <template #sider_MediumOutlined>
        <MediumOutlined />
      </template>
      <template #sider_AmazonOutlined>
        <AmazonOutlined />
      </template>
      <template #sider_SketchOutlined>
        <SketchOutlined />
      </template>

      <template #userMenu_team>
        <TeamOutlined />
      </template>
      <template #manageMenu_smile >
        <SmileOutlined />
      </template>

      <template #content>
        <div style="padding: 100px;height: 100vh">
          <h1>hello world</h1>
          <p>welcome to xy-cloud-ui-kit</p>
        </div>
      </template>
    </XYAppLayout>
  `,
});

export const Default = Template.bind({});
Default.args = {
  hideUI: false,
  hideSider: false,
  manageAuth: true,
  // selectAppListDrawerKey: ['3'],
  selectedKeys: ['3'],
  logoUrl: '/logo.svg',
  logoLink: 'https://alpha.xycloud.org/',
  manageMenu: [
    { name: 'Role Manage (IAM)', url: '#', icon: 'sketch' },
    { name: 'XY IAM', url: '#', icon: 'heat-map' },
  ],
  userMenu: [{ name: 'Member', url: '#', icon: 'team' }],
  userInfo: {
    name: 'System User',
    avatar: 'SU',
  },
  siderData: [...siderData.default.args.siderData],
  appListDrawerData: [...appListData.Default.args.appListDrawerData],
  VER: '2.0.0',
};
