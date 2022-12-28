import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { login } from "../store/userSlice"
import { Task } from "./Task"


export const TaskList = () => {
    const tasks = useSelector(state => state.user.tasks)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(login())
      }, [dispatch])

    console.log("tasks list: ", tasks)

    return (
        <div className="tasks">
            {tasks.map((task, index) => <Task task={task} key={task.id}/> )}
        </div>
    )
}