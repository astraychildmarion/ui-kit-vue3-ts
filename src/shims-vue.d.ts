// eslint-disable import/newline-after-import /
// eslint-disable prettier/prettier /
declare module '*.vue' {
  import { defineComponent } from 'vue';

  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
