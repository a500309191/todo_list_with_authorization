export type Login = {
    email: string
    password: string
}

export type Task = {
    id: number
    title: string
    body: string
    expiry_date: string
    is_done: boolean
}

export type Tasks = {
    tasks: Task[]
}

export type User = {
    email: string
    password: string
    id: number
    tasks: Task[]
    edit: null | number
    isAuthenticated: boolean
    isActivated: boolean
    loading: boolean
    error: null
}

export type CreateUser = {
    email: string
    id: number
}

export type ActivateUser = {
    uid: string
    token: string
}

export type ResetPassword = {
    newPassword: string
    reNewPassword: string
    currentPassword: string
}

export type DeleteUser = {
    password: string
}

export type EditState = {
    editableTask: null | number
    settingsToggle: boolean
    resetPasswordToggle: boolean
    deleteUserToggle: boolean
}

