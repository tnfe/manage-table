import { GroupRecord, KeyRecord } from './type';
import { ColumnType } from 'antd/lib/table';
import { GroupManageColumn, ManageColumnType } from "../../index";

const ManageTable = 'ManageTable';

const getLSShowCol = (lsName: string) => {
  const values = localStorage.getItem(ManageTable + '_' + lsName);
  if (values) {
    try {
      const res = JSON.parse(values)
      return Array.isArray(res) ? res : [];
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
  groupRecordList: GroupRecord[];
  computedColumns: ColumnType<any>[];
  checkedList: string[];
}

export const computeColumns = (lsName: string, columns: ManageColumnType[] | GroupManageColumn[], checked: string[]): ComputeReturn => {
  const lsChecked: string[] = [];
  const includeList: string[] = checked.length > 0 ? checked : getLSShowCol(lsName);
  const groupRecordList: GroupRecord[] = [];
  const single: KeyRecord[] = [];
  const computedColumns: ColumnType<any>[] = [];
  let action;
  const map: Record<string, ColumnType<any>> = {};

  // 函数判断是否展示
  const isShow = (item: ManageColumnType) => {
    if (includeList.length !== 0) {
      return includeList.includes(item.dataIndex);
    }
    return !!item.show;
  };

  const resolveInfo = (info:ManageColumnType, records: KeyRecord[]) => {
    // 如果是操作列
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
      map[info.dataIndex as string] = props;

    }
  }

  const doCollectGroup = () => {
    columns.forEach((item) => {
      if ("records" in item && item.records) {
        // 组
        const groupItem: KeyRecord[] = []
        item.records.forEach((column) => {
          resolveInfo(column, groupItem);
        });
        groupRecordList.push({
          title: item.title,
          records: groupItem,
        })
      } else {
        // 散列
        resolveInfo(item as ManageColumnType, single);
      }
    });
    if (single.length) {
      groupRecordList.push({
        records: single,
      });
    }
  }

  doCollectGroup();

  // 排序处理
  (includeList.length > 0 ? includeList : Object.keys(map)).forEach((item) => {
    lsChecked.push(item);
    if (map[item]) {
      computedColumns.push(map[item]);
    }
  })

  // ls 暂存
  if (lsChecked.length !== 0) {
    setLSShowCol(lsName, lsChecked);
  }
  // 如果存在操作列
  if (action) {
    computedColumns.push(action);
  }
  return {
    groupRecordList,
    computedColumns,
    checkedList: lsChecked,
  };
};
