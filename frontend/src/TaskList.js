import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { login } from "./store/userSlice"


export const TaskList = () => {
    const tasks = useSelector(state => state.user.tasks)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(login())
      }, [dispatch])

    console.log("tasks list: ", tasks)

    return (
        <div className="tasks">
            {tasks.map((task, index) => {
                return (
                    <div className="task" key={index}>
                        <div className="task-title">{task.title}</div>
                        <div className="task-body">{task.body}</div>
                    </div>
                )
            })}
        </div>
    )
}