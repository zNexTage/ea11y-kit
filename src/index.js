import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Form from './examples/form/Form'
import TableExample from './examples/table/TableExample';
import Textbox from './lib/fields/textbox';
import Figure from './lib/images/figure/Figure';
import FigureExample from './examples/figure/FigureExampe';
import AudioExample from './examples/audio/AudioExample';
import Link from './lib/links/link';
import DownloadLink from './lib/links/download-link';
import VideoExample from './examples/videos/VideoExample';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    {/* <DownloadLink
      extension='.pdf'
      fileName='Cartilha de acessibilidade do W3C'
      href='https://acervo.ceweb.br/acervos/conteudo/8d6506be-5d3f-4e88-900f-df8749d81c36'
      size={3.15}
      unit='MB'
    /> */}

    <VideoExample />
    {/* <AudioExample /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
