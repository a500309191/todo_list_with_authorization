import { useDispatch, useSelector } from "react-redux"
import { updateTasks } from "../store/userSlice"
import { editTask } from "../store/userSlice"

export const TaskEdited = ({task}) => {
    const edit = useSelector(state => state.user.edit)
    const {id, title, body, expiry_date} = task
    const dispatch = useDispatch()
    

    return (
        <div className={`task-edit ${edit === id ? "" : "hide"}`}>
            <input className="task-title-edit" defaultValue={title}/>
            <textarea className="task-body-edit" defaultValue={body}></textarea>
            <input className="task-date-edit" type="datetime-local" defaultValue={expiry_date}/>
            <div className="task-buttons">
                <div className="task-accept" onClick={() => dispatch(editTask(null))}>ACCEPT</div>
                <div className="task-accept" onClick={() => dispatch(editTask(null))}>CANCEL</div>
            </div>

        </div>
    )
}