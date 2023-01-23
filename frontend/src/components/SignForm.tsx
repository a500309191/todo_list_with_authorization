import { Routes, Route, Link, NavLink, useLocation, redirect } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks"
import { setEmail, setPassword } from "../store/userSlice"
import { setToken } from "../store/userSlice"
import { createAccount } from "../store/userSlice"


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
            <input defaultValue={email} className="sign-email" onChange={e => dispatch(setEmail(e.target.value))} />
            <input type="password" defaultValue={password} className="sign-password" onChange={e => dispatch(setPassword(e.target.value))} />
            <div className="sign-button" onClick={() => {
                location == "/registration"
                    ? dispatch(createAccount({email, password}))
                    : dispatch(setToken({email, password}))
            }}>
                {location == "/registration" ? "REGISTRATION" : "LOGIN"}
            </div>
            <Link to="/account" onClick={() => console.log("AS")}>TEST</Link>
        </div>
    )
}