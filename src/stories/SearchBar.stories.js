import SearchBar from '../components/SearchBar.vue';

export default {
  title: 'UI-KIT/SearchBar',
  component: SearchBar,
  argTypes: {
    onSearchBarEnter: {
      action: 'searchBarEnter',
      description:
        "Event name is `searchBarEnter`. This event would be triggered when press Enter. Throw back input's value.",
    },
    onSearchBarChange: {
      action: 'searchBarChange',
      description:
        "Event name is `searchBarChange`. This event would be triggered when input value change. Throw back input's value.",
    },
    onClickSearchbarMenu: {
      action: 'clickSearchbarMenu',
      description:
        "Event name is `clickSearchbarMenu`. Click searchbar's history menu and throwback menu's value.",
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder default is `Search on server list`.',
    },
    searchHistory: {
      type: 'array',
      description: "Search history's value",
    },
    defaultValue: {
      type: 'string',
      description: 'To set default value to input.',
    },
  },
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SearchBar },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="padding: 1rem">
      <SearchBar v-bind="args" />
    </div>
    `,
});
export const Default = Template.bind({});
Default.args = {
  searchHistory: ['ip 123', 'vm 123', 'status running'],
};
