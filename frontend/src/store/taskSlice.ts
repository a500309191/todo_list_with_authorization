import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from "@reduxjs/toolkit";
import type { Task as TaskType, TasksState, Login } from "../schemas/schemas"



export const getTasks = createAsyncThunk<TaskType[], void, {rejectValue: string}>(
	'task/getTasks',
	async (_, thunkAPI) => {
        const token = localStorage.getItem('token')
        
        if (token) {
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
    tasks: [],
    edit: null,
    loading: true,
    error: null,
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
            .addCase(getTasks.pending, state  => {
                state.error = null
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload
            })
            .addCase(updateTasks.pending, state  => {
                state.error = null
            })
            .addCase(updateTasks.fulfilled, (state, action) => {
                state.loading = false
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

