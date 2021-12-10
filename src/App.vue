<template>
  <h1>Welcome to xy-cloud-kit 2.0</h1>
  <!-- below is cardList testing -->
  <!-- <Button @click="clickBell">show shuffle</Button>
  <BellList
    :data-source="dataSource"
    :is-show="isShow"
    :status="status"
    @infiniteScroll="loadMore"
  /> -->
</template>

<script setup lang="ts">
// import { Button } from 'ant-design-vue';
// import BellList from './components/BellList.vue';
</script>
>
<script lang="ts">
// export default {
//   data() {
//     return {
//       page: <number>1,
//       total: <number>2,
//       isShow: <boolean>false,
//       status: <string>'ready',
//       pushData: <any[]>[
//         {
//           title: 'Decom fail',
//           content:
//             'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
//           date: '2011/11/13',
//           id: '10',
//           read: false,
//         },
//         {
//           title: 'Decom fail',
//           content:
//             'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
//           date: '2011/11/13',
//           id: '21',
//           read: true,
//         },
//         {
//           title: 'Decom success',
//           content:
//             'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
//           date: '2011/11/07',
//           id: '32',
//           read: true,
//         },
//         {
//           title: 'Decom success',
//           content:
//             'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
//           date: '2011/11/07',
//           id: '43',
//           read: true,
//         },
//         {
//           title: 'Decom success',
//           content:
//             'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
//           date: '2011/11/05',
//           id: '54',
//           read: true,
//         },],
//       dataSource: <any[]>[
//         {
//           title: 'Decom fail',
//           content:
//             'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
//           date: '2011/11/13',
//           id: '0',
//           read: false,
//         },
//         {
//           title: 'Decom fail',
//           content:
//             'Server (IP, Host name) decommission failed, Cloud team will check and get back to you asap. We apologize for any inconvenience caused.',
//           date: '2011/11/13',
//           id: '1',
//           read: true,
//         },
//         {
//           title: 'Decom success',
//           content:
//             'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
//           date: '2011/11/07',
//           id: '2',
//           read: true,
//         },
//         {
//           title: 'Decom success',
//           content:
//             'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
//           date: '2011/11/07',
//           id: '3',
//           read: true,
//         },
//         {
//           title: 'Decom success',
//           content:
//             'Server (IP, Host name) is/ are now shut down with monitoring disabled. Infra will decommission the server(s) officially on (yyyy/mm/dd), please be noted.',
//           date: '2011/11/05',
//           id: '4',
//           read: true,
//         },
//       ],
//     };
//   },
//   methods: {
//     clickBell() {
//       this.isShow = !this.isShow;
//     },
//     loadAction() {
//       this.dataSource = this.dataSource.concat(this.pushData);
//       this.status = 'ready';  // when you got the API answer, set to "ready"
//     },
//     loadMore() {
//       console.log(`enter infinite event, page:${this.page}, total: ${this.total}`);
//       if (this.page <= this.total) {
//         this.page += 1;
//         this.status = 'loading'; // when you request the API and set to "loading"
//         setTimeout(this.loadAction, 3000);
//       } else {
//         this.status = 'compete'; // all the pages are loaded, told me "complete"
//       }
//     },
//   },
//   };
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
