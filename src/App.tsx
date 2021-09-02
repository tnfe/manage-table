import ManageTable  from "./lib";
import './App.css';
import React from "react";
import { mockColumns, mockDataSource } from "./mock";

function App() {
  return (
    <div className="App">
      <ManageTable name="testTableSingle" rowKey="id" dataSource={mockDataSource()} columns={mockColumns()}/>
    </div>
  );
}

export default App;
