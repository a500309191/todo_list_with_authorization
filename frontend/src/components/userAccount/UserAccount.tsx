import { useNavigate } from "react-router-dom";
import { TaskList } from "./taskList/TaskList"
import { AddTask } from "./AddTask"
import { Settings } from "./settings/Settings"
import { useAppSelector, useAppDispatch } from "../../hooks"
import { getUserData } from "../../store/userSlice"
import { useEffect } from "react"


export const UserAccount = () => {
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.user)

    useEffect(() => {
        dispatch(getUserData())
      }, [dispatch])

    const navigate = useNavigate()
    useEffect(() => {
        if (!userState.isAuthenticated) {
            return navigate('/')
        }
    }, [userState.isAuthenticated])

    return (
        <div className="user-account">
            <Settings />
            <TaskList />
            <AddTask />
        </div>
    )
}