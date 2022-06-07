import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppRef from './AppRef';
import AppGroup from './AppGroup';
import AppGroupWithAlwaysShow from './AppGroupWithAlwaysShow';
import 'antd/dist/antd.css';
import AppFixedColumn from './AppFixedColumn';

ReactDOM.render(
  <div>
    <App />
    <AppRef />
    <AppGroup />
    <AppGroupWithAlwaysShow />
    <AppFixedColumn />
  </div>,
  document.getElementById('root')
);
