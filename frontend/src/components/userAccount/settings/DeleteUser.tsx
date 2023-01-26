import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../hooks"
import { deleteUser } from "../../../store/userSlice"
import { deleteUserToggle } from "../../../store/editSlice"


export const DeleteUser = () => {
    const [password, setPassword] = useState("")
    const dispatch = useAppDispatch()
    const editState = useAppSelector(state => state.edit)


    return (
        <div className="settings-edit-user">
            <div className="settings-edit-password-input">
                <input
                    placeholder="password" 
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="settings-edit-user-buttons">
                <div
                    className="settings-edit-user-buttons-submit"
                    onClick={() => dispatch(deleteUser({password}))}
                >submit</div>
                <div
                    className="settings-edit-user-buttons-cancel"
                    onClick={() => dispatch(deleteUserToggle())}
                >cancel</div>
            </div>
        </div>
    )
}