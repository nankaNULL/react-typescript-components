import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { API } from '@/api';

import { appReducer } from './reducer';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);
const middlewares = [thunk.withExtraArgument({API}), middleware];

const store = createStore(
  combineReducers({ routing: routerReducer, ...appReducer }),
  composeWithDevTools(applyMiddleware(...middlewares)) // 这个是配合着使用redux devTools 的一个插件
  // __PRODUCTION ? applyMiddleware(...middlewares): composeWithDevTools(applyMiddleware(...middlewares))
)
export default store;