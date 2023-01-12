import { useAppDispatch, useAppSelector } from "../hooks"
import { logOut } from "../store/userSlice"


export const PersonalData = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.email)
    const password = useAppSelector(state => state.user.password)

    
    return (
        <div className="personal-data">
            <div>PERSONAL DATA</div>
            <div>{email}</div>
            <div>{password}</div>
            <div
                className="logout-button"
                onClick={() => dispatch(logOut())}
            >LOGOUT</div>
        </div>
    )
}