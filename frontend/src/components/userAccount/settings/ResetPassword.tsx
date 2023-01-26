import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { resetPassword } from "../../../store/userSlice"
import { resetPasswordToggle } from "../../../store/editSlice"


export const ResetPassword = () => {
    const dispatch = useAppDispatch()
    const editState = useAppSelector(state => state.edit)

    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")

    return (
        <div className="settings-edit-password">
            <div className="settings-edit-password-input">
                <input
                    placeholder="new password" 
                    type="password"
                    onChange={e => setNewPassword(e.target.value)}
                />
                <input
                    placeholder="new password" 
                    type="password"
                    onChange={e => setReNewPassword(e.target.value)}
                />
                <input
                    placeholder="current password" 
                    type="password"
                    onChange={e => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="settings-edit-password-buttons">
                <div
                    className="settings-edit-password-buttons-submit"
                    onClick={() => dispatch(resetPassword({newPassword, reNewPassword, currentPassword}))}
                >submit</div>
                <div
                    className="settings-edit-password-buttons-cancel"
                    onClick={() => dispatch(resetPasswordToggle())}
                >cancel</div>
            </div>
        </div>
    )
}