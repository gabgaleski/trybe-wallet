import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;

// Ideia retirada do codigo da Natália Schmidt para o Cypress encontrar o store

if (window.Cypress) {
  window.store = store;
}
