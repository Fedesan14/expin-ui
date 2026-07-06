import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../api/baseApi'
import { authReducer } from '../../slices/auth/model/authSlice'
import { writeStoredAuthState } from '../../slices/auth/model/authStorage'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
})

store.subscribe(() => {
  writeStoredAuthState(store.getState().auth)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
