import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Textbox from './lib/fields/textbox';
import Checkbox from './lib/fields/checkbox/Checkbox';
import Color from './lib/fields/color';
import UploadField from './lib/fields/upload-field';
import DownloadLink from './lib/links/download-link';
import ImageButton from './lib/fields/image-button';
import RadioButton from './lib/fields/radio-button';
import Range from './lib/fields/range';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Textbox label='Nome' id='txtName' type='text' placeholder="Digite aqui..." isRequired={true} />
    <Textbox label='Email' id='txtEmail' type='text' placeholder="Digite aqui..." />
    <Textbox label='Número' id='numero' type='number' placeholder="Digite aqui..." />
    <Textbox label='Data de nascimento' id='aniversario' type='datetime-local' placeholder="Digite aqui..." />
    <Checkbox label="Teste" id='cboTeste' />
    <UploadField label="Teste" id="document" accept={"image/png, image/jpeg"} acceptDescription={"Apenas imagens nos formatos PNG e JPG"} />
    <Color id={"lblColor"} name={"clColor"} label={"Selecione uma cor"} />
    <DownloadLink fileName='Teste' href='http://teste.com' size='10' unit='KB' />
    <ImageButton src="https://raw.githubusercontent.com/mdn/learning-area/master/html/forms/image-type-example/login.png" alt="Login image" />

    <RadioButton id='rbTeste' label='Teste' name='teste' isRequired />
    <RadioButton id='rbXd' label='Teste' name='teste' />
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
