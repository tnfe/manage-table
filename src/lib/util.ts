import { GroupRecord, KeyRecord } from './type';
import { ColumnType } from 'antd/lib/table';
import { ManageColumnType } from '../../index';

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
  computedShowKeys: string[];
  fixedColumns: {key: string; position: boolean | 'left' | 'right'}[];
}

export const computeColumns = (lsName: string, columns: ManageColumnType[], defaultShowKeys: string[] = []): ComputeReturn => {
  const lssShowCol = getLSShowCol(lsName);
  const preLsChecked: string[] = lssShowCol.length > 0 ? lssShowCol : defaultShowKeys;
  const fixedColumns = columns.filter(column => !!column.fixed).map((column) => ({
      key: column.dataIndex,
      position: column.fixed as any,
  }));
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
    const computedShow = isShow(info);
    const dataIndex = computeKey(info.dataIndex);
    records.push({
      dataIndex,
      title: info.title,
      show: computedShow,
      originShow: info.show === true,
    });
    const { show, ...rest } = info;
    map[dataIndex] = rest;
    if (computedShow) {
      saveShowKeys.push(dataIndex);
    }
  };

  const doCollectGroup = () => {
    const useGroup = columns.some(item => !!item.group);
    if (useGroup) {
      const groupIndexMap: Record<string, number> = {};
      columns.forEach((item) => {
        if (item.dataIndex === 'action') {
          const { show, ...rest } = item;
          action = rest;
          return;
        }
        const groupName = item.group || '其他';
        if (groupIndexMap[groupName] === undefined) {
          groupIndexMap[groupName] = groupRecordList.length;
          groupRecordList.push({
            title: groupName,
            records: [],
          });
        }
        resolveInfo(item as ManageColumnType, groupRecordList[groupIndexMap[groupName]].records);
      });
    } else {
      columns.forEach((item) => {
        resolveInfo(item as ManageColumnType, single);
      });
      groupRecordList.push({
        records: single,
      });
    }
  };

  doCollectGroup();

  const computedShowKeys = preLsChecked.length > 0 ? preLsChecked : saveShowKeys;
  // 排序处理
  computedShowKeys.forEach((item) => {
    if (map[item]) {
      computedColumns.push(map[item]);
    }
  });
  // 如果存在操作列
  if (action) {
    computedColumns.push(action);
  }
  const toReturn = {
    groupRecordList,
    computedColumns,
    computedShowKeys,
    fixedColumns,
  };
  return toReturn;
};
