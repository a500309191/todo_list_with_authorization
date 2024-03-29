import { useAppDispatch, useAppSelector } from "../../../hooks"
import { updateUserData } from "../../../store/userSlice"
import { editTask, selectTask } from "../../../store/editSlice"
import { Task as TaskType } from "../../../schemas/schemas"



export const Task: React.FC<TaskType> = ({id, title, body, expiry_date}) => {
    const editState = useAppSelector(state => state.edit)
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
            .then(() => dispatch(updateUserData(token)))
        } else {
            console.log("there is no token")
        }
    }


    return (
        <div
            className=
                {`task ${editState.editableTask === id ? "hide" : ""} 
                ${expiryDateStamp < nowDateStamp ? "outdated" : ""}`}
            onClick={() => dispatch(selectTask(id))}
        >
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