import {configureStore, combineReducers} from "@reduxjs/toolkit";
import AuthReducer from "../slices/authSlice";
import CoursesReducer from "../slices/CourseSlice"
import {setupListeners} from "@reduxjs/toolkit/query";


export const rootReducer =  combineReducers({
    courses: CoursesReducer, 
    auth: AuthReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export default store;
setupListeners(store.dispatch);