import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from './userSlice'


const store = configureStore({
    reducer: {
        user: authReducer
    }
})


export default store


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;