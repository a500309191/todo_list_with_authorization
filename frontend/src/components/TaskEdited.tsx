import { useAppDispatch, useAppSelector } from "../hooks"
import { updateUserData } from "../store/userSlice"
import { editTask } from "../store/taskSlice"
import { useState } from "react"
import { Task as TaskType } from "../schemas/schemas"


export const TaskEdited: React.FC<TaskType> = ({id, title, body, expiry_date}) => {
    const edit = useAppSelector(state => state.task.editableTask)
    const user_id = useAppSelector(state => state.user.id)
    const dispatch = useAppDispatch()

    const [updatedTitle, setTitle] = useState("")
    const [updatedBody, setBody] = useState("")
    const [updatedExpiryDate, setExpiryDate] = useState("")


    const updateTask = () => {
        if (updatedTitle || updatedBody || updatedExpiryDate) {
            const req_body = JSON.stringify({
                "title": updatedTitle ? updatedTitle : title,
                "body": updatedBody ? updatedBody : body,
                "expiry_date": updatedExpiryDate ? updatedExpiryDate : expiry_date,
                "user": user_id
            })
            const token = localStorage.getItem('token')
            if (token) {
                fetch(`http://localhost:8000/api/tasks/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${JSON.parse(token)}`
                    },
                    body: req_body
                })
                .then(res => console.log("UPDATE TASK RESPONSE: ", res))
                .then(() => dispatch(updateUserData(token)))
                .then(() => {
                    setTitle("")
                    setBody("")
                    setExpiryDate("")
                })
            } else {
                console.log("there is no token")
            }

        } else {
            console.log("data is not changed")
        }
    }


    return (
        <div className={`task-edit ${edit === id ? "" : "hide"}`}>
            <input
                className="task-title-edit"
                defaultValue={title}
                maxLength={25}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                className="task-body-edit"
                defaultValue={body}
                maxLength={250}
                onChange={e => setBody(e.target.value)}
            ></textarea>
            <input
                className="task-date-edit"
                type="datetime-local"
                defaultValue={expiry_date}
                onChange={e => setExpiryDate(e.target.value)}
            />
            <div className="task-buttons">
                <div
                className="task-button-accept"
                    onClick={() => {
                        updateTask()
                        dispatch(editTask(null))
                    }}
                >ACCEPT</div>
                <div
                    className="task-button-cancel"
                    onClick={() => dispatch(editTask(null))}
                >CANCEL</div>
            </div>

        </div>
    )
}