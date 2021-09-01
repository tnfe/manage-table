import ManageTable  from "./lib";
import './App.css';
import React from "react";
import { mockColumns } from "./mock";

function App() {
  return (
    <div className="App">
      <ManageTable name="testTableSingle" columns={mockColumns()}/>
    </div>
  );
}

export default App;
