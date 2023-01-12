import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from './hooks';
import { getUserData } from "./store/userSlice"
import { TaskList } from "./components/TaskList"
import { SignForm } from "./components/SignForm"
import { UserAccount } from "./components/UserAccount"
import './App.scss'


export const App = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])
  
  console.log("APP STARTED")
  console.log("isAuthenticated: ", isAuthenticated)

  return (
    <div className="app">
      {isAuthenticated ? <UserAccount /> : <SignForm />}
    </div>
  )
}

