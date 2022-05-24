import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Table } from 'antd';
import { Button, Modal } from 'antd';
import { computeColumns, setLSShowCol } from './util';
import SettingContent from './setting';
import { GroupRecord } from './type';
import { ColumnType } from 'antd/lib/table';
import { IMangeTableProps } from "../../index";

// 默认头部设置
interface SettingProps {
  handleClick: () => void;
}
const DefaultSetting = (props: SettingProps) => {
  return (
    <div style={{ textAlign: "left" }}>
      <Button type="primary" onClick={props.handleClick}>
        设置
      </Button>
    </div>
  );
};

// 主入口
const ManageTable = React.forwardRef((props: IMangeTableProps, ref) => {
  const { name, setTitle, width, height, SettingComp, ...tableProps } = props;
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false); // 展示设置弹窗
  const [groupRecordList, setGroupRecordList] = useState<GroupRecord[]>([]); // 弹窗展示所需要的column组
  const [computedColumns, setComputedColumns] = useState<ColumnType<any>[]>([]); // 经过计算后需要进行展示的column，传给Table
  const [computedShowKeys, setComputedShowKeys] = useState<string[]>([]); // 存储计算后传递给Table展示的column的dataIndex合集，map
  const [fixedColumns, setFixedColumns] = useState<{key: string; position: boolean | 'left' | 'right'}[]>([]);
  useEffect(() => {
    if (shouldShowModal === false) {
      const { groupRecordList, computedColumns, computedShowKeys, fixedColumns } = computeColumns(name, props.columns);
      setComputedColumns(computedColumns);
      setGroupRecordList(groupRecordList);
      setComputedShowKeys(computedShowKeys);
      setFixedColumns(fixedColumns);
    }
  }, [shouldShowModal, props.columns, name]);

  // 向外暴露方法
  useImperativeHandle(ref, () => {
    return {
      showModal: () => {
        setShouldShowModal(true);
      },
      hideModal: () => {
        setShouldShowModal(false);
      },
    };
  });

  //保存变更
  const handleOk = (keys: string[], fixedColumns: {key: string; position: boolean | 'left' | 'right'}[]) => {
    // Left-fixed columns need to be on the left, right-fixed columns need to be on the right.
    const left: string[] = keys.filter((key) => fixedColumns.find((column) => column.key === key && column.position === 'left'));
    const right: string[] = keys.filter((key) => fixedColumns.find((column) => column.key === key && column.position === 'right'));
    const rest: string[] = keys.filter((key) => !fixedColumns.find((column) => column.key === key));
    const newkeys = [...left, ...rest, ...right];
    setLSShowCol(name, newkeys);
    setShouldShowModal(false);
    props.onKeysSelected?.(newkeys);
  };

  return (
    <div>
      {SettingComp ? (
        SettingComp
      ) : (
        <DefaultSetting
          handleClick={() => {
            setShouldShowModal(true);
          }}
        />
      )}

      <Table {...tableProps} columns={computedColumns} />

      <Modal
        destroyOnClose={true}
        visible={shouldShowModal}
        width={width || '80%'}
        style={{ height: height || '80vh' }}
        title={setTitle || '设置显示字段'}
        onCancel={() => setShouldShowModal(false)}
        footer={false}
      >
        <SettingContent
          fixedColumns={fixedColumns.map(column => column.key)}
          choose={groupRecordList}
          computedShowKeys={computedShowKeys}
          fixedShowKeys={props.fixedShowKeys || []}
          defaultShowKeys={props.defaultShowKeys || []}
          onCancel={() => setShouldShowModal(false)}
          onOk={keys => handleOk(keys, fixedColumns)}
        />
      </Modal>
    </div>
  );
});

export default React.memo(ManageTable);
