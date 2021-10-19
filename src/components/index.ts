export { default as XYDaysButton } from './Days.vue';
export { default as XYFilter } from './Filter.vue';
export { default as XYPagination } from './XYPagination.vue';
export { default as XYLayout } from './layout/Layout.vue';
export { default as XYHeader } from './layout/XYHeader.vue';
export { default as XYSidert } from './layout/Sider.vue';
export { default as XYApplistDrawer } from './layout/ApplistDrawer.vue';

// const componentList = require.context('@/components/', true, /\.vue$/);

// function install(Vue) {
//   componentList.keys().forEach((fileName) => {
//     const componentConfig = componentList(fileName);
//     const newName = fileName.replace(/.*\//, '').replace(/\.\w+$/, '');
//     Vue.component(`${newName}`, componentConfig.default || componentConfig);
//   });
// }

// export default {
//   install,
// };
