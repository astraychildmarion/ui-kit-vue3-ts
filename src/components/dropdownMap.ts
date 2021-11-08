export const dropdownMap = [
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
    title: 'CPU (GB)',
    field: 'cpu_gb',
  },
  {
    title: 'RAM (GB)',
    field: 'ram_gb',
  },
  {
    title: 'BU Application Name',
    field: 'bu_application',
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
    field: 'disk_gb',
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
    field: 'last_update',
  },
  {
    title: 'Layer',
    field: 'layer',
  },
  {
    title: 'Type',
    field: 'type',
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
export const formatMap = new Map();
formatMap.set('ip', 'text');
formatMap.set('bu', 'dropdown');
formatMap.set('hostname', 'text');
formatMap.set('cpu_gb', 'dropdown');
formatMap.set('ram_gb', 'dropdown');
formatMap.set('bu_application', 'text');

formatMap.set('vm_status', 'dropdown');
formatMap.set('ltm_status', 'dropdown');
formatMap.set('disk_gb', 'text');
formatMap.set('disk_partition', 'text');
formatMap.set('os', 'dropdown');
formatMap.set('last_update', 'calendar');

formatMap.set('layer', 'text');
formatMap.set('type', 'dropdown');
formatMap.set('shared_with', 'dropdown');
formatMap.set('env', 'dropdown');
