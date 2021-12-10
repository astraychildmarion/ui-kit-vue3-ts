const csFilterSelectorMap = [
  {
    title: 'IP',
    field: 'ip',
  },
  {
    title: 'BU',
    field: 'bu',
  },
  {
    title: 'Hostname',
    field: 'hostname',
  },
  {
    title: 'CPU',
    field: 'cpu',
  },
  {
    title: 'RAM (GB)',
    field: 'ram_gb',
  },
  {
    title: 'BU Application Name',
    field: 'bu_application_name',
  },
  {
    title: 'VM Status',
    field: 'vm_status',
  },
  {
    title: 'LTM Status',
    field: 'ltm_status',
  },
  {
    title: 'Disk (GB)',
    field: 'disk_capacity_gb',
  },
  {
    title: 'Disk Partition',
    field: 'disk_partition',
  },
  {
    title: 'OS',
    field: 'os',
  },
  {
    title: 'Last Update',
    field: 'last_update_at',
  },
  {
    title: 'Layer',
    field: 'layer',
  },
  {
    title: 'Type',
    field: 'server_type',
  },
  {
    title: 'Shared with',
    field: 'shared_with',
  },
  {
    title: 'Environment',
    field: 'env',
  },
];

const csFilterInputFormat = {
  ip: 'text',
  bu: 'dropdown',
  bu_application_name: 'text',
  hostname: 'text',
  cpu: 'dropdown',
  ram_gb: 'dropdown',

  vm_status: 'dropdown',
  ltm_status: 'dropdown',
  disk_capacity_gb: 'text',
  disk_partition: 'text',
  os: 'dropdown',
  last_update_at: 'calendar',

  layer: 'text',
  server_type: 'dropdown',
  shared_with: 'dropdown',
  env: 'dropdown',
};

export { csFilterSelectorMap, csFilterInputFormat };
