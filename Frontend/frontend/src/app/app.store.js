
import {configureStore} from '@reduxjs/toolkit';
import authReducer from './feactures/auth/auth.slice.js'
export const store = configureStore({
    reducer:{
        auth:authReducer
    }
})