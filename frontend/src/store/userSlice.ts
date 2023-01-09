import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import type { Login } from "../schemas/taskSchemas"


// export const createAccount = createAsyncThunk<string, Login, {rejectValue: string}>(
//     'user/createAccount',
// 	async ({email, password}, thunkAPI) => {
//         const response = await fetch("http://localhost:8000/api/auth/users/", {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({"email": email, "password": password })
//         })

//         if (!response.ok) {
//             return thunkAPI.rejectWithValue("something went wrong")
//         }

//         const data = await response.json()
//         return data
// 	}
// )


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