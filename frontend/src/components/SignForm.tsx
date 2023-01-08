import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Registration } from "./Registration";
import { Login } from "./Login";


export const SignForm = () => {

    const location = useLocation().pathname

    return (
        <div className="sign-form">
            <div
                className="sign-tumbler"
                style={{ backgroundPosition: `${location == "/registration" ? "left" : "right"}` }}
            >
                <Link to="/" className="log-button">LOGIN</Link>
                <Link to="/registration" className="reg-button">REGISTRATION</Link>
            </div>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/registration" element={<Registration />}/>
            </Routes>
        </div>
    )
}