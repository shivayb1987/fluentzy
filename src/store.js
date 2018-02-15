import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducers'
export const history = createHistory()

const reduxRouterMiddleware = routerMiddleware(history)

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, reduxRouterMiddleware)
)
sagaMiddleware.run(sagas)

export default store
