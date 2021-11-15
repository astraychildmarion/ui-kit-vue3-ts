import BellList from '../components/BellList.vue';

export default {
  title: 'UI-KIT/BellList',
  component: BellList,
  argTypes: {
    isShow: {
      type: 'boolean',
      description: 'To control ',
    },
    loading: {
      type: 'boolean',
      description: 'Set the loading status of button. Default is false.',
    },
    onLoadMore: {
      action: 'loadMore',
      description: "Event name is `clickExport`. Throw back click menu's value.",
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
  isShow: false,
  dataSource: [
    {
      title: 'Decom fail',
      content:
        'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
      date: '2011/11/13',
      id: '0',
      read: false,
    },
    {
      title: 'Decom fail',
      content:
        'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
      date: '2011/11/13',
      id: '1',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      date: '2011/11/07',
      id: '2',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      date: '2011/11/07',
      id: '3',
      read: true,
    },
    {
      title: 'Decom success',
      content:
        'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
      date: '2011/11/05',
      id: '4',
      read: true,
    },
  ],
};
