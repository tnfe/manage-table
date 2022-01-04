import ManageTable from "./lib";
import './App.css';
import React from "react";
import { Button } from "antd";
import { mockGroup, mockGroupDataSource } from "./mock";

const defaultShowKeys = ['title0_0', 'title0_1', 'title1_1'];
const initialShowKeys = ['title0_0', 'title0_1', 'title1_1', 'title1_2'];

const AppGroupWithAlwaysShowRef = () => {
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
      <ManageTable
        ref={ref}
        rowKey="id"
        dataSource={mockGroupDataSource()}
        SettingComp={SettingHeader}
        name="testTableGroupAlwaysShow"
        columns={mockGroup(defaultShowKeys)}
        initialShowKeys={initialShowKeys}
        defaultShowKeys={defaultShowKeys}
        onKeysSelected={(keys) => console.log(keys)}
        scroll={{
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default AppGroupWithAlwaysShowRef;
