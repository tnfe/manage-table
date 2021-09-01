import ManageTable  from "./lib";
import './App.css';
import React from "react";
import { Button } from "antd";
import mockColumns from "./mock";

function AppRef() {
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
      <ManageTable ref={ref} SettingComp={SettingHeader} name="testTable" columns={mockColumns}/>
    </div>
  );
}

export default AppRef;
