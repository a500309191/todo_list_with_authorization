import { useAppDispatch, useAppSelector } from "../../hooks"
import { logOut } from "../../store/userSlice"
import { settingsOpen } from "../../store/editSlice"
 

export const Settings = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.email)
    const password = useAppSelector(state => state.user.password)

    
    return (
        <div className="settings">
            <div className="settings-email">{email}</div>
            <div
                className="settings-edit"
                onClick={() => dispatch(settingsOpen())}
            >edit</div>
            <div
                className="settings-logout"
                onClick={() => dispatch(logOut())}
            >logout</div>
        </div>
    )
}