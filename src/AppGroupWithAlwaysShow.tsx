import ManageTable from "./lib";
import './App.css';
import React from "react";
import { Button } from "antd";
import { mockGroup, mockGroupDataSource } from "./mock";

const defaultShowKeys = ['title0_0', 'title0_1', 'title1_1'];

const AppGroupRef = () => {
  const ref: any = React.createRef();

  const handleSet = () => {
    ref.current.showModal();
  };

  const SettingHeader = (
    <div style={{ textAlign: 'left' }}>
      <Button type="primary" onClick={handleSet}>自定义设置[某些列不再设置里]</Button>
    </div>
  );
  return (
    <div className="App">
      <ManageTable ref={ref} rowKey="id" dataSource={mockGroupDataSource()} SettingComp={SettingHeader}
        name="testTableGroup" columns={mockGroup(defaultShowKeys)} defaultShowKeys={defaultShowKeys}
        onKeysSelected={(keys) => alert(keys)}
        scroll={{
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default AppGroupRef;
