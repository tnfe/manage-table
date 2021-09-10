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
    <div style={{textAlign: "left"}}>
      <Button type="primary" onClick={props.handleClick}>
        设置
      </Button>
    </div>
  );
};

// 主入口
const ManageTable = React.forwardRef((props: IMangeTableProps, ref) => {
  const { name, setTitle, SettingComp, ...tableProps } = props;
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false); // 展示设置弹窗
  const [groupRecordList, setGroupRecordList] = useState<GroupRecord[]>([]); // 弹窗展示所需要的column组
  const [computedColumns, setComputedColumns] = useState<ColumnType<any>[]>([]); // 经过计算后需要进行展示的column，传给Table
  const [computedShowKeys, setComputedShowKeys] = useState<string[]>([]); // 存储计算后传递给Table展示的column的dataIndex合集，map
  useEffect(() => {
    if (shouldShowModal === false) {
      const { groupRecordList, computedColumns, checkedList } = computeColumns(name, props.columns);
      setComputedColumns(computedColumns);
      setGroupRecordList(groupRecordList);
      setComputedShowKeys(checkedList);
    }
  }, [shouldShowModal, props.columns]);

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
  const handleOk = (keys: string[]) => {
    setLSShowCol(name, keys);
    setShouldShowModal(false);
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
        visible={shouldShowModal}
        width="80%"
        style={{ height: '80vh' }}
        title={setTitle || '设置显示字段'}
        onCancel={() => setShouldShowModal(false)}
        footer={false}
      >
        <SettingContent choose={groupRecordList} checkedList={computedShowKeys} onCancel={() => setShouldShowModal(false)} onOk={(keys) => handleOk(keys)} />
      </Modal>
    </div>
  );
});

export default React.memo(ManageTable);
