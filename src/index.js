import partial from 'lodash/partial'

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

import App from './App'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(sagas)

const action = (type, payload) => store.dispatch({type, payload})

function render () {
  ReactDOM.render(
    <App
      value={store.getState()}
      onClick={partial(action, 'HANDLE_REQUEST')} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
