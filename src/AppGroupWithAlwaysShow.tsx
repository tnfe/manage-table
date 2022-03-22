import ManageTable from "./lib";
import './App.css';
import React from "react";
import { Button } from "antd";
import { mockGroup, mockGroupDataSource } from "./mock";

const defaultShowKeys = ["title0_0","title0_1","title0_5","title1_0","title1_1","title1_3","title1_5","title2_0","title2_5","title3_0","title3_5"];
const fixedShowKeys = ['title0_0', 'title0_1', 'title1_1'];

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
        columns={mockGroup(fixedShowKeys)}
        defaultShowKeys={defaultShowKeys}
        fixedShowKeys={fixedShowKeys}
        onKeysSelected={(keys) => console.log(keys)}
        scroll={{
          x: 'max-content',
        }}
      />
    </div>
  );
};

export default AppGroupWithAlwaysShowRef;
