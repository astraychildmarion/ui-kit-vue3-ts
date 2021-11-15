<template>
  <h1>Welcome to xy-cloud-kit 2.0</h1>
  <h5>can not sync props</h5>
  <Button @click="clickBell">show shuffle</Button>
  <BellList
    :data-source="dataSource"
    :page="page"
    :total-page="total"
    :is-show="isShow"
    @loadMore="loadMore"
  />
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
import BellList from './components/BellList.vue';
</script>

<script lang="ts">
const page = '1';
const total = '10';
let isShow = true;
let loading = false;
const dataSource = [
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
];
export default {
  data() {
    return { dataSource, page, total, isShow, loading };
  },
  methods: {
    clickBell() {
      console.log('clickBell', isShow);
      isShow = !isShow;
    },
    loadMore() {
      loading = true;
      console.log('loadMore');
    },
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
</style>
