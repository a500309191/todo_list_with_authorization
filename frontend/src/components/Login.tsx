import { useAppDispatch, useAppSelector } from '../hooks';
import { useState } from "react";
import { setToken } from "../store/taskSlice"
import { setEmail, setPassword } from "../store/userSlice"

export const Login = () => {
    const dispatch = useAppDispatch()
    const email = useAppSelector(state => state.user.email)
    const password = useAppSelector(state => state.user.password)
    
    return (
        <div className="sign-form">
            <input className="sign-email" onChange={e => dispatch(setEmail(e.target.value))} />
            <input className="sign-password" onChange={e => dispatch(setPassword(e.target.value))} />
            <div className="sign-button" onClick={() => {
                dispatch(setToken({email, password}))
            }}>LOGIN</div>
        </div>
    )
}