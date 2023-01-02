import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { login } from "../store/userSlice"
import { Task } from "./Task"
import { TaskEdited } from "./TaskEdited"


export const TaskList = () => {
    const tasks = useSelector(state => state.user.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(login())
      }, [dispatch])

    console.log("tasks list: ", tasks)

    return (
        <div className="tasks">
            {tasks.map((task, index) => 
                <div className="task-container" key={task.id}>
                    <TaskEdited task={task} />
                    <Task task={task} />
                </div>
            )}
        </div>
    )
}