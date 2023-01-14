import { TaskList } from "./TaskList"
import { AddTask } from "./AddTask"
import { Header } from "./Header"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getUserData } from "../store/userSlice"
import { useEffect } from "react"


export const UserAccount = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserData())
      }, [dispatch])

    return (
        <div className="user-account">
            <Header />
            <TaskList />
            <AddTask />
        </div>
    )
}