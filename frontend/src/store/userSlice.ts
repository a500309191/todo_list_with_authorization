import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import type { Login, User, Task as TaskType, TasksState } from "../schemas/schemas"


export const setToken = createAsyncThunk<User, Login, {rejectValue: string}>(
    'task/setToken',
	async ({email, password}, thunkAPI) => {
        const response = await fetch("http://localhost:8000/auth/token/login/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email, "password": password })
        })

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }

        const data = await response.json()
        console.log("LOGIN: ", data)
        return data.auth_token
	}
)



export const createAccount = createAsyncThunk<User, Login, {rejectValue: string}>(
    'user/createAccount',
	async ({email, password}, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/auth/users/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email, "password": password })
        })

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }

        const data = await response.json()
        return data
	}
)


const initialState: User = {
    email: "",
    password: "",
    id: 0,
    isAuthenticated: false,
    loading: true,
    error: null,
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
    extraReducers: builder => {
        builder
            .addCase(createAccount.fulfilled, (state, action) => {
                console.log(action.payload)
                state.id = action.payload.id
                state.email = action.payload.email
            })
            .addCase(setToken.fulfilled, (state, action) => {
                console.log("SET TOKEN")
                localStorage.setItem('token', JSON.stringify(action.payload))
                state.isAuthenticated = true
            })
    }
})


export const { setEmail, setPassword } = userSlice.actions
export default userSlice.reducer