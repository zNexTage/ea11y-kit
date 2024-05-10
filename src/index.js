import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Range from './lib/fields/range';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <Range id='volume' min={0} max={5000} step={50} value={1000} label='Volume' name='volume' />

    {/* <Month id='txtMes' isRequired label='Teste' name='mes' fallbackMonthProps={{
      monthField: {
        id: "txtmes",
        label: "mes",
        name: "mes"
      },
      yearField: {
        id: "ano",
        label: "ano",
        name: "ano"
      }
    }} /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
