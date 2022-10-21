import ManageTable from "./lib";
import './App.css';
import React from "react";
import { Button } from "antd";
import { mockGroup, mockGroupDataSource } from "./mock";

const AppGroupRef = () => {
  const columns = mockGroup();
  const ref: any = React.createRef();

  const handleSet = () => {
    ref.current.showModal();
  };

  const SettingHeader = (
    <div style={{ textAlign: 'left' }}>
      <Button type="primary" onClick={handleSet}>自定义设置</Button>
    </div>
  );
  return (
    <div className="App">
      自定义分组设置
      <ManageTable
        defaultShowKeys={["title1_1","title1_9","title1_3","title1_5","title1_7"]}
        ref={ref}
        rowKey="id"
        dataSource={mockGroupDataSource()}
        SettingComp={SettingHeader}
        name="testTableGroup" columns={columns}
      />
    </div>
  );
};

export default AppGroupRef;
