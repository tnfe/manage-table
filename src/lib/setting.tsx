import React, { useEffect, useState } from 'react';
import { BigOption, checkedItem, KeyRecord, SettingContentProps } from './type';
import { Button, Card, Checkbox, Divider } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { DoubleLeftOutlined } from '@ant-design/icons';
import GroupSet from './groupSett';
import DragList from './dragList';

const stCardLeft = { height: '70vh', width: '60%', display: 'inline-block', verticalAlign: 'top' };
const stCardRight = { height: '70vh', width: '32%', display: 'inline-block', verticalAlign: 'top' };
const stCardBody: React.CSSProperties = { height: '90%', overflowY: 'auto' };
const stSetting = { height: '80%' };
const stBlank: React.CSSProperties = {
  width: '3%',
  height: '100%',
  lineHeight: 'calc(80vh - 160px)',
  verticalAlign: 'top',
  textAlign: 'center',
  fontSize: '22px',
  display: 'inline-block',
  cursor: 'pointer',
};

// 暂存数据
let saveMap: Record<string, checkedItem> = {};


const SettingContent = (props: SettingContentProps) => {
  const [bigOptions, setBigOptions] = useState<BigOption[]>([]); // 所有选项
  const [indeterminate, setIndeterminate] = React.useState(true); // 是否全选
  const [checkedList, setCheckedList] = useState<string[]>(props.checkedList); // 选中的对象
  const [totalCount, setTotalCount] = useState<number>(0);

  // 准备数据阶段
  useEffect(() => {
    const options: BigOption[] = [];
    let total = 0;

    // 遍历可选项
    const map: Record<string, checkedItem> = {};
    props.choose.forEach((item) => {
      const records: KeyRecord[] = [];
      item.records.forEach((record) => {
        map[record.dataIndex as string] = {
          title: record.title,
          dataIndex: record.dataIndex,
        };
        records.push(record);
        total++;
      });
      options.push({ records, title: item.title, ref: React.createRef() });
    });
    // 初始化状态
    saveMap = map;
    setTotalCount(total);
    setBigOptions(options);
    setIndeterminate(checkedList.length !== total);
  }, [props.choose]);

  // 全局选中操作
  const changeAllChecked = (event: CheckboxChangeEvent) => {
    const checked = event.target.checked;
    setIndeterminate(false);
    if (checked) {
      setCheckedList(Object.keys(saveMap));
      // 子组全选
      bigOptions.forEach((bigOption) => {
        bigOption.ref.current.selectAll();
      });
    } else {
      setCheckedList(props.fixedShowKeys);
      // 子组全部清除选中
      bigOptions.forEach((bigOption) => {
        bigOption.ref.current.clearCheck();
      });
    }
  };

  // 删除选中的元素
  const unClickedColKey = (key: string) => {
    if (props.fixedShowKeys.includes(key)) {
      return;
    }
    const now = checkedList?.slice();
    const index = now?.indexOf(key);
    if (index !== -1) {
      const bigOption = bigOptions.find((bigOption) => {
        return bigOption.records.find((record) => {
          return record.dataIndex === key;
        });
      });
      if (bigOption !== undefined) {
        now?.splice(index, 1);
        setCheckedList(now);
        setIndeterminate(true);
        bigOption.ref.current.removeCheck(key);
      }
    }
  };

  // 清除全部选中
  const clearLockColumn = () => {
    setCheckedList(props.fixedShowKeys);
    setIndeterminate(props.fixedShowKeys.length !== 0);
    bigOptions.forEach((bigOption) => {
      bigOption.ref.current.clearCheck();
    });
  };

  // 响应子组件的change事件
  const handleSaveChange = (index: number, checkeds: string[] | string) => {

    const list = checkedList.slice();
    const group: string[] = bigOptions[index].records.map(item => item.dataIndex);

    if (Array.isArray(checkeds)) {
      if (checkeds.length === 0) {
        group.forEach((item) => {
          if (props.fixedShowKeys.includes(item)) {
            return;
          }
          const indx = list.indexOf(item);
          if (indx !== -1) {
            list.splice(indx, 1);
          }
        });
      } else {
        group.forEach((item) => {
          if (props.fixedShowKeys.includes(item)) {
            return;
          }
          if (!list.includes(item)) {
            list.push(item);
          }
        });
      }
    } else {
      if (props.fixedShowKeys.includes(checkeds)) {
        return;
      }
      const indx = list.indexOf(checkeds);
      if (indx === -1) {
        list.push(checkeds);
      } else {
        list.splice(indx, 1);
      }
    }
    setCheckedList(list);
    const cha = list.length;
    setIndeterminate(cha !== 0 && cha !== totalCount);
  };

  const onChangeSort = (list: checkedItem[]) => {
    const result = list.map(value => value.dataIndex);
    setCheckedList(result);
  };

  const resetDefaultCheckedList = () => {
    setCheckedList(props.defaultShowKeys);
    props.onOk(props.defaultShowKeys);
  };

  const cardTitle = (
    <span>
      可选字段
      <Checkbox
        indeterminate={indeterminate}
        onChange={changeAllChecked}
        checked={checkedList.length === totalCount}
        style={{ marginLeft: '18px' }}
      >
        {checkedList.length}/{totalCount}
      </Checkbox>
    </span>
  );
  const dragList: checkedItem[] = [];
  checkedList.forEach((key) => {
    if (saveMap[key]) {
      dragList.push(saveMap[key]);
    }
  });
  const chooseList = (
    <div>
      <DragList list={dragList} onChange={onChangeSort} removeItem={unClickedColKey} />
    </div>
  );

  const footer = (
    <div style={{ textAlign: 'right' }}>
      <Button style={{ marginRight: '20px' }} onClick={() => props.onCancel()}>
        取消
      </Button>
      { props.defaultShowKeys.length > 0
        && <Button style={{ marginRight: '20px' }} onClick={resetDefaultCheckedList}>
          恢复默认字段
      </Button>}
      <Button type="primary" onClick={() => props.onOk(checkedList)}>
        确定
      </Button>
    </div>
  );

  return (
    <div style={stSetting}>
      <Card title={cardTitle} style={stCardLeft} bodyStyle={stCardBody}>
        {bigOptions.map((bigOption, index) => {
          return (
            <GroupSet
              key={index}
              ref={bigOption.ref}
              records={bigOption.records}
              title={bigOption.title}
              groupIndex={index}
              fixedShowKeys={props.fixedShowKeys}
              handleSaveChange={handleSaveChange}
            />
          );
        })}
      </Card>

      <div style={stBlank}>
        <DoubleLeftOutlined onClick={clearLockColumn} />
      </div>

      <Card title={`已选字段 ${checkedList.length}`} style={stCardRight} bodyStyle={stCardBody}>
        {chooseList}
      </Card>
      <Divider />
      {footer}
    </div>
  );
};

export default React.memo(SettingContent);
