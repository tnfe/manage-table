import React from 'react';
import { TableProps } from 'antd';
import { ColumnType } from "antd/es/table";

export interface KeyRecord {
  dataIndex: string;
  title: React.ReactNode;
  show: boolean;
}
export interface ManageColumnType extends ColumnType<any> {
  show?: boolean;
}

export interface GroupManageColumn {
  title: string;
  columns: ManageColumnType[];
}

export interface IMangeTableProps<RecordType extends object = any> extends TableProps<RecordType> {
  name: string;
  setTitle?: string | React.ReactNode;
  SettingComp?: false | React.ReactNode;
  columns: ManageColumnType[] | GroupManageColumn[];
}

declare const ManageTable: React.ForwardRefExoticComponent<IMangeTableProps<any> & RefAttributes<unknown>>;
export default ManageTable;
