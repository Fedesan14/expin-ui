import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LoginResponse } from './types'
import { initialAuthState } from './types'

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    storeSession: (_state, action: PayloadAction<LoginResponse>) =>
      action.payload,
    clearSession: () => initialAuthState,
  },
})

export const { clearSession, storeSession } = authSlice.actions
export const authReducer = authSlice.reducer
