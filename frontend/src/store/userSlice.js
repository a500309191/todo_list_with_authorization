import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const setToken = createAsyncThunk(
    'user/getToken',
	async ({email, password}, thunkAPI) => {
        console.log("setToken started")
        try {
            const response = await fetch("http://localhost:8000/auth/token/login/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({"email": email, "password": password })
            })

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const data = await response.json()
            return data.auth_token
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
	}
)


export const login = createAsyncThunk(
	'user/login',
	async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            
            if (token) {
                console.log("login started. token is catched")
                const response = await fetch('http://localhost:8000/api/tasks/', {
                    method: "GET",
                    headers: {"Authorization": `Token ${JSON.parse(token)}`}
                });
                
                if (!response.ok) {
                    throw new Error("something went wrong")
                }
    
                const data = await response.json()
                return data
            } else {
                console.log("login started. there is no token")
                throw new Error("something went wrong")
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
	}
)



const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        registered: false,
        tasks: [],
        status: null,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setToken.fulfilled, (state, action) => {
                state.isAuthenticated = true
                localStorage.setItem('token', JSON.stringify(action.payload))
            })
            .addCase(login.pending, state  => {
                console.log("login loading")
                state.status = 'loading'
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("login fulfilled")
                console.log(action.payload)
                state.status = 'resolved'
                state.isAuthenticated = true
                state.registered = true
                state.tasks = action.payload
            })
			.addCase(login.rejected, (state, action) => {
                console.log("login rejected")
				state.loading = false
                state.status = "rejected"
                state.error = action.payload
			})
    },
})


//export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;
const { test } = userSlice.actions
export default userSlice.reducer