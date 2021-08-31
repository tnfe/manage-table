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

export interface IMangeTableProps<RecordType extends object = any> extends TableProps<RecordType> {
  name: string;
  setTitle?: string | React.ReactNode;
  SettingComp?: false | React.ReactNode;
  columns: ManageColumnType[];
}

declare class ManageTable extends React.Component<IMangeTableProps> {
}
export default ManageTable;
