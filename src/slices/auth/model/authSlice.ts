import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LoginResponse } from './types'
import { initialAuthState } from './types'
import { readStoredAuthState } from './authStorage'

const authSlice = createSlice({
  name: 'auth',
  initialState: readStoredAuthState(),
  reducers: {
    storeSession: (_state, action: PayloadAction<LoginResponse>) =>
      action.payload,
    clearSession: () => initialAuthState,
  },
})

export const { clearSession, storeSession } = authSlice.actions
export const authReducer = authSlice.reducer
