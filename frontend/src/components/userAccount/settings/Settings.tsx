import { useAppDispatch, useAppSelector } from "../../../hooks"
import { logOut } from "../../../store/userSlice"
import { settingsOpen } from "../../../store/editSlice"
import { ResetPassword } from "./ResetPassword"


export const Settings = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.email)
    const password = useAppSelector(state => state.user.password)

    const settings = useAppSelector(state => state.edit.settings)
    console.log("SETTINGS: ", settings)
    
    return (
        <>
        <div className="settings">
            <div className="settings-email">{email}</div>
            <div
                className="settings-edit-button"
                onClick={() => dispatch(settingsOpen())}
            >edit</div>
            <div
                className="settings-logout-button"
                onClick={() => dispatch(logOut())}
            >logout</div>
        </div>
        <div className="settings-edit-form">
            {settings && 
                <>
                    <ResetPassword />
                    <div className="settings-delete-account">DELETE ACCOUNT</div>
                </>
            }
        </div>
        </>
    )
}