import { useDispatch, useSelector } from "react-redux"
import { updateTasks } from "../store/userSlice"
import { editTask } from "../store/userSlice"
import { useState } from "react"

export const TaskEdited = ({task}) => {
    const edit = useSelector(state => state.user.edit)
    const {user, id, title, body, expiry_date} = task
    const dispatch = useDispatch()

    const [updatedTitle, setTitle] = useState("")
    const [updatedBody, setBody] = useState("")
    const [updatedExpiryDate, setExpiryDate] = useState("")


    const updateTask = () => {
        if (updatedTitle || updatedBody || updatedExpiryDate) {
            const req_body = JSON.stringify({
                "title": updatedTitle ? updatedTitle : title,
                "body": updatedBody ? updatedBody : body,
                "expiry_date": updatedExpiryDate ? updatedExpiryDate : expiry_date,
                "user": user
            })
            const token = localStorage.getItem('token')
            fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${JSON.parse(token)}`
                },
                body: req_body
            })
            .then(res => console.log("UPDATE TASK RESPONSE: ", res))
            .then(() => dispatch(updateTasks({token})))
            .then(() => {
                setTitle("")
                setBody("")
                setExpiryDate("")
            })
        } else {
            console.log("data is not filled")
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
                className="task-accept"
                    onClick={() => {
                        updateTask()
                        dispatch(editTask(null))
                    }}
                >ACCEPT</div>
                <div
                    className="task-accept"
                    onClick={() => dispatch(editTask(null))}
                >CANCEL</div>
            </div>

        </div>
    )
}