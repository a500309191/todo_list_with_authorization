import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import type { Task as TaskType, TasksState, Login } from "../schemas/schemas"


export const setToken = createAsyncThunk<string, Login, {rejectValue: string}>(
    'task/getToken',
	async ({email, password}, thunkAPI) => {
        console.log("setToken started")
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


export const login = createAsyncThunk<TaskType[], void, {rejectValue: string}>(
	'task/login',
	async (_, thunkAPI) => {
        const token = localStorage.getItem('token')
        
        if (token) {
            console.log("login started. token is catched")
            const response = await fetch('http://localhost:8000/api/tasks/', {
                method: "GET",
                headers: {"Authorization": `Token ${JSON.parse(token)}`}
            });
            
            if (!response.ok) {
                return thunkAPI.rejectWithValue("something went wrong")
            }

            const data = await response.json()
            return data
        } else {
            console.log("login started. there is no token")
            return thunkAPI.rejectWithValue("something went wrong")
        }
    }
)




export const updateTasks = createAsyncThunk<TaskType[], string, {rejectValue: string}>(
    'task/updateTasks',
    async (token, thunkAPI) => {
        const response = await fetch('http://localhost:8000/api/tasks/', {
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


const initialState: TasksState = {
    isAuthenticated: false,
    tasks: [],
    edit: null,
    loading: true,
    error: null,
    user_id: null,
}


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        editTask(state, action) {
            state.edit = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(setToken.fulfilled, (state, action) => {
                state.isAuthenticated = true
                localStorage.setItem('token', JSON.stringify(action.payload))
            })
            .addCase(login.pending, state  => {
                console.log("login loading")
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("login fulfilled")
                console.log(action.payload)
                state.loading = false
                state.isAuthenticated = true
                state.tasks = action.payload
            })
            .addCase(updateTasks.pending, state  => {
                state.error = null
            })
            .addCase(updateTasks.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.tasks = action.payload
            })
			// .addCase(updateTasks.rejected, (state, action) => {
			// 	state.loading = false
            //     state.status = "rejected"
            //     state.error = action.payload
			// })
    },
})



export const { editTask } = taskSlice.actions
export default taskSlice.reducer

