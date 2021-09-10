import React, { useEffect, useImperativeHandle, useState } from "react";
import { KeyRecord } from "./type";
import { Checkbox, CheckboxOptionType, Divider, Tag } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const stSelectableItem = { display: 'inline-block', width: '208px' };

interface GroupSetProps {
  title?: string;
  groupIndex: number;
  records: KeyRecord[];
  handleSaveChange: (index: number, checkeds: string[] | string) => void
}

const GroupSet = React.forwardRef((props: GroupSetProps, ref) => {
  const [bigOptions, setBigOptions] = useState<CheckboxOptionType[]>([]); // 所有选项
  const [indeterminate, setIndeterminate] = React.useState(true); // 是否全选
  const [totalCount, setTotalCount] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<string[]>([]); // 选中的对象

  useEffect(() => {
    const options: CheckboxOptionType[] = [];
    const checkeds: string[] = [];
    let total = 0;

    // 遍历可选项
    props.records.forEach((item) => {
      const dataIndex = item.dataIndex as string;
      if (dataIndex) {
        total++;
        options.push({
          label: item.title,
          value: item.dataIndex,
        });
        if (item.show) {
          checkeds.push(dataIndex);
        }
      }
    });

    // 初始化状态
    setTotalCount(total);
    setBigOptions(options);
    setCheckedList(checkeds);
    setIndeterminate(checkeds.length !== totalCount && checkeds.length !== 0);
  }, [props.records]);

  useImperativeHandle(ref, () => {
    return {
      clearCheck: () => {
        setCheckedList([]);
        setIndeterminate(false);
      },
      selectAll: () => {
        const ckds = props.records.map((item) => item.dataIndex)
        setCheckedList(ckds);
        setIndeterminate(false);
      },
      removeCheck: (key: string) => {
        const list = checkedList.slice();
        const index = list.indexOf(key);
        if (index !== -1) {
          list.splice(index, 1);
        }
        setCheckedList(list);
      }
    }
  })

  const changeAllChecked = (event: CheckboxChangeEvent) => {
    const checked = event.target.checked;
    setIndeterminate(false);
    if (checked) {
      const ckds = props.records.map((item) => item.dataIndex)
      setCheckedList(ckds);
      props.handleSaveChange(props.groupIndex, ckds);
    } else {
      setCheckedList([]);
      props.handleSaveChange(props.groupIndex, []);
    }
  };

  // 单选操作
  const handleChange = (values: CheckboxValueType[]) => {
    let single: string = '';
    for (let i = 0; i < checkedList.length || i < values.length; i++) {
     if (values[i] !== checkedList[i]) {
       single = checkedList[i] || values[i] as string;
       break;
     }
    }
    setCheckedList(values as string[]);
    setIndeterminate(values.length !== totalCount);
    setIndeterminate(values.length !== totalCount && values.length !== 0);
    props.handleSaveChange(props.groupIndex, single as string);
  };

  const cardTitle = props.title ? (
    <span>
      <Tag color="#3c71f8">{props.title}</Tag>
      <Checkbox
        indeterminate={indeterminate}
        onChange={changeAllChecked}
        checked={checkedList.length === totalCount}
        style={{ marginLeft: '18px' }}
      >
        {checkedList.length}/{totalCount}
      </Checkbox>
    </span>
  ) : null;
  return (
    <>
      {cardTitle}
      <p/>
        <Checkbox.Group value={checkedList} onChange={handleChange}>
          {bigOptions.map((item) => {
            return (
              <span key={item.value as string} style={stSelectableItem}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </span>
            );
          })}
        </Checkbox.Group>
      <Divider/>
    </>
  );
});
export default React.memo(GroupSet);
