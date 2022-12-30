import { useDispatch, useSelector } from "react-redux"
import { updateTasks } from "../store/userSlice"
import { editTask } from "../store/userSlice"


export const TaskEdited = ({task}) => {

    const {id, title, body, expiry_date} = task
    const dispatch = useDispatch()
    

    return (
        <div className="task">
            <div className="task-title">{title}</div>
            <div className="task-body">{body}</div>
            <div className="task-date">{expiry_date}</div>
            <div className="task-buttons">
                <div className="task-accept" onClick={() => dispatch(editTask(null))}>ACCEPT</div>
                <div className="task-accept" onClick={() => dispatch(editTask(null))}>CANCEL</div>
            </div>

        </div>
    )
}