import { useDispatch, useSelector } from "react-redux"
import { updateTasks } from "../store/userSlice"
import { editTask } from "../store/userSlice"


export const Task = ({task, hide}) => {
    const edit = useSelector(state => state.user.edit)
    const {id, title, body, expiry_date} = task
    const dispatch = useDispatch()
    
    
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

    
    const deleteTask = (id) => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:8000/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(token)}`
            }
        })
        .then(res => console.log("DELETE TASK RESPONSE: ", res))
        .then(() => dispatch(updateTasks({token})))
    }


    return (
        <div className={`task ${edit === id ? "hide" : ""} ${expiryDateStamp < nowDateStamp ? "outdated" : ""}`}>
            <div className="task-title">{title}</div>
            <div className="task-body">{body}</div>
            <div className="task-date">{D}.{M}.{Y} / {h}:{m}</div>
            <div className="task-buttons">
                <div className="task-edit" onClick={() => dispatch(editTask(id))}>EDIT</div>
                <div className="task-delete" onClick={() => deleteTask(id)}>DELETE</div>
            </div>
        </div>
    )
}