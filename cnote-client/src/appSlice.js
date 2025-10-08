import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  timeCards: [],
  tableTimeCards: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setState: {
      prepare: (key, value) => {
        return { payload: { key, value } }
      },
      reducer: (state, action) => {
        const { key, value } = action.payload
        state[key] = value;
      }
    }
  },
})

export const { setState } = appSlice.actions

export default appSlice.reducer