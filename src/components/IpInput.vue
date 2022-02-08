<template>
  <div class="xy-ip__wrapper">
    <Row :gutter="8">
      <Col :span="6">
        <Input
          type="number"
          max="255"
          min="0"
          @change="inputChange"
          @keydown="checkKeydown"
          name="value1"
          v-model:value="value0"
        />
      </Col>
      <Col :span="6">
        <Input
          type="number"
          max="255"
          min="0"
          @change="inputChange"
          @keydown="checkKeydown"
          name="value2"
          v-model:value="value1"
        />
      </Col>
      <Col :span="6">
        <Input
          type="number"
          max="255"
          min="0"
          @change="inputChange"
          @keydown="checkKeydown"
          name="value3"
          v-model:value="value2"
        />
      </Col>
      <Col :span="6">
        <Input
          type="number"
          max="255"
          min="0"
          @change="inputChange"
          @keydown="checkKeydown"
          name="value4"
          v-model:value="value3"
        />
      </Col>
    </Row>
    <div class="xy-ip__validation" v-show="showValidation">{{ props.validationText }}</div>
  </div>
</template>
<script setup lang="ts">
import { Input, Row, Col } from 'ant-design-vue';
import { ref, toRefs } from 'vue';

interface Props {
  defaultIp?: string;
  showValidation?: boolean;
  validationText?: string;
}
const props = withDefaults(defineProps<Props>(), {
  defaultIp: '...',
  showValidation: false,
  validationText: 'No Ip',
});

interface Emits {
  (
    // eslint-disable-next-line no-unused-vars
    e: 'changeIp',
    // eslint-disable-next-line no-unused-vars
    data: string,
  ): void;
}
const emits = defineEmits<Emits>();
const { defaultIp } = toRefs(props);
const value0 = ref('');
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');

const setImportIp = (ipString: string) => {
  const ipArray = ipString.split('.');
  const exclusiveCharacters = ['.', 'e', '+', '-'];
  let noExclusiveCharacters = true;
  exclusiveCharacters.forEach((item) => {
    ipArray.forEach((ip) => {
      if (ip.indexOf(item) !== -1) noExclusiveCharacters = false;
    });
  });
  if (noExclusiveCharacters && ipArray.length === 4 && ipArray.indexOf('') === -1) {
    const [v0, v1, v2, v3] = ipArray;
    value0.value = v0;
    value1.value = v1;
    value2.value = v2;
    value3.value = v3;
  } else {
    console.log('[cloud-kit ipInput]: default ip form error');
  }
};
setImportIp(defaultIp.value);

const ipNumber = (ipString: string) => {
  let num = parseInt(ipString, 10);
  if (num > 255) num = 255;
  if (num < 0) num = 0;
  return num;
};
const inputChange = () => {
  const checkList = [value0.value, value1.value, value2.value, value3.value];
  checkList.forEach((item: any, index) => {
    if (item !== '') {
      switch (index) {
        case 0:
          value0.value = ipNumber(item).toString();
          break;
        case 1:
          value1.value = ipNumber(item).toString();
          break;
        case 2:
          value2.value = ipNumber(item).toString();
          break;
        case 3:
          value3.value = ipNumber(item).toString();
          break;
        default:
          break;
      }
    }
  });
  if (checkList.indexOf('') === -1 && checkList.indexOf('NaN') === -1) {
    const data = `${value0.value}.${value1.value}.${value2.value}.${value3.value}`;
    emits('changeIp', data);
  }
};
const checkKeydown = (e: any) => {
  const exclusiveCharacters = ['.', 'e', '+', '-'];
  if (exclusiveCharacters.includes(e.key)) {
    e.preventDefault();
  }
};
</script>
<style lang="scss">
.xy-ip__validation {
  color: $error-color;
  font-size: 12px;
}
</style>
