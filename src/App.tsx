import ManageTable  from "./lib";
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
  return (
    <div className="App">
      <ManageTable name="testTable" columns={mockColumns}/>
    </div>
  );
}

export default App;
