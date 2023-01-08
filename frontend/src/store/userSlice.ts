import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import type { Login } from "../schemas/taskSchemas"


const initialState: Login = {
    email: "",
    password: "",
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload
        },
        setPassword(state, action) {
            state.password = action.payload
        },
    },
})



export const { setEmail, setPassword } = userSlice.actions
export default userSlice.reducer