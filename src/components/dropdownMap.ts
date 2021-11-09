export const dropdownMap = [
  {
    title: 'BU',
    field: 'bu',
  },
  {
    title: 'BU Application Name',
    field: 'bu_application_name',
  },
  {
    title: 'CPU (GB)',
    field: 'cpu',
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
    title: 'Environment',
    field: 'env',
  },
  {
    title: 'Hostname',
    field: 'hostname',
  },
  {
    title: 'IP',
    field: 'ip',
  },
  {
    title: 'Last Update',
    field: 'last_update_at',
  },
  {
    title: 'LTM Status',
    field: 'ltm_status',
  },
  {
    title: 'OS',
    field: 'os',
  },
  {
    title: 'RAM (GB)',
    field: 'ram_gb',
  },
  {
    title: 'Shared with',
    field: 'shared_with',
  },
  {
    title: 'VM Status',
    field: 'vm_status',
  },

  {
    title: 'Layer',
    field: 'layer',
  },
  {
    title: 'Type',
    field: 'server_type',
  },
];
export const formatMap = new Map();
formatMap.set('ip', 'text');
formatMap.set('bu', 'dropdown');
formatMap.set('bu_application_name', 'text');
formatMap.set('hostname', 'text');
formatMap.set('cpu', 'dropdown');
formatMap.set('ram_gb', 'dropdown');

formatMap.set('vm_status', 'dropdown');
formatMap.set('ltm_status', 'dropdown');
formatMap.set('disk_capacity_gb', 'text');
formatMap.set('disk_partition', 'text');
formatMap.set('os', 'dropdown');
formatMap.set('last_update_at', 'calendar');

formatMap.set('layer', 'text');
formatMap.set('server_type', 'dropdown');
formatMap.set('shared_with', 'dropdown');
formatMap.set('env', 'dropdown');
