import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "./store/userSlice"
import { TaskList } from "./Components/TaskList"
import { SignForm } from "./Components/SignForm"
import { UserAccount } from "./Components/UserAccount"
import { Routes, Route } from "react-router-dom";
import './App.scss'


export const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)

  useEffect(() => {
    dispatch(login())
  }, [dispatch])
  
  console.log("APP STARTED")
  console.log("isAuthenticated: ", isAuthenticated)

  return (
    <div className="app">
      {isAuthenticated ? <UserAccount /> : <SignForm />}
    </div>
  )
}

