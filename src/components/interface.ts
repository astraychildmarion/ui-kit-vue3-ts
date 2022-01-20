export interface ActionOptionType {
  title: string;
  disabled: boolean;
  tooltipText: string;
  tooltipShow: boolean;
}
export interface ActionMenuClickType {
  item: { class: string; title: string };
  key: string;
  keyPath: string;
}
export interface AlertPropType {
  alertMsg: string;
  alertType?: string;
  seconds?: number;
}
export interface BellCardDataType {
  title: string;
  content: string;
  timestamp: number;
  timeStamp?: number;
  id: string;
  read: boolean;
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
export interface DropdownOption {
  field: string;
  options?: any[];
}
export interface FilterOption {
  title: string;
  field: string;
  format?: string;
  options?: string[];
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
export interface SearchBarDropdownType {
  item: { value: string };
}
export interface SiderData {
  name: string;
  path: string;
  key: string;
  icon?: string;
  iconPath?: string;
}
