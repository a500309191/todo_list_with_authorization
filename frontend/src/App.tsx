import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from './hooks';
import { getTasks } from "./store/taskSlice"
import { TaskList } from "./components/TaskList"
import { SignForm } from "./components/SignForm"
import { UserAccount } from "./components/UserAccount"
import './App.scss'


export const App = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)

  useEffect(() => {
    dispatch(getTasks())
  }, [dispatch])
  
  console.log("APP STARTED")
  console.log("isAuthenticated: ", isAuthenticated)

  return (
    <div className="app">
      {isAuthenticated ? <UserAccount /> : <SignForm />}
    </div>
  )
}

