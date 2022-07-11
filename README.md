<p align="center">
  <img width="400px" src="https://github.com/tnfe/manage-table/blob/master/img/logo.png?raw=true" />
</p>

<p align="center">
<a href="https://www.npmjs.org/package/manage-table"><img title="npm package" src="https://img.shields.io/npm/v/manage-table.svg" /></a>
<a href="https://npmjs.org/package/manage-table"><img title="NPM downloads" src="http://img.shields.io/npm/dm/manage-table.svg" /></a>
</p>

在日常业务中，经常会使用到antd的table组件。
使用的最开始只显示几行字段，可是后面展示的字段越来越多，而且不同的人希望看到的字段是不一样的。
基于此，封装了`manage-table`, 内部还是使用了antd，只是增加了对显示列的灵活操作的处理逻辑。


manage-table 内置了 设置展示的列 存储在localstorage的功能，将会使用参数name进行唯一存储，
所以在使用的时候，请保持单一域名内所需展示列的唯一性。

## Install and Include
安装
```shell script
$ npm install manage-table --save
```
使用方式一：支持直接引用，使用内置设置
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
使用方式二：支持自定义设置：
```javascript
import React from "react";
import { Button } from "antd";
import ManageTable from "manage-table";

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
使用方式三、按组划分
```javascript
import React from "react";
import { Button } from "antd";
import ManageTable from "manage-table";

const mockGroup = () => {
  const data: ManageColumnType[] = [];
    new Array(4).fill('').forEach((_item: string, index: number) => {
      new Array(10).fill('').forEach((_item: string, indx) => {
        const dataIndex = `title${index}_${indx}`
        const item: any = {
          dataIndex,
          key: dataIndex,
          title: '标题' + index + '_' + indx,
          show: indx % 5 === 0,
          group: '分组' + index,
          render: (val: string) => val,
        };
        if (dkeys.includes(dataIndex)) {
          item.show = true;
        }
        data.push(item);
      })
    });
    data.push({
      dataIndex: 'action',
      key: 'action',
      title: '操作列',
      show: true,
      fixed: 'right',
      render: (val: string) => '跳转',
    })
    return data;
}

function AppGroupRef() {
  const ref: any = React.createRef();

  const handleSet = () => {
    ref.current.showModal();
  }

  const SettingHeader = (
    <div style={{textAlign: 'left'}}>
      <Button type="primary" onClick={handleSet}>自定义设置</Button>
    </div>
  );
  return (
    <div className="App">
      <ManageTable ref={ref} SettingComp={SettingHeader} name="testTableGroup" columns={mockGroup()}/>
    </div>
  );
}

export default AppGroupRef;
```


## 参数说明

ManageTable, 继承自antd的Table

| **参数名**     | **类型**     | **说明**     |
| ---------- | :-----------:  | :-----------: |
| name | string | 存储所使用的唯一的key，必传
| columns | ManageColumnType[] | GroupManageColumn[] | 列数据， 必传
| ref | React.createRef()的返回对象 | 增加面板， 非必传
| SettingComp | React.ReactNode | 自定义设置头部， 非必传
| setTitle | React.ReactNode、string | 自定义弹窗的标题，默认'设置显示字段'， 非必传
| defaultShowKeys | string[] | 响应恢复默认配置按钮
| fixedShowKeys | string[] | 固定显示的字段, 其所对应的column配置的show的值应该是true
| onKeysSelected | (keys: string[]) => void | 存储钩子函数，搭配自定义存储使用

ManageColumnType， 继承自antd的Table的ColumnType

| **参数名**     | **类型**     | **说明**     |
| ---------- | :-----------:  | :-----------: |
| show | boolean | 是否默认显示 |
| dataIndex | string | antd的dataindex |
| group | boolean | 分组名称 |

## demo展示
示例参考：[codesanbox - manage-table](https://codesandbox.io/s/sad-jones-2tgf5)

![](https://github.com/tnfe/manage-table/blob/master/img/lia.png?raw=true)

![](https://github.com/tnfe/manage-table/blob/master/img/single.png?raw=true)
![](https://github.com/tnfe/manage-table/blob/master/img/group.png?raw=true)

## 开发&测试

install and develop
```shell script
git clone git@github.com:tnfe/manage-table.git
cd manage-table
npm install
npm start
```
Then open http://localhost:3000/

build 
```
npm run build
```


## License

[The MIT License](https://opensource.org/licenses/MIT).
