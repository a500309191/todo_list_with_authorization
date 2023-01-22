import { useAppDispatch, useAppSelector } from "../../hooks"
import { logOut } from "../../store/userSlice"
import { settingsOpen } from "../../store/editSlice"
import { Settings } from "./Settings"
 

export const Header = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.email)
    const password = useAppSelector(state => state.user.password)

    
    return (
        <div className="settings">
            <div className="header">
                <div className="header-email">{email}</div>
                <div
                    className="header-settings"
                    onClick={() => dispatch(settingsOpen())}
                >edit</div>
                <div
                    className="header-logout"
                    onClick={() => dispatch(logOut())}
                >logout</div>
            </div>
            <Settings />
        </div>
    )
}