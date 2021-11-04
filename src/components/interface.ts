export interface ActionOptionType {
  title: string;
  disabled: boolean;
  tooltipText: string;
  tooltipShow: boolean;
}
export interface ActionMenuClickType {
  item: { class: string };
  key: string;
  keyPath: string;
}
export interface CustomizeDisplayItemOptType {
  label: string;
  value: string;
  fixed: boolean;
}
export interface DayOption {
  title: string;
  value: string;
}
export interface DayClickRadioButtonEvent {
  target: { value: string; tagName: string };
}
export interface ExportExcelDropdownData {
  title: string;
  value: string;
}
export interface ExportExcelMenuType {
  item: object;
  key: string;
  keyPath: string;
}
export interface FilterOption {
  title: string;
  dataIndex: string;
  type?: string;
  typeOption?: any[];
}
export interface FilterDefaultValue {
  dataIndex: string;
  sort: string;
  value: string;
}
export interface FilterDefaultMultiValue {
  dataIndex: string;
  sort: string;
  value: 'string' | [];
}
export interface FilterTemplate {
  dataIndex: string;
  value: string;
  sort: string;
}
export interface HeaderUserMenu {
  name: string;
  url: string;
  icon?: string;
  iconPath?: string;
}
export interface SearchBarTargetType {
  target: { value: string };
}
export interface SiderData {
  name: string;
  path: string;
  key: string;
  icon?: string;
  iconPath?: string;
}
