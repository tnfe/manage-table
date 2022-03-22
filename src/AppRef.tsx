import ManageTable  from "./lib";
import './App.css';
import React from "react";
import { Button } from "antd";
import { mockColumns, mockDataSource } from "./mock";

const AppRef = () => {
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
      自定义设置
      <ManageTable ref={ref} rowKey="id" setTitle="显示个设置标题" dataSource={mockDataSource()}  SettingComp={SettingHeader} name="testTableRef" columns={mockColumns()}/>
    </div>
  );
};

export default AppRef;
