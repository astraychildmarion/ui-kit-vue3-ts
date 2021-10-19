import { ProfileOutlined, DatabaseOutlined, HistoryOutlined, ControlOutlined } from '@ant-design/icons-vue';
import Sider from '../components/Sider.vue';

export default {
  title: 'UI-KIT/Sider',
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
    collapsedWidth: {
      description: "A props to set sider's width. Just give the same property as collapsed.",
    },
    selectedKeys: {
      control: 'array',
      description: "Current selected menu item's key. It sould be synchronous with route.",
    },
    defaultOpenKeys: {
      control: 'array',
      description: "Select a sub menu item's key beforehand",
    },
    onClickMenu: {
      action: 'clickMenu',
      description:
        'Action triggered by clicking menu items. You can update `selectKey` by this function',
    }
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
      // {
      //   icon: 'SmileOutlined',
      //   name: 'XY Compute',
      //   path: '/compute',
      //   key: '5',
      // },
      // {
      //   icon: 'skinOutlined',
      //   name: 'Request Manager',
      //   path: '/Chart',
      //   key: '6',
      // },
      // {
      //   icon: 'starOutlined',
      //   name: 'Console',
      //   path: '/',
      //   key: '7',
      // },
      // {
      //   icon: 'SkypeOutlined',
      //   name: 'XY Compute',
      //   path: '/compute',
      //   key: '8',
      // },
      // {
      //   icon: 'QqOutlined',
      //   name: 'Request Manager',
      //   path: '/Chart',
      //   key: '9',
      // },
      // {
      //   icon: 'MediumOutlined',
      //   name: 'Console',
      //   path: '/',
      //   key: '10',
      // },
      // {
      //   icon: 'AmazonOutlined',
      //   name: 'Last 2',
      //   path: '/compute',
      //   key: '12',
      // },
      // {
      //   icon: 'SketchOutlined',
      //   name: 'Last 1',
      //   path: '/Chart',
      //   key: '13',
      // },
    ],
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { Sider, ProfileOutlined, DatabaseOutlined, HistoryOutlined, ControlOutlined },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
  <sider v-bind="args" >
    <template #ProfileOutlined>
      <ProfileOutlined />
    </template>
    <template #DatabaseOutlined>
      <DatabaseOutlined />
    </template>
    <template #HistoryOutlined>
      <HistoryOutlined />
    </template>
    <template #ControlOutlined>
      <ControlOutlined />
    </template>
  </sider>
  `,
});

export const Light = Template.bind({});
Light.args = {
  theme: 'light',
  selectedKeys: ['3'],
};
export const Dark = Template.bind({});
Dark.args = {
  theme: 'dark',
  selectedKeys: ['2'],
};
