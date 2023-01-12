import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks"
import { updateUserData } from "../store/userSlice"


export const AddTask = () => {

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [date, setDate] = useState("")
    const userId = useAppSelector(state => state.user.id)
    const dispatch = useAppDispatch()

    const addTask = () => {
        const req_body = JSON.stringify({
            "title": title,
            "body": body,
            "expiry_date": date,
            "user": userId
        })
        const token = localStorage.getItem('token')
        if (token) {
            fetch("http://localhost:8000/api/tasks/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${JSON.parse(token)}`
                },
                body: req_body
            })
            .then(res => console.log("ADD TASK RESPONSE: ", res))
            .then(() => dispatch(updateUserData(token)))
        } else {
            console.log("there is no token")
        }

    }


    return (
        <div className="add-task">
            <input
                className="add-task-title"
                onChange={e => setTitle(e.target.value)}
            />
            <textarea
                className="add-task-body"
                onChange={e => setBody(e.target.value)}
            ></textarea>
            <input
                className="add-task-date"
                type="datetime-local"
                onChange={e => setDate(e.target.value)}
            />
            <div
                className="add-task-button"
                onClick={() => addTask()}
            >ADD TASK</div>
        </div>
    )
}