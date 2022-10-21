import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Table } from 'antd';
import { Button, Modal } from 'antd';
import { computeColumns, setLSShowCol } from './util';
import SettingContent from './setting';
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
  const init = useRef(false);
  const initConfig = computeColumns(name, props.columns, props.defaultShowKeys);
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false); // 展示设置弹窗
  const [config, setConfig] = useState<typeof initConfig>(initConfig); // 展示设置弹窗
  useEffect(() => {
    if (init.current) {
      setConfig(computeColumns(name, props.columns, props.defaultShowKeys));
    }
    init.current = true;
  }, [props.columns, name]);

  // 向外暴露方法
  useImperativeHandle(ref, () => {
    return {
      showModal: () => {
        setShouldShowModal(true);
      },
      hideModal: () => {
        setShouldShowModal(false);
        setConfig(computeColumns(name, props.columns));
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
    setConfig(computeColumns(name, props.columns));
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

      <Table {...tableProps} columns={config.computedColumns} />

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
          fixedColumns={config.fixedColumns.map(column => column.key)}
          choose={config.groupRecordList}
          computedShowKeys={config.computedShowKeys}
          fixedShowKeys={props.fixedShowKeys || []}
          defaultShowKeys={props.defaultShowKeys || []}
          onCancel={() => setShouldShowModal(false)}
          onOk={keys => handleOk(keys, config.fixedColumns)}
        />
      </Modal>
    </div>
  );
});

export default React.memo(ManageTable);
