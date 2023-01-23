import { Link } from "react-router-dom";


export const ActivationSuccess = () => {
    return (
        <>
            <div>Your account has been successfully activated</div>
            <Link to="/">LOGIN INTO ACCOUNT</Link>
        </>
    )
}