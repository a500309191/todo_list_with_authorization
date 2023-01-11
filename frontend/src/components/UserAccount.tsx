import { TaskList } from "./TaskList"
import { AddTask } from "./AddTask"
import { PersonalData } from "./PersonalData"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getTasks } from "../store/taskSlice"
import { useEffect } from "react"


export const UserAccount = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasks())
      }, [dispatch])


    return (
        <div className="user-account">
            <PersonalData />
            <TaskList />
            <AddTask />
        </div>
    )
}