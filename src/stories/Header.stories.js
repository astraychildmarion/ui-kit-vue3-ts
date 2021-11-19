import { TeamOutlined, SmileOutlined } from '@ant-design/icons-vue';
import MyHeader from '../components/layout/Header.vue';

export default {
  title: 'UI-KIT/Layout/Header',
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
    bellCount: {
      control: 'number',
      description: 'Number ofthe badge shows, default is 0.',
    },
    isShowBellList: {
      control: 'boolean',
      description: 'To show/hide notification list.',
    },
    bellDataSource: {
      control: 'array',
      description: "Data for bell's notification.",
    },
    bellDataStatus: {
      options: ['loading', 'compete', 'ready'],
      control: { type: 'select' },
      description:
        'Please set `loading` when you throw API request for notification data, then set to `ready` after the request complete. Set to `complete` for loading to the last page of data.',
    },
    onLogOut: {
      action: 'logOut',
      description: 'Event name is `logOut`. Emit function for logout',
    },
    onClickTopLeftCorner: {
      action: 'clickTopLeftCorner',
      description: 'Event name is `clickTopLeftCorner`. To control app list drawer.',
    },
    onClickBell: {
      action: 'clickBell',
      description: 'Event name is clickBell. It would be triggered when the Bell clicked.',
    },
    onScrollBellCardEnd: {
      action: 'scrollBellCardEnd',
      description:
        'Event name is scrollBellCardEnd. It would be triggered when bell cardList in status `ready` and scrolled to the end.',
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
    { name: 'XY IAM', url: '#' },
    { name: 'WooshPush', url: '#' },
  ],
  userMenu: [{ name: 'Member', url: '#' }],
  userInfo: {
    name: 'System User',
    avatar: 'SU',
  },
  bellCount: 5,
  isShowBellList: false,
  bellDataStatus: 'ready',
  bellDataSource: [
    {
      title: 'Decom fail',
      content:
        'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
      date: '2011/11/13',
      id: '10',
      read: false,
    },
    {
      title: 'Decom fail',
      content:
        'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
      date: '2011/11/13',
      id: '21',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      date: '2011/11/07',
      id: '32',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      date: '2011/11/07',
      id: '43',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      date: '2011/11/05',
      id: '54',
      read: true,
    },
  ],
};
