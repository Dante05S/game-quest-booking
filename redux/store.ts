import {
  type Action,
  combineReducers,
  configureStore,
  type ThunkAction
} from '@reduxjs/toolkit';

import reducers from './reducers';

const combinedReducer = combineReducers(reducers);
const store = configureStore({
  reducer: combinedReducer
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export default store;
