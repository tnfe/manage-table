import React from 'react';

export interface checkedItem {
  dataIndex: string;
  title: React.ReactNode;
}

export interface KeyRecord {
  dataIndex: string;
  title: React.ReactNode;
  show: boolean;
  originShow: boolean;
}

export interface GroupRecord {
  title?: string;
  records: KeyRecord[];
}

export interface SettingContentProps {
  choose: GroupRecord[];
  checkedList: string[];
  defaultCheckedList: string[];
  onOk: (keys: string[]) => void;
  onCancel: () => void;
}

export interface BigOption {
  records: KeyRecord[],
  title?: string;
  ref: React.RefObject<any>;
}
