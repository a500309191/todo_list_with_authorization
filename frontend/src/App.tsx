import React, { useState, useEffect, useRef } from 'react';
import './App.css';


export const App = () => {

  const [data, setData] = useState()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [token, setToken] = useState<string>()

  const sign = () => {
    console.log("sign")
    const body = JSON.stringify({ "email": email, "password": password})
    fetch("http://localhost:8000/auth/token/login/", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: body
    }).
    then(res => res.json()).
    then(data => console.log(data))
  }

  return (
    <div className="app">
      <div className="sign-form">
        <input className="sign-email" onChange={e => setEmail(e.target.value)} />
        <input className="sign-password" onChange={e => setPassword(e.target.value)} />
        <div className="sign-button" onClick={() => sign()}></div>
      </div>
    </div>
  )
}

