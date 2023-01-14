import { createSlice } from "@reduxjs/toolkit";
import type { EditState } from "../schemas/schemas"


const initialState: EditState = {
    editableTask: null,
    settings: false
}

const editSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        editTask(state, action) {
            state.editableTask = action.payload
        },
        settingsOpen(state) {
            state.settings = true
        },
    },
})



export const { editTask, settingsOpen } = editSlice.actions
export default editSlice.reducer

