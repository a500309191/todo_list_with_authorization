import { TaskList } from "./taskList/TaskList"
import { AddTask } from "./AddTask"
import { Settings } from "./Settings"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { getUserData } from "../../store/userSlice"
import { useEffect } from "react"


export const UserAccount = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getUserData())
      }, [dispatch])

    

    return (
        <div className="user-account">
            <Settings />
            <TaskList />
            <AddTask />
        </div>
    )
}