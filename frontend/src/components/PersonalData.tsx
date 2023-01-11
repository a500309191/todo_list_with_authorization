import { useEffect } from "react"



export const PersonalData = () => {

    const deleteToken = () => {
        localStorage.removeItem("token")
    }
    
    return (
        <div className="personal-data">
            <div>PERSONAL DATA</div>
            <div
                className="logout-button"
                onClick={() => deleteToken()}
            >LOGOUT</div>
        </div>
    )
}