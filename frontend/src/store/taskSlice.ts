import { createSlice } from "@reduxjs/toolkit";
import type { TaskState } from "../schemas/schemas"


const initialState: TaskState = {
 editableTask: null
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        editTask(state, action) {
            state.editableTask = action.payload
        },
    },
})



export const { editTask } = taskSlice.actions
export default taskSlice.reducer

