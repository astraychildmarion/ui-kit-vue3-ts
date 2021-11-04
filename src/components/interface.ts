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
  field: string;
  format?: string;
  formatOption?: any[];
}
export interface FilterDefaultValue {
  field: string;
  mode: string;
  value: any;
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
