import NumberInput from '../components/NumberInput.vue';

export default {
  title: 'UI-KIT/NumberInput',
  component: NumberInput,
};
const Template = (args) => ({
  components: { NumberInput },
  setup() {
    return { args };
  },
  template: '<NumberInput v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  min: 1,
  max: Infinity,
};
