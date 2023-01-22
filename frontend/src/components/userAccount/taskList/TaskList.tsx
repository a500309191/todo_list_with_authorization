import { useAppSelector, useAppDispatch } from "../../../hooks"
import { useEffect } from "react"
import { Task } from "./Task"
import { TaskEdited } from "./TaskEdited"


export const TaskList = () => {
    const tasks = useAppSelector(state => state.user.tasks)
    console.log(tasks)

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