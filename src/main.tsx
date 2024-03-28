import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader';
import '@emdgroup-liquid/liquid/dist/css/liquid.global.css';

import { App } from './app';
import './style.css';

window.__LD_ASSET_PATH__ = window.location.origin + '/liquid/';

defineCustomElements();

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </React.StrictMode>,
  );
}
