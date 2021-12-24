import ManageTable  from "./lib";
import './App.css';
import React, { useEffect, useState } from "react";
import { mockColumns, mockDataSource } from "./mock";

const App = () => {
  const [columns, setColumns] = useState(mockColumns().slice(0, 10));
  useEffect(() => {
    setTimeout(() => {
      setColumns(mockColumns());
    }, 2000);
  }, []);
  return (
    <div className="App">
      <ManageTable name="testTableSingle" rowKey="id" dataSource={mockDataSource()} columns={columns}/>
    </div>
  );
};

export default App;
