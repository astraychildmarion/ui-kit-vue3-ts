<template>
  <h1>Welcome to xy-cloud-kit 2.0</h1>
  <!-- below is cardList testing -->
  <!-- <Button @click="clickBell" class="xy-header__user-notification">show shuffle</Button>
  <BellList
    :data-source="dataSource"
    v-model:is-show="isShow"
    :is-show-loading="true"
    :is-no-data="true"
    @infiniteScroll="loadMore"
  /> -->
</template>

<script setup lang="ts">
// import { Button } from 'ant-design-vue';
// import BellList from './components/BellList.vue';
</script>

<script lang="ts">
/* export default {
  data() {
    return {
      isShow: <boolean>false,
      dataSource: <any[]>[
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
    };
  },
  methods: {
    clickBell() {
      this.isShow = !this.isShow;
    },
    loadAction() {
      this.dataSource = this.dataSource.concat(this.dataSource);
    },
    loadMore() {

    }
  },
}; */
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
</style>
