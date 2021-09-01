import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppRef from './AppRef';
// import AppGroup from './AppGroup';
import 'antd/dist/antd.css';

ReactDOM.render(
  <div>
    <App />
    <AppRef />
    {/*<AppGroup />*/}
  </div>,
  document.getElementById('root')
);
