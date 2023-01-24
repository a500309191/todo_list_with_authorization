import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { activateUser } from "../../store/userSlice"
import { ActivationSuccess } from "./ActivationSuccess";
import { ActivationFailed } from "./ActivationFailed";
import { Loading } from "../Loading";


export const UserActivate = () => {

    const {uid = "", token = ""} = useParams();
    const dispatch = useAppDispatch()
    const isActivated = useAppSelector(state => state.user.isActivated)
    const loading = useAppSelector(state => state.user.loading)

    useEffect(() => {
        if (!isActivated) dispatch(activateUser({uid, token}))
    }, [])
    
    console.log("isActivated: ", isActivated)

    return (
        <div className="activation-message">
            {loading
                ? <Loading />
                : isActivated ? <ActivationSuccess /> : <ActivationFailed />
            }
        </div>
    )
}