import { GroupRecord, KeyRecord } from './type';
import { ColumnType } from 'antd/es/table';
import { GroupManageColumn, ManageColumnType } from "../../index";

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

interface ComputeReturn {
  allKeys: GroupRecord[];
  computed: ColumnType<any>[];
}

export const computeColumns = (lsName: string, columns: ManageColumnType[] | GroupManageColumn[], checked: string[]): ComputeReturn => {
  const lsChecked: string[] = [];
  const lsShowList = getLSShowCol(lsName);
  const allKeys: GroupRecord[] = [];
  const single: KeyRecord[] = [];
  const computed: ColumnType<any>[] = [];
  let action;

  // 函数判断是否展示
  const isShow = (item: ManageColumnType) => {
    if (checked.length !== 0) {
      return checked.includes(item.dataIndex);
    }
    if (lsShowList && lsShowList.length > 0) {
      return lsShowList.includes(item.dataIndex);
    }
    return item.show;
  };

  const resolveInfo = (info:ManageColumnType, records: KeyRecord[]) => {
    if (info.dataIndex === 'action') {
      const { show, ...props } = info;
      action = props;
      return;
    }
    const show = isShow(info);
    records.push({
      dataIndex: info.dataIndex,
      title: info.title,
      show: show,
    });
    if (show) {
      const { show, ...props } = info;
      lsChecked.push(info.dataIndex as string);
      computed.push(props);
    }
  }
  columns.forEach((item) => {
    if ("records" in item && item.records) {
      // 组
      const groupItem: KeyRecord[] = []
      item.records.forEach((column) => {
        resolveInfo(column, groupItem);
      });
      allKeys.push({
        title: item.title,
        records: groupItem,
      })
    } else {
      // 散列
      resolveInfo(item as ManageColumnType, single);
    }
  });
  if (single.length) {
    allKeys.push({
      records: single,
    });
  }

  // ls 暂存
  if (lsChecked.length !== 0) {
    setLSShowCol(lsName, lsChecked);
  }
  // 如果存在操作列
  if (action) {
    computed.push(action);
  }
  return {
    allKeys,
    computed,
  };
};
