import React, { useState, useEffect, useRef } from 'react';
import internal from 'stream';
import './App.scss';


interface IAccount {
  id: number
  email: string
}

interface Task {
  id: number
  title: string
  body: string
  expiry_date: string
  is_done: boolean
  time_create: string
  time_update: string
  user: number
}

interface TaskList {
  data: Task[]
}

export const App = () => {

  const [data, setData] = useState()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [token, setToken] = useState<string>()
  const [account, setAccount] = useState<IAccount>()
  const [tasks, setTasks] = useState<TaskList>()

  const sign = () => {
    const body = JSON.stringify({
      "email": email,
      "password": password
    })

    fetch("http://localhost:8000/auth/token/login/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body
    })
    .then(response => response.json())
    .then(data => {
        if (data.auth_token) {
            const token = data.auth_token
            setToken(token)

            return fetch("http://localhost:8000/api/auth/users/me/", {
                method: "GET",
                headers: {"Authorization": `Token ${token}`}
            })
            .then(response => response.json())
            .then(data => setAccount(data))
            .then(() => {
              fetch("http://localhost:8000/api/tasks/", {
                method: "GET",
                headers: {"Authorization": `Token ${token}`}
              })
              .then(response => response.json())
              .then(data => setTasks(data))
            })
        }
    })
  }

  
  console.log(account)
  console.log(tasks)

  return (
    <div className="app">
      <div className="window">
        <div className="sign-form">
          <input className="sign-email" onChange={e => setEmail(e.target.value)} />
          <input className="sign-password" onChange={e => setPassword(e.target.value)} />
          <div className="sign-button" onClick={() => sign()}></div>
        </div>
      </div>
    </div>
  )
}

