import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

import './index.css';
injectTapEventPlugin();

let store = createStore(reducers);

ReactDOM.render(
	<Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);
