import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// rendering content at top level of webapp
root.render(
  // strictmode helps us in development phase to identify bugs and error before moving on to production
  <React.StrictMode>
    {/* using browser router in order to navigate through our app using react-router */}
    <BrowserRouter>
    {/* wrapping main app with redux provider with a store to use its variable in whole app */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
