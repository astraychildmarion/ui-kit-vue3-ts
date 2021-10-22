export { default as XYLayout } from './layout/Layout.vue';
export { default as XYHeader } from './layout/Header.vue';
export { default as XYSider } from './layout/Sider.vue';

export { default as XYActionButton } from './ActionButton.vue';
export { default as XYAlertMsg } from './AlertMsg.vue';
export { default as XYCustomizeDisplay } from './CustomizeDisplay.vue';
export { default as XYDaysButton } from './Days.vue';
export { default as XYExportExcelButton } from './ExportExcelButton.vue';
export { default as XYFilter } from './Filter.vue';
export { default as XYPagination } from './Pagination.vue';
export { default as XYSearchBar } from './SearchBar.vue';
export { default as XYToolbar } from './Toolbar.vue';

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
