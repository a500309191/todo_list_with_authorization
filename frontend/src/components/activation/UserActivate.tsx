import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ActivationSuccess } from "./ActivationSuccess";
import { ActivationFailed } from "./ActivationFailed";


export const UserActivate = () => {

    const {uid, token} = useParams();
    const [success, setSuccess] = useState(true)

	async function userActivate() {
        const response = await fetch("http://localhost:8000/api/auth/users/activation/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"uid": uid, "token": token })
        })
        console.log(response)
        if (response) setSuccess(false)
    }

    useEffect(() => {userActivate()})


    return (
        <div className="activation-message">
            {success
                ? <ActivationSuccess />
                : <ActivationFailed />
            }
        </div>
    )
}