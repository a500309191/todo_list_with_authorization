import { useParams } from 'react-router-dom';
import { useEffect, useState  } from "react";

export const UserActivate = () => {

    const {uid, token} = useParams();
    console.log(uid, token)
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
        <div>{success ? "SUCCESS" : "NOT SUCCESS"}</div>
    )
}