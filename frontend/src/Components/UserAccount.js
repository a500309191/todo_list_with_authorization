import { TaskList } from "./TaskList"
import { AddTask } from "./AddTask"

export const UserAccount = () => {
    
    return (
        <div className="user-account">
            <TaskList />
            <AddTask />
        </div>
    )
}