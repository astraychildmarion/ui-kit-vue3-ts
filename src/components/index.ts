// import XYLayout from './layout/Layout.vue';
// import XYHeader from './layout/Header.vue';
// import XYSider from './layout/Sider.vue';

// import XYActionButton from './ActionButton.vue';
// import XYAlertMsg from './AlertMsg.vue';
// import XYCustomizeDisplay from './CustomizeDisplay.vue';
// import XYDaysButton from './Days.vue';
// import XYExportButton from './ExportButton.vue';
// import XYFilter from './Filter.vue';
// import XYPagination from './Pagination.vue';
// import XYSearchBar from './SearchBar.vue';
// import XYToolbar from './Toolbar.vue';

// export {
//   XYLayout,
//   XYHeader,
//   XYSider,
//   XYActionButton,
//   XYAlertMsg,
//   XYCustomizeDisplay,
//   XYDaysButton,
//   XYExportButton,
//   XYFilter,
//   XYPagination,
//   XYSearchBar,
//   XYToolbar,
// };
import { App } from 'vue';
import XYSearchBar from './SearchBar.vue';
import XYDaysButton from './Days.vue';

export { default as XYLayout } from './layout/Layout.vue';
export { default as XYHeader } from './layout/Header.vue';
export { default as XYSider } from './layout/Sider.vue';

export { default as XYActionButton } from './ActionButton.vue';
export { default as XYAlertMsg } from './AlertMsg.vue';
export { default as XYCustomizeDisplay } from './CustomizeDisplay.vue';
// export { default as XYDaysButton } from './Days.vue';
export { default as XYExportButton } from './ExportButton.vue';
export { default as XYFilter } from './Filter.vue';
export { default as XYPagination } from './Pagination.vue';
// export { default as XYSearchBar } from './SearchBar.vue';
export { default as XYToolbar } from './Toolbar.vue';

XYSearchBar.install = (app: App) => {
  app.component(XYSearchBar.name, XYSearchBar);
};

XYDaysButton.install = (app: App) => {
  app.component(XYDaysButton.name, XYDaysButton);
};

export { XYSearchBar, XYDaysButton };

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
