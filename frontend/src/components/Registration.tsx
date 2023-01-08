import { useAppDispatch } from '../hooks';
import { useState } from "react";
import { setToken } from "../store/taskSlice"

export const Registration = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useAppDispatch()

    return (
        <div className="sign-form">
            <input className="sign-email" onChange={e => setEmail(e.target.value)} />
            <input className="sign-password" onChange={e => setPassword(e.target.value)} />
            <div className="sign-button" onClick={() => {
                dispatch(setToken({email, password}))
            }}>REGISTRATION</div>
        </div>
    )
}