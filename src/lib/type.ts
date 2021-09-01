import React from 'react';

export interface KeyRecord {
  dataIndex: string;
  title: React.ReactNode;
  show: boolean;
}

export interface GroupRecord {
  title?: string;
  records: KeyRecord[];
}


export interface SettingContentProps {
  choose: GroupRecord[];
  onOk: (keys: string[]) => void;
  onCancel: () => void;
}

export interface BigOption {
  records: KeyRecord[],
  title?: string;
  ref: React.RefObject<any>;
}
