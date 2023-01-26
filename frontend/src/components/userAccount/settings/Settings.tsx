import { useAppDispatch, useAppSelector } from "../../../hooks"
import { logOut } from "../../../store/userSlice"
import { settingsToggle, resetPasswordToggle, deleteUserToggle } from "../../../store/editSlice"
import { ResetPassword } from "./ResetPassword"
import { DeleteUser } from "./DeleteUser"


export const Settings = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.email)
    const password = useAppSelector(state => state.user.password)

    const editState = useAppSelector(state => state.edit)
    
    return (
        <div className="settings">
            <div className="settings-bar">
                <div className="settings-email">{email}</div>
                <div
                    className="settings-edit-button"
                    onClick={() => dispatch(settingsToggle())}
                >edit</div>
                <div
                    className="settings-logout-button"
                    onClick={() => dispatch(logOut())}
                >logout</div>
            </div>
            <div className={`${editState.settingsToggle ? "settings-edit wrapped" : "settings-edit"}`}>
                {editState.resetPasswordToggle
                    ? <ResetPassword />
                    : <div
                        onClick={() => dispatch(resetPasswordToggle())}
                        className="settings-edit-password-button"
                    >reset password</div>}
                {editState.deleteUserToggle
                    ? <DeleteUser />
                    : <div
                        onClick={() => dispatch(deleteUserToggle())}
                        className={`${editState.settingsToggle
                            ? "settings-edit-user-button wrapped"
                            : "settings-edit-user-button"}`}
                    >delete account</div>}
            </div>
        </div>
    )
}