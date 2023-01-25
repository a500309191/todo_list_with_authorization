import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import type { Login, User, CreateUser, ActivateUser, ResetPassword, Task as TaskType } from "../schemas/schemas"



export const setToken = createAsyncThunk<string, Login, {rejectValue: string}>(
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
        return data.auth_token
	}
)


export const getUserData = createAsyncThunk<User, void, {rejectValue: string}>(
	'user/getUserData',
	async (_, thunkAPI) => {
        console.log("getUserData")
        const token = localStorage.getItem('token')
        
        if (token) {
            const response = await fetch('http://localhost:8000/api/user/', {
                method: "GET",
                headers: {"Authorization": `Token ${JSON.parse(token)}`}
            });
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue("something went wrong")
            }

            const data = await response.json()
            return data

        } else {
            return thunkAPI.rejectWithValue("something went wrong")
        }
    }
)


export const updateUserData = createAsyncThunk<User, string, {rejectValue: string}>(
    'user/updateTasks',
    async (token, thunkAPI) => {
        console.log("updateUserData")
        const response = await fetch('http://localhost:8000/api/user/', {
            method: "GET",
            headers: {"Authorization": `Token ${JSON.parse(token)}`}
        });
        
        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }

        const data = await response.json()
        return data
    }
)



export const createAccount = createAsyncThunk<CreateUser, Login, {rejectValue: string}>(
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


export const activateUser = createAsyncThunk<void, ActivateUser, {rejectValue: string}>(
    'user/activateUser',
    async ({uid, token}, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/auth/users/activation/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "uid": uid, "token": token })
        })
        console.log("activation response: ", response)

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }
    }
)


export const resetPassword = createAsyncThunk<void, ResetPassword, {rejectValue: string}>(
    'user/activateUser',
    async ({newPassword, reNewPassword, currentPassword}, thunkAPI) => {
        const response = await fetch("http://localhost:8000/api/auth/users/set_password/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "new_password": newPassword,
                "re_new_password": reNewPassword,
                "current_password": currentPassword,
            })
        })
        console.log("password reset response: ", response)

        if (!response.ok) {
            return thunkAPI.rejectWithValue("something went wrong")
        }
    }
)

const initialState: User = {
    email: "a500309191@gmail.com",
    password: "",
    id: 0,
    isAuthenticated: false,
    isActivated: false,
    loading: true,
    error: null,
    tasks: [],
    edit: null
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
        logOut(state) {
            localStorage.removeItem("token")
            state.isAuthenticated = false
            state.tasks = []
            state.password = ""
            state.email = ""
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createAccount.fulfilled, (state, action) => {
                console.log(action.payload)
                state.id = action.payload.id
                state.email = action.payload.email
            })
            .addCase(setToken.fulfilled, (state, action) => {
                localStorage.setItem('token', JSON.stringify(action.payload))
                let x = localStorage.getItem('token')
                console.log("TEST: ", x)
                state.isAuthenticated = true
            })
            .addCase(getUserData.pending, state  => {
                state.error = null
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                console.log("GET USER DATA: ", action.payload)
                state.loading = false
                state.tasks = action.payload.tasks
                state.email = action.payload.email
                state.id = action.payload.id
                state.isAuthenticated = true
                state.isActivated = true
                state.password = ""
            })
            .addCase(updateUserData.pending, state  => {
                state.error = null
                state.loading = true
            })
            .addCase(updateUserData.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload.tasks
                state.email = action.payload.email
                state.id = action.payload.id
            })
            .addCase(activateUser.pending, state  => {
                state.error = null
                state.loading = true
            })
            .addCase(activateUser.fulfilled, state => {
                state.isActivated = true
                state.loading = false
            })
            .addCase(activateUser.rejected, state => {
                state.loading = false
            })
    }
})


export const { setEmail, setPassword, logOut } = userSlice.actions
export default userSlice.reducer