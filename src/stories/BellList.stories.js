import BellList from '../components/BellList.vue';

export default {
  title: 'UI-KIT/BellList',
  component: BellList,
  argTypes: {
    isNoData: {
      control: 'boolean',
      description: 'To show/hide `No Data` text.',
    },
    isShow: {
      control: 'boolean',
      description: 'To show/hide bell list.',
    },
    isShowLoading: {
      control: 'boolean',
      description: 'Default status is `true`. Set to `false` when loading the last page of data.',
    },
    dataSource: {
      control: 'array',
      description: "Data for bell's list.",
    },
    onInfiniteScroll: {
      action: 'infiniteScroll',
      description:
        'Event name is infiniteScroll. It would be triggered when bell cardList in status `isShowLoading: true` && scrolled to the end.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BellList },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <BellList v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  isShow: true,
  dataSource: [
    {
      title: 'Decom fail',
      content:
        'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
      timestamp: 1640169779329,
      id: '0',
      read: false,
    },
    {
      title: 'Decom fail',
      content:
        'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
      timestamp: 1640169779329,
      id: '1',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      timestamp: 1640169779329,
      id: '2',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      timestamp: 1640169779329,
      id: '3',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      timestamp: 1640129779329,
      id: '4',
      read: true,
    },
  ],
  // dataSource: [],
  isShowLoading: true,
};
