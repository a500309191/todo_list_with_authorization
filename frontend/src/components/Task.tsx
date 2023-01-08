import { useAppDispatch, useAppSelector } from "../hooks"
import { updateTasks } from "../store/taskSlice"
import { editTask } from "../store/taskSlice"
import { Task as TaskType } from "../schemas/taskSchemas"



export const Task: React.FC<TaskType> = ({id, title, body, expiry_date}) => {
    const edit = useAppSelector(state => state.task.edit)
    const dispatch = useAppDispatch()
    
    
    const expiryDate = new Date(expiry_date.slice(0,-1))
    const nowDateStamp = Date.now()
    const expiryDateStamp = Date.parse(expiry_date.slice(0,-1))
    const [Y, M, D, h, m] = [
        expiryDate.getFullYear(), 
        `${expiryDate.getMonth() < 10 ? `0${expiryDate.getMonth()+1}` : expiryDate.getMonth()+1}`,
        `${expiryDate.getDate() < 10 ? `0${expiryDate.getDate()}` : expiryDate.getDate()}`,
        `${expiryDate.getHours() < 10 ? `0${expiryDate.getHours()}` : expiryDate.getHours()}`,
        `${expiryDate.getMinutes() < 10 ? `0${expiryDate.getMinutes()}` : expiryDate.getMinutes()}`,
    ]

    
    const deleteTask = (id: number) => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${JSON.parse(token)}`
                }
            })
            .then(res => console.log("DELETE TASK RESPONSE: ", res))
            .then(() => dispatch(updateTasks(token)))
        } else {
            console.log("there is no token")
        }
    }


    return (
        <div className={`task ${edit === id ? "hide" : ""} ${expiryDateStamp < nowDateStamp ? "outdated" : ""}`}>
            <div className="task-title">{title}</div>
            <div className="task-body">{body}</div>
            <div className="task-date">{D}.{M}.{Y} / {h}:{m}</div>
            <div className="task-buttons">
                <div className="task-button-edit" onClick={() => dispatch(editTask(id))}>EDIT</div>
                <div className="task-button-delete" onClick={() => deleteTask(id)}>DELETE</div>
            </div>
        </div>
    )
}