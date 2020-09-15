import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import DOME from './dome';
import DOME from './dome002';
// import Process from './zxy/process';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <DOME />
    {/*<Process />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
