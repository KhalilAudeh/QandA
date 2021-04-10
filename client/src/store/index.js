// 1ST: STORE -> GLOBALIZED STATE SETUP
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Sagas } from './sagas'
import reducer from './reducer'
import { fork, all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga() {
  yield all([...Sagas.map(saga => fork(saga))]);
}


export const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);

