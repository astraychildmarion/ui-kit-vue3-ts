<template>
  <h1>hello world</h1>
</template>
<script lang="ts">
export default {
  data() {
    return {
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
      filterOption: [
        {
          title: 'BU',
          dataIndex: 'business_unit',
          type: 'dropdown',
          typeOption: [
            {
              title: 'YT-CWD',
              dataIndex: 'YT-CWD',
            },
            {
              title: 'XJ',
              dataIndex: 'XJ',
            },
            {
              title: 'SBK',
              dataIndex: 'SBK',
            },
          ],
        },
        {
          title: 'Group Admin',
          dataIndex: 'group_admin',
          type: 'dropdown',
          typeOption: [
            {
              title: 'Derek Chong (SBK))',
              dataIndex: 'Derek Chong (SBK)',
            },
            {
              title: 'Jin Chen (YT-CWD)',
              dataIndex: 'Jin Chen (YT-CWD)',
            },
            {
              title: 'CK Chang (YT-CWD)',
              dataIndex: 'CK Chang (YT-CWD)',
            },
            {
              title: 'Henry Chien (YT-CWD)',
              dataIndex: 'Henry Chien (YT-CWD)',
            },
          ],
        },
        {
          title: 'ServiceLAN IP',
          dataIndex: 'service_lan_ip',
        },
        {
          title: 'Hostname',
          dataIndex: 'hostname',
        },
        {
          title: 'BU Application Name',
          dataIndex: 'bu_application',
        },
        {
          title: 'Type',
          dataIndex: 'server_type',
          type: 'dropdown',
          typeOption: [
            {
              title: 'VM',
              dataIndex: 'vm',
            },
            {
              title: 'VPY',
              dataIndex: 'vpy',
            },
          ],
        },
        {
          title: 'CPU (GB)',
          dataIndex: 'cpu',
        },
        {
          title: 'RAM (GB)',
          dataIndex: 'ram',
        },
        {
          title: 'Disk',
          dataIndex: 'disk',
        },
        {
          title: 'OS',
          dataIndex: 'os',
        },
        {
          title: 'Provision date',
          dataIndex: 'provison_date',
          type: 'date',
        },
        {
          title: 'Decom date',
          dataIndex: 'decom_date',
          type: 'date',
        },
      ],
      filterDefaultValue: [
        {
          dataIndex: 'hostname',
          sort: 'is',
          value: 'host',
        },
        {
          dataIndex: 'server_type',
          sort: 'is',
          value: 'vpy',
        },
        {
          dataIndex: 'provison_date',
          sort: 'is',
          value: '2021-08-01 18:01:44',
        },
      ],
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $table-head-text;
  margin-top: 60px;
}
.ant-layout-content {
  width: 100%;
  height: 100%;
  padding: 100px 100px 0 0;
}
</style>
