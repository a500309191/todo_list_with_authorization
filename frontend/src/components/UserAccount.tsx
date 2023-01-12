import { TaskList } from "./TaskList"
import { AddTask } from "./AddTask"
import { PersonalData } from "./PersonalData"
import { useAppSelector, useAppDispatch } from "../hooks"
import { getUserData } from "../store/userSlice"
import { useEffect } from "react"


export const UserAccount = () => {

    return (
        <div className="user-account">
            <PersonalData />
            <TaskList />
            <AddTask />
        </div>
    )
}