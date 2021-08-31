import React, { useEffect, useState } from 'react';
import { KeyRecord } from './type';
import { Button, Card, Checkbox, CheckboxOptionType, Divider } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CloseOutlined, DoubleLeftOutlined, MoreOutlined } from '@ant-design/icons';

const stCardLeft = { height: '70vh', width: '60%', display: 'inline-block', verticalAlign: 'top' };
const stCardRight = { height: '70vh', width: '32%', display: 'inline-block', verticalAlign: 'top' };
const stSelectableItem = { display: 'inline-block', width: '208px' };
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
let saveMap: Record<string, string> = {};

interface SettingContentProps {
  choose: KeyRecord[];
  onOk: (keys: string[]) => void;
  onCancel: () => void;
}
const SettingContent = (props: SettingContentProps) => {
  const [bigOptions, setBigOptions] = useState<CheckboxOptionType[]>([]); // 所有选项
  const [indeterminate, setIndeterminate] = React.useState(true); // 是否全选
  const [checkedList, setCheckedList] = useState<string[]>([]); // 选中的对象
  const [clickedColCount, setClickedColCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  // 准备数据阶段
  useEffect(() => {
    const options: CheckboxOptionType[] = [];
    const checkeds: string[] = [];
    let checkedNum = 0;
    let total = 0;
    const map: Record<string, string> = {};
    props.choose.forEach((item) => {
      const dataIndex = item.dataIndex as string;
      if (dataIndex) {
        map[dataIndex] = item.title as string;
        total++;
        options.push({
          label: item.title,
          value: item.dataIndex as CheckboxValueType,
        });
        if (item.show) {
          checkedNum++;
          checkeds.push(dataIndex);
        }
      }
    });
    saveMap = map;
    setTotalCount(total);
    setBigOptions(options);
    setCheckedList(checkeds);
    setClickedColCount(checkedNum);
    setAllChecked(checkedNum === totalCount);
    setIndeterminate(checkedNum !== totalCount);
  }, [props.choose]);
  const changeAllChecked = (event: CheckboxChangeEvent) => {
    const checked = event.target.checked;
    setIndeterminate(false);
    if (checked) {
      setAllChecked(true);
      setClickedColCount(totalCount);
      setCheckedList(props.choose.map((item) => item.dataIndex) as string[]);
    } else {
      setAllChecked(false);
      setClickedColCount(0);
      setCheckedList([]);
    }
  };
  const handleChange = (values: CheckboxValueType[]) => {
    setCheckedList(values as string[]);
    setIndeterminate(values.length !== totalCount);
    setClickedColCount(values.length);
    setAllChecked(values.length === totalCount);
  };

  const unClickedColKey = (key: string) => {
    const now = checkedList?.slice();
    const index = now?.indexOf(key);
    if (index !== -1) {
      now?.splice(index, 1);
      setCheckedList(now);
      setIndeterminate(true);
      setClickedColCount(clickedColCount - 1);
    }
  };

  const clearLockColumn = () => {
    setCheckedList([]);
    setClickedColCount(0);
    setIndeterminate(false);
  };

  const cardTitle = (
    <span>
      可选字段
      <Checkbox
        indeterminate={indeterminate}
        onChange={changeAllChecked}
        checked={allChecked}
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
        <Checkbox.Group value={checkedList} onChange={handleChange}>
          {bigOptions.map((item) => {
            return (
              <span key={item.value as string} style={stSelectableItem}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </span>
            );
          })}
        </Checkbox.Group>
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
