import { createSlice } from "@reduxjs/toolkit";
import type { EditState } from "../schemas/schemas"


const initialState: EditState = {
    selectedTask: null,
    editableTask: null,
    settingsToggle: false,
    resetPasswordToggle: false,
    deleteUserToggle: false,
}

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        editTask(state, action) {
            state.editableTask = action.payload
        },
        selectTask(state, action) {
            state.selectedTask = action.payload
        },
        settingsToggle(state) {
            state.settingsToggle = !state.settingsToggle
            state.resetPasswordToggle = false
            state.deleteUserToggle = false
        },
        resetPasswordToggle(state) {
            state.resetPasswordToggle = !state.resetPasswordToggle
            if (state.deleteUserToggle) {
                state.deleteUserToggle = !state.deleteUserToggle
            }
        },
        deleteUserToggle(state) {
            state.deleteUserToggle = !state.deleteUserToggle
            if (state.resetPasswordToggle) {
                state.resetPasswordToggle = !state.resetPasswordToggle
            }
        }
    },
})



export const {
    editTask,
    selectTask,
    settingsToggle,
    resetPasswordToggle,
    deleteUserToggle
} = editSlice.actions
export default editSlice.reducer

