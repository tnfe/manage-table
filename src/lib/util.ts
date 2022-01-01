import { GroupRecord, KeyRecord } from './type';
import { ColumnType } from 'antd/lib/table';
import { GroupManageColumn, ManageColumnType } from '../../index';

const ManageTable = 'ManageTable';

const getLSShowCol = (lsName: string) => {
  const values = localStorage.getItem(ManageTable + '_' + lsName);
  if (values) {
    try {
      const res = JSON.parse(values);
      return Array.isArray(res) ? res : [];
    } catch (error) {
      return [];
    }
  }
  return [];
};

export const setLSShowCol = (lsName: string, values: string[]) => {
  localStorage.setItem(ManageTable + '_' + lsName, JSON.stringify(values));
};

export const computeKey = (dataIndex: string | string[]) => {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join('.');
  }
  return dataIndex;
};

interface ComputeReturn {
  groupRecordList: GroupRecord[];
  computedColumns: ColumnType<any>[];
  checkedList: string[];
}

export const computeColumns = (
  lsName: string, columns: ManageColumnType[] | GroupManageColumn[], userInitialKeys?: string[],
): ComputeReturn => {
  // 优先采用用户传入的初始值，再使用localStorage缓存值
  const preLsChecked: string[] = userInitialKeys || getLSShowCol(lsName);
  const groupRecordList: GroupRecord[] = [];
  const single: KeyRecord[] = [];
  const computedColumns: ColumnType<any>[] = [];
  let action;
  const map: Record<string, ColumnType<any>> = {};
  const saveShowKeys: string[] = [];

  // 函数判断是否展示
  const isShow = (item: ManageColumnType) => {
    if (preLsChecked.length !== 0) {
      return preLsChecked.includes(computeKey(item.dataIndex));
    }
    return !!item.show;
  };

  const resolveInfo = (info: ManageColumnType, records: KeyRecord[]) => {
    // 如果是操作列
    if (info.dataIndex === 'action') {
      const { show, ...rest } = info;
      action = rest;
      return;
    }
    const { isInSetting = true, isAlwaysShow = false } = info;

    const computedShow = isShow(info);
    const dataIndex = computeKey(info.dataIndex);
    if (isInSetting) {
      records.push({
        dataIndex,
        title: info.title,
        show: computedShow,
        originShow: info.show === true,
      });
    }
    const { show, ...rest } = info;
    map[dataIndex] = rest;
    if (computedShow) {
      saveShowKeys.push(dataIndex);
    }

    // 确保配置 isAlwaysShow 为 true 的字段总是展现到列表头部
    if (isAlwaysShow) {
      if (!preLsChecked.includes(dataIndex)) preLsChecked.unshift(dataIndex);
      if (!saveShowKeys.includes(dataIndex)) saveShowKeys.unshift(dataIndex);
    }
  };

  const doCollectGroup = () => {
    columns.forEach((item: any) => {
      if ('records' in item && item.records) {
        // 组
        const groupItems: KeyRecord[] = [];
        groupRecordList.push({
          title: item.title,
          records: groupItems,
        });
        item.records.forEach((column: ManageColumnType) => {
          resolveInfo(column, groupItems);
        });
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
  };

  doCollectGroup();

  const checkedList = preLsChecked.length > 0 ? preLsChecked : saveShowKeys;
  // 排序处理
  checkedList.forEach((item) => {
    if (map[item]) {
      computedColumns.push(map[item]);
    }
  });
  // 如果存在操作列
  if (action) {
    computedColumns.push(action);
  }
  return {
    groupRecordList,
    computedColumns,
    checkedList,
  };
};
