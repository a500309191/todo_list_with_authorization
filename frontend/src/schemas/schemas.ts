export type Login = {
    email: string
    password: string
}

export type User = {
    email: string
    password: string
    id: number
    isAuthenticated: boolean
    loading: boolean
    error: null
}

export type Task = {
    id: number
    title: string
    body: string
    expiry_date: string
    is_done: boolean
    user: number
}

export type TasksState = {
    tasks: Task[]
    edit: null | number
    loading: boolean
    error: null
}
