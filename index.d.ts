import React from 'react';
import { TableProps } from 'antd';
import { ColumnType } from "antd/lib/table";

export interface ManageColumnType extends ColumnType<any> {
  show?: boolean;
  dataIndex: string;
  group?: string;
}

export interface IMangeTableProps<RecordType extends object = any> extends TableProps<RecordType> {
  name: string;
  width?: string;
  height?: string;
  setTitle?: string | React.ReactNode;
  SettingComp?: false | React.ReactNode;
  columns: ManageColumnType[];
  /** 响应恢复默认设置的 keys */
  defaultShowKeys?: string[];
  /** 固定显示的 keys */
  fixedShowKeys?: string[];
  onKeysSelected?: (keys: string[]) => void;
}


export interface IManageTableRefType {
  showModal: () => void;
  hideModal: () => void;
  getShowKeys: () => string[];
}


declare const ManageTable: React.ForwardRefExoticComponent<IMangeTableProps<any> & RefAttributes<unknown>>;
export default ManageTable;
