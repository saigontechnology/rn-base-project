import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const middlewareEnhancer = applyMiddleware(sagaMiddleware)

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false, thunk: false}),
  enhancers: [middlewareEnhancer],
})

sagaMiddleware.run(rootSaga)

export {store}
