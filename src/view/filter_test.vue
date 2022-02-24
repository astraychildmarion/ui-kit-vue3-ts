<template>
  <Filter
    :dropdown-option="dropdownOption"
    :filterDefaultValue="filterDefaultValue"
    :filterSelector="csFilterSelectorMap"
    :filterSelectorFormat="csFilterInputFormat"
    @filterChange="filterChangeMethod"
  />
</template>
<script setup lang="ts">
import Filter from '../components/Filter.vue';
import { csFilterSelectorMap, csFilterInputFormat } from '../components/filterSelectorMapCS';

const filterDefaultValue = [
  {
    field: 'hostname',
    mode: 'contain',
    value: 'host123',
  },
];
const dropdownOption = [
  {
    field: 'bu',
    options: ['188Asia', 'BI', 'CAS', 'CP', 'FYT', 'INFRA-APP', 'INFRA-CEM', 'XJ'],
  },
];
const filterChangeMethod = (data: any) => {
  console.warn(JSON.stringify(data));
};
</script>
