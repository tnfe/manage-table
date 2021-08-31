<p align="center">
  <img width="400px" src="https://github.com/tnfe/manage-table/blob/master/img/logo.png?raw=true" />
</p>

# manage-table
基于antd + react 进行封装，使项目可以对组件进行管理

## 使用
支持直接引用，使用内置设置
```typescript
import ManageTable  from "manage-table";
import './App.css';
import React from "react";

function App() {
  const mockColumns = new Array(50).fill('').map((_item: string, index) => {
    return {
      dataIndex: 'title' + index,
      key: 'title' + index,
      title: '标题' + index,
      show: index % 3 === 0,
    };
  });
  mockColumns.push({
    dataIndex: 'action',
    key: 'action',
    title: '操作',
    show: true,
  });
  console.log(mockColumns)
  return (
    <div className="App">
      <ManageTable name="testTable" columns={mockColumns}/>
    </div>
  );
}

export default App;

```
支持自定义设置：
```javascript
import React from "react";
import { Button } from "antd";
import ManageTable from "manage-table";
import "./styles.css";

export default function App2() {
  const mockColumns = new Array(50).fill("").map((_item, index) => {
    return {
      dataIndex: "title" + index,
      key: "title" + index,
      title: "标题" + index,
      show: index % 3 === 0
    };
  });
  mockColumns.push({
    dataIndex: "action",
    key: "action",
    title: "操作",
    show: true
  });
  const ref = React.createRef();
  const handleShowModal = () => {
    ref.current.showModal();
  };
  const SettingHeader = (
    <div style={{ textAlign: "left" }}>
      <Button onClick={handleShowModal}>自定义设置</Button>
    </div>
  );
  return (
    <div className="App">
      <ManageTable
        ref={ref}
        SettingComp={SettingHeader}
        name="testTable2"
        columns={mockColumns}
      />
    </div>
  );
}

```

## demo展示
示例参考：[codesanbox - manage-table](https://codesandbox.io/s/sad-jones-2tgf5)

![](https://github.com/tnfe/manage-table/blob/master/img/lia.png?raw=true)

![](https://github.com/tnfe/manage-table/blob/master/img/demo.png?raw=true)
