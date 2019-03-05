import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import mySaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(mySaga)

export default store