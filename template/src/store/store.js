import {applyMiddleware, configureStore} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import reducers, {persistConfig} from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const middlewareEnhancer = applyMiddleware(sagaMiddleware)

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({serializableCheck: false, thunk: false})
  },
  enhancers: [middlewareEnhancer],
})

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export {store, persistor}
