import { useState, useEffect } from "react"
import { Routes, Route, redirect, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './hooks';
import { getUserData } from "./store/userSlice"
import { SignForm } from "./components/SignForm"
import { UserAccount } from "./components/userAccount/UserAccount"
import { PageNotFound } from "./components/PageNotFound"
import { UserActivate } from "./components/activation/UserActivate";
import './App.scss'


export const App = () => {
  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.user)

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])


  const navigate = useNavigate()
  useEffect(() => {
    if (userState.isAuthenticated) {
      return navigate('/account')
    }
  }, [userState.isAuthenticated])


  console.log("isAuthenticated: ", userState.isAuthenticated)

  return (
    <div className="app">
      {/* {isAuthenticated ? <UserAccount /> : <SignForm />} */}
      <Routes>
        <Route path='/activate/:uid/:token' element={<UserActivate />}/>
        <Route path='/' element={<SignForm/>}/>
        <Route path='/registration' element={<SignForm/>}/>
        <Route path='/account' element={<UserAccount/>}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

