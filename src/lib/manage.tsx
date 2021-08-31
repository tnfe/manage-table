import React, { useEffect, useImperativeHandle, useState } from 'react';
import Table from 'antd/es/table/Table';
import { Button, Modal } from 'antd';
import { computeColumns } from './util';
import SettingContent from './setting';
import { KeyRecord } from './type';
import { ColumnType } from 'antd/es/table';
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
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showColKeys, setShowColKeys] = useState<KeyRecord[]>([]);
  const [computed, setComputed] = useState<ColumnType<any>[]>([]);
  const [showKeys, setShowKeys] = useState<string[]>([]);

  // 监听变化
  useEffect(() => {
    const { allKeys, computed } = computeColumns(name, props.columns, showKeys);
    setComputed(computed);
    setShowColKeys(allKeys);
  }, [showModal, showKeys, props.columns]);

  // 向外暴露方法
  useImperativeHandle(ref, () => {
    return {
      showModal: () => {
        setShowModal(true);
      },
      hideModal: () => {
        setShowModal(false);
      },
    };
  });

  //保存变更
  const handleOk = (keys: string[]) => {
    setShowKeys(keys);
    setShowModal(false);
  };

  return (
    <div>
      {SettingComp ? (
        SettingComp
      ) : (
        <DefaultSetting
          handleClick={() => {
            setShowModal(true);
          }}
        />
      )}

      <Table {...tableProps} columns={computed} />

      <Modal
        visible={showModal}
        width="80%"
        style={{ height: '80vh' }}
        title={setTitle || '设置显示字段'}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <SettingContent choose={showColKeys} onCancel={() => setShowModal(false)} onOk={(keys) => handleOk(keys)} />
      </Modal>
    </div>
  );
});

export default React.memo(ManageTable);
