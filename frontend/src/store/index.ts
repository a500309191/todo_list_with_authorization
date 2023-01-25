import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import taskReducer from "./editSlice";
import userReducer from "./userSlice";
// import taskReducer from "./taskSlice";
// import userReducer from "./userSlice";



// const reducer = combineReducers({
//     task: taskReducer,
//     user: userReducer
// })

// const store = configureStore({ reducer })

const store = configureStore({
    reducer: {
        edit: taskReducer,
        user: userReducer,
    },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
