import { useAppDispatch } from '../hooks';
import { useState, useEffect } from "react";
import { setToken, login } from "../store/userSlice"

export const SignForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useAppDispatch()

    return (
        <div className="sign-form">
            <input className="sign-email" onChange={e => setEmail(e.target.value)} />
            <input className="sign-password" onChange={e => setPassword(e.target.value)} />
            <div className="sign-button" onClick={() => {
                dispatch(setToken({email, password}))
            }}>SIGN</div>
        </div>
    )
}