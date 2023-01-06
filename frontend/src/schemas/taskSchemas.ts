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
    user: number
}

export type TasksState = {
    tasks: Task[]
    isAuthenticated: boolean
    edit: null | number
    loading: boolean
    error: null
    user_id: null | number
}
