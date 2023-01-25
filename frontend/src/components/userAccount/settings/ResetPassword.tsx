import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { resetPassword } from "../../../store/userSlice"


export const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const dispatch = useAppDispatch()

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
            <div
                className="settings-edit-password-reset"
                onClick={() => dispatch(resetPassword({newPassword, reNewPassword, currentPassword}))}
            >SUBMIT</div>
        </div>
    )
}