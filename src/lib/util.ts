import { KeyRecord } from './type';
import { ColumnType } from 'antd/es/table';
import { ManageColumnType } from "../../index";

const ManageTable = 'ManageTable';

const getLSShowCol = (lsName: string) => {
  const values = localStorage.getItem(ManageTable + '_' + lsName);
  if (values) {
    try {
      return JSON.parse(values);
    } catch (error) {
      return [];
    }
  }
  return [];
};

const setLSShowCol = (lsName: string, values: string[]) => {
  localStorage.setItem(ManageTable + '_' + lsName, JSON.stringify(values));
};

export const computeColumns = (lsName: string, columns: ManageColumnType[], checked: string[]) => {
  const lsChecked: string[] = [];
  const lsShow = getLSShowCol(lsName);
  const isShow = (item: ManageColumnType) => {
    if (checked.length !== 0) {
      return checked.includes(item.dataIndex as string);
    }
    if (lsShow && lsShow.length > 0) {
      return lsShow.includes(item.dataIndex as string);
    }
    return item.show;
  };
  const allKeys: KeyRecord[] = [];
  const computed: ColumnType<any>[] = [];
  let action;
  columns.forEach((item) => {
    if (item.dataIndex === 'action') {
      const { show, ...props } = item;
      action = props;
      return;
    }
    const show = isShow(item);
    allKeys.push({
      dataIndex: (item.dataIndex as string) || (item.key as string),
      title: item.title,
      show: show,
    });
    if (show) {
      const { show, ...props } = item;
      lsChecked.push(item.dataIndex as string);
      computed.push(props);
    }
  });
  // ls 暂存
  if (lsChecked.length !== 0) {
    setLSShowCol(lsName, lsChecked);
  }
  if (action) {
    computed.push(action);
  }
  return {
    allKeys,
    computed,
  };
};
