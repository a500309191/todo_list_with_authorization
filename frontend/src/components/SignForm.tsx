import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { setEmail, setPassword } from "../store/userSlice"
import { Registration } from "./Registration";
import { Login } from "./Login";
import { setToken } from "../store/taskSlice"


export const SignForm = () => {

    const location = useLocation().pathname
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.email)
    const password = useAppSelector(state => state.user.password)

    return (
        <div className="sign-form">
            <div
                className="sign-tumbler"
                style={{ backgroundPosition: `${location == "/registration" ? "left" : "right"}` }}
            >
                <Link to="/" className="log-button">LOGIN</Link>
                <Link to="/registration" className="reg-button">REGISTRATION</Link>
            </div>
            <input className="sign-email" onChange={e => dispatch(setEmail(e.target.value))} />
            <input className="sign-password" onChange={e => dispatch(setPassword(e.target.value))} />
            <div className="sign-button" onClick={() => {
                location == "/registration"
                    ? console.log("REGISTRATION")
                    : dispatch(setToken({email, password}))
            }}>
                {location == "/registration" ? "REGISTRATION" : "LOGIN"}
            </div>
        </div>
    )
}