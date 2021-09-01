import React, { useEffect, useState } from 'react';
import { BigOption, KeyRecord, SettingContentProps } from './type';
import { Button, Card, Checkbox, Divider } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CloseOutlined, DoubleLeftOutlined, MoreOutlined } from '@ant-design/icons';
import GroupSet from "./groupSett";

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
const stCloseIcon: React.CSSProperties = { float: 'right', lineHeight: '28px' };

// 暂存数据
let saveMap: Record<string, string> = {};


const SettingContent = (props: SettingContentProps) => {
  const [bigOptions, setBigOptions] = useState<BigOption[]>([]); // 所有选项
  const [indeterminate, setIndeterminate] = React.useState(true); // 是否全选
  const [checkedList, setCheckedList] = useState<string[]>([]); // 选中的对象
  const [clickedColCount, setClickedColCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  // 准备数据阶段
  useEffect(() => {
    const options: BigOption[] = [];
    const checkeds: string[] = [];
    let checkedNum = 0;
    let total = 0;

    // 遍历可选项
    const map: Record<string, string> = {};
    props.choose.forEach((item) => {
      const records: KeyRecord[] = [];
      item.records.forEach((record) => {
        map[record.dataIndex as string] = record.title as string;
        records.push(record);
        total++;
        if (record.show) {
          checkeds.push(record.dataIndex);
          checkedNum++;
        }
      });
      options.push({records, title: item.title, ref: React.createRef()});
    });
    // 初始化状态
    saveMap = map;
    setTotalCount(total);
    setBigOptions(options);
    setCheckedList(checkeds);
    setClickedColCount(checkedNum);
    setIndeterminate(checkedNum !== totalCount);
  }, [props.choose]);

  // 全局选中操作
  const changeAllChecked = (event: CheckboxChangeEvent) => {
    const checked = event.target.checked;
    setIndeterminate(false);
    if (checked) {
      setClickedColCount(totalCount);
      setCheckedList(Object.keys(saveMap));
      // 子组全选
      bigOptions.forEach(bigOption => {
        bigOption.ref.current.selectAll();
      })
    } else {
      setClickedColCount(0);
      setCheckedList([]);
      // 子组全部清除选中
      bigOptions.forEach(bigOption => {
        bigOption.ref.current.clearCheck();
      })
    }
  };

  // 删除选中的元素
  const unClickedColKey = (key: string) => {
    const now = checkedList?.slice();
    const index = now?.indexOf(key);
    if (index !== -1) {
      now?.splice(index, 1);
      setCheckedList(now);
      setIndeterminate(true);
      setClickedColCount(clickedColCount - 1);
      const bigOption = bigOptions.find((bigOption) => {
        return bigOption.records.find((record) => {
          return record.dataIndex === key;
        })
      });
      if (bigOption !== undefined) {
        bigOption.ref.current.removeCheck(key);
      }
    }
  };

  // 清除全部选中
  const clearLockColumn = () => {
    setCheckedList([]);
    setClickedColCount(0);
    setIndeterminate(false);
    bigOptions.forEach(bigOption => {
      bigOption.ref.current.clearCheck();
    })
  };

  const handleSaveChange = (index: number, checkeds: string[] | string) => {
    const list = checkedList.slice();
    const group: string[] = bigOptions[index].records.map((item) => item.dataIndex);
    if (Array.isArray(checkeds)) {
      if (checkeds.length === 0) {
        group.forEach((item) => {
          const indx = list.indexOf(item);
          if (indx !== -1) {
            list.splice(indx, 1);
          }
        })
      } else {
        group.forEach((item) => {
          if (!list.includes(item)) {
            list.push(item);
          }
        })
      }
    } else {
      const indx = list.indexOf(checkeds);
      if (indx === -1) {
        list.push(checkeds);
      } else {
        list.splice(indx, 1);
      }
    }
    setCheckedList(list);
    setClickedColCount(list.length);
    setIndeterminate(list.length !== totalCount);
  }

  const cardTitle = (
    <span>
      可选字段
      <Checkbox
        indeterminate={indeterminate}
        onChange={changeAllChecked}
        checked={clickedColCount === totalCount}
        style={{ marginLeft: '18px' }}
      >
        {clickedColCount}/{totalCount}
      </Checkbox>
    </span>
  );

  const chooseList = (
    <div>
      {checkedList?.map((item) => {
        return (
          <div style={{ lineHeight: '28px' }} key={item}>
            <MoreOutlined />
            {saveMap[item]}
            <CloseOutlined style={stCloseIcon} onClick={() => unClickedColKey(item)} />
          </div>
        );
      })}
    </div>
  );

  const footer = (
    <div style={{ textAlign: 'right' }}>
      <Button style={{ marginRight: '20px' }} onClick={() => props.onCancel()}>
        取消
      </Button>
      <Button type="primary" onClick={() => props.onOk(checkedList)}>
        确定
      </Button>
    </div>
  );

  return (
    <div style={stSetting}>
      <Card title={cardTitle} style={stCardLeft} bodyStyle={stCardBody}>
        {bigOptions.map((bigOption, index) => {
          return <GroupSet key={index} ref={bigOption.ref} records={bigOption.records} title={bigOption.title} groupIndex={index} handleSaveChange={handleSaveChange}/>
        })}
      </Card>

      <div style={stBlank}>
        <DoubleLeftOutlined onClick={clearLockColumn} />
      </div>

      <Card title={`已选字段 ${clickedColCount}`} style={stCardRight} bodyStyle={stCardBody}>
        {chooseList}
      </Card>
      <Divider />
      {footer}
    </div>
  );
};

export default React.memo(SettingContent);
