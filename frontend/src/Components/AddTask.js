import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { updateTasks } from "../store/userSlice"


export const AddTask = () => {

    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [date, setDate] = useState()

    const tasks = useSelector(state => state.user.tasks)
    const dispatch = useDispatch()

    const addTask = () => {
        const req_body = JSON.stringify({
            "title": title,
            "body": body,
            "expiry_date": date,
            "user": 2
        })
        const token = localStorage.getItem('token')
        fetch("http://localhost:8000/api/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(token)}`
            },
            body: req_body
        })
        .then(res => console.log("ADD TASK RESPONSE: ", res))
        .then(() => dispatch(updateTasks({token})))
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