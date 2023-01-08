import { useAppSelector, useAppDispatch } from "../hooks"
import { useEffect } from "react"
import { login } from "../store/taskSlice"
import { Task } from "./Task"
import { TaskEdited } from "./TaskEdited"


export const TaskList = () => {
    const tasks = useAppSelector(state => state.task.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(login())
      }, [dispatch])

    console.log("tasks list: ", tasks)

    return (
        <div className="tasks">
            {tasks.map((task) => 
                <div className="task-container" key={task.id}>
                    <TaskEdited {...task} />
                    <Task {...task} />
                </div>
            )}
        </div>
    )
}