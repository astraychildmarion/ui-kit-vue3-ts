import { TeamOutlined, SmileOutlined } from '@ant-design/icons-vue';
import MyHeader from '../components/layout/XYHeader.vue';

export default {
  title: 'UI-KIT/Header',
  component: MyHeader,
  argTypes: {
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
    clickLogOut: {
      action: 'logOut',
      description: 'Emit function for logout',
    },
    onClickTopLeftCorner: {
      action: 'clickTopLeftCorner',
      description: 'To control app list drawer.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { MyHeader, TeamOutlined, SmileOutlined },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { args };
  },
  // Then, the spread values can be accessed directly in the template
  template: `
  <my-header v-bind="args">
    <template #userMenu_team>
      <TeamOutlined />
    </template>
    <template #manageMenu_smile>
      <SmileOutlined />
    </template>
  </my-header>
  `,
});

export const Default = Template.bind({});
Default.args = {
  manageAuth: true,
  logoUrl: '/logo.svg',
  manageMenu: [
    { name: 'Role Manage (IAM)', url: '#', iconPath: './Icon_interface_IAM_outline.svg' },
    { name: 'XY IAM', url: '#', icon: 'smile' },
  ],
  userMenu: [{ name: 'Member', url: '#', icon: 'team' }],
  userInfo: {
    name: 'Amberiel Cheng',
    avatar: 'AC',
  }
};
