<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import Filter from './view/filter_test.vue';
import Home from './view/home.vue';
import NotFound from './components/NotFound.vue';

interface Routes {
  [index: string]: any;
}
const routes: Routes = {
  '/filter': Filter,
  '/': Home,
};
const currentPath: any = ref(window.location.hash);
const currentView = computed(() => routes[currentPath.value.slice(1) || '/'] || NotFound);
onMounted(() => {
  window.addEventListener('hashchange', () => {
    currentPath.value = window.location.hash;
  });
});
</script>

<template>
  <div style="padding: 20px">
    <a href="#/">Home</a> |
    <a href="#/filter">Filter</a>
  </div>
  <component :is="currentView" />
</template>

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
