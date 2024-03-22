import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './__data/store/store';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './components/Router';

import style from './styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>
);
