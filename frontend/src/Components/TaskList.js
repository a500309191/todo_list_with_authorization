import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { login } from "../store/userSlice"
import { Task } from "./Task"
import { TaskEdited } from "./TaskEdited"


export const TaskList = () => {
    const tasks = useSelector(state => state.user.tasks)
    const dispatch = useDispatch()
    const editTask = useSelector(state => state.user.editTask)

    useEffect(() => {
        dispatch(login())
      }, [dispatch])

    console.log("tasks list: ", tasks)
    console.log("editTask: ", editTask)

    return (
        <div className="tasks">
            {tasks.map((task, index) => 
                editTask == task.id
                    ? <TaskEdited task={task} key={task.id}/>
                    : <Task task={task} key={task.id}/>
            )}
        </div>
    )
}