import {
  ProfileOutlined,
  DatabaseOutlined,
  HistoryOutlined,
  ControlOutlined,
  SmileOutlined,
  SkinOutlined,
  StarOutlined,
  SkypeOutlined,
  QqOutlined,
  MediumOutlined,
  AmazonOutlined,
  SketchOutlined,
} from '@ant-design/icons-vue';
import Sider from '../components/layout/Sider.vue';

export default {
  title: 'UI-KIT/Layout/Sider',
  component: Sider,
  argTypes: {
    theme: {
      control: { type: 'select', options: ['light', 'dark'] },
      description: 'Provide 2 themes, light one for default console page, dark for product pages.',
    },
    siderData: {
      control: 'array',
      description:
        "Data to render the sider's structure. Allow second layer of data as child. 'Icon' is for a-icon, 'name' is display name, 'to' is the router url",
    },
    collapsed: {
      description: 'A props to open or fold the sider.',
    },
    selectedKeys: {
      control: 'array',
      description: "Current selected menu item's key. It sould be synchronous with route.",
    },
    onClickMenu: {
      action: 'clickMenu',
      description:
        'Event name is `clickMenu`. Action triggered by clicking menu items. You can update `selectKey` by this function',
    },
  },
  args: {
    selectedKeys: ['1'],
    collapsed: false,
    siderData: [
      {
        icon: 'ControlOutlined',
        name: 'First',
        path: '/console',
        key: '1',
      },
      {
        icon: 'DatabaseOutlined',
        name: 'XY Compute',
        path: '/compute',
        key: '2',
      },
      {
        icon: 'ProfileOutlined',
        name: 'Request Manager',
        path: '/Chart',
        key: '3',
      },
      {
        icon: 'HistoryOutlined',
        name: 'History',
        path: '/history',
        key: '4',
      },
      // KEEP: to demo long sider
      {
        icon: 'SmileOutlined',
        name: 'XY Compute',
        path: '/compute',
        key: '5',
      },
      {
        icon: 'SkinOutlined',
        name: 'Request Manager',
        path: '/Chart',
        key: '6',
      },
      {
        icon: 'StarOutlined',
        name: 'Console',
        path: '/',
        key: '7',
      },
      {
        icon: 'SkypeOutlined',
        name: 'XY Compute',
        path: '/compute',
        key: '8',
      },
      {
        icon: 'QqOutlined',
        name: 'Request Manager',
        path: '/Chart',
        key: '9',
      },
      {
        icon: 'MediumOutlined',
        name: 'Console',
        path: '/',
        key: '10',
      },
      {
        icon: 'AmazonOutlined',
        name: 'Last 2',
        path: '/compute',
        key: '12',
      },
      {
        icon: 'SketchOutlined',
        name: 'Last 1',
        path: '/Chart',
        key: '13',
      },
    ],
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    Sider,
    ProfileOutlined,
    DatabaseOutlined,
    HistoryOutlined,
    ControlOutlined,
    SmileOutlined,
    SkinOutlined,
    StarOutlined,
    SkypeOutlined,
    QqOutlined,
    MediumOutlined,
    AmazonOutlined,
    SketchOutlined,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <sider v-bind="args" >
    <template #sider_ControlOutlined>
      <ProfileOutlined />
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
  </sider>
  `,
});

export const Default = Template.bind({});
Default.args = {
  selectedKeys: ['3'],
};
