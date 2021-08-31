import React, { useEffect, useImperativeHandle, useState } from 'react';
import Table from 'antd/es/table/Table';
import { Button, Modal } from 'antd';
import { computeColumns } from './util';
import SettingContent from './setting';
import { KeyRecord } from './type';
import { ColumnType } from 'antd/es/table';
import { IMangeTableProps } from "../../index";

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

const ManageTable = React.forwardRef((props: IMangeTableProps, ref) => {
  const { name, setTitle, SettingComp, ...tableProps } = props;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showColKeys, setShowColKeys] = useState<KeyRecord[]>([]);
  const [computed, setComputed] = useState<ColumnType<any>[]>([]);
  const [showKeys, setShowKeys] = useState<string[]>([]);
  useEffect(() => {
    const { allKeys, computed } = computeColumns(name, props.columns, showKeys);
    setComputed(computed);
    setShowColKeys(allKeys);
  }, [showModal, showKeys, props.columns]);
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
