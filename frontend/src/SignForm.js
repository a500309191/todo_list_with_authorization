import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setToken, login } from "./store/userSlice"

export const SignForm = ({ onChange }) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const dispatch = useDispatch()

    return (
        <div className="sign-form">
            <input className="sign-email" onChange={e => setEmail(e.target.value)} />
            <input className="sign-password" onChange={e => setPassword(e.target.value)} />
            <div className="sign-button" onClick={() => {
                dispatch(setToken({email, password}))
            }}></div>
        </div>
    )
}