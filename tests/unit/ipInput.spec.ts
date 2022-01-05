import { mount } from '@vue/test-utils';
import IpInput from '../../src/components/IpInput.vue';
/* eslint-disable no-undef */
test('enter large number, and return 255', async () => {
  const component = mount(IpInput);
  const input1 = component.find('.ant-input');
  await input1.setValue('1234');
  expect(input1.element.value).toBe('255');
});
test('enter small number, and return 0', async () => {
  const component = mount(IpInput);
  const input1 = component.find('.ant-input');
  await input1.setValue('-1');
  expect(input1.element.value).toBe('0');
});
test('enter non number, and return nothing, 1', async () => {
  const component = mount(IpInput);
  const input1 = component.find('.ant-input');
  await input1.setValue('abcd');
  expect(input1.element.value).toBe('');
});
test('enter non number, and return nothing, 2', async () => {
  const component = mount(IpInput);
  const input1 = component.find('.ant-input');
  await input1.setValue('e');
  expect(input1.element.value).toBe('');
});
test('enter non number, and return nothing, 3', async () => {
  const component = mount(IpInput);
  const input1 = component.find('.ant-input');
  await input1.setValue('+');
  expect(input1.element.value).toBe('');
});
test('enter all input with right number', async () => {
  const component = mount(IpInput);
  const input1 = component.find('input[name="value1"]');
  const input2 = component.find('input[name="value2"]');
  const input3 = component.find('input[name="value3"]');
  const input4 = component.find('input[name="value4"]');
  await input1.setValue('123');
  await input2.setValue('123');
  await input3.setValue('123');
  await input4.setValue('0');
  expect(component.emitted('changeIp')[0][0]).toEqual('123.123.123.0');
});
test('enter all input with 2 wrong number', async () => {
  const component = mount(IpInput);
  const input1 = component.find('input[name="value1"]');
  const input2 = component.find('input[name="value2"]');
  const input3 = component.find('input[name="value3"]');
  const input4 = component.find('input[name="value4"]');
  await input1.setValue('123');
  await input2.setValue('123');
  await input3.setValue('999');
  await input4.setValue('456');
  expect(component.emitted('changeIp')[0][0]).toEqual('123.123.255.255');
});
