import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main';
import { Provider } from 'react-redux';
import { setupStore } from './__data/store/store';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './components/Router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </Provider>
);
