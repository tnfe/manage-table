import React from 'react';
import { TableProps } from 'antd';
import { ColumnType } from "antd/lib/table";

export interface ManageColumnType extends ColumnType<any> {
  show?: boolean;
  dataIndex: string;
  /** [默认：false]， 是否总是展示到列表里，设置为true，可配合 fixed 设置让列固定在左侧或右侧 */
  isAlwaysShow?: boolean;
  /** [默认：true]，是否可在列设置里弹窗里展示，让用户调整字段顺序 */
  isInSetting?: boolean;
}

export interface GroupManageColumn {
  title: string;
  records: ManageColumnType[];
}

export interface IMangeTableProps<RecordType extends object = any> extends TableProps<RecordType> {
  name: string;
  width?: string;
  height?: string;
  setTitle?: string | React.ReactNode;
  SettingComp?: false | React.ReactNode;
  columns: ManageColumnType[] | GroupManageColumn[];
  /** 响应恢复默认设置的 keys */
  defaultShowKeys?: string[];
  /** 初始的 keys */
  initialShowKeys?: string[];
  onKeysSelected?: (keys: string[]) => void;
}

declare const ManageTable: React.ForwardRefExoticComponent<IMangeTableProps<any> & RefAttributes<unknown>>;
export default ManageTable;
