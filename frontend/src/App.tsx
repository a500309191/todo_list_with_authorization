import { useState, useEffect } from "react"
import { Routes, Route, redirect, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from './hooks';
import { getUserData } from "./store/userSlice"
import { SignForm } from "./components/SignForm"
import { UserAccount } from "./components/userAccount/UserAccount"
import { PageNotFound } from "./components/PageNotFound"
import { UserActivate } from "./components/activation/UserActivate";
import './App.scss'
import { Layout } from "./components/Layout";


export const App = () => {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])



  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/account')
    }
  }, [isAuthenticated])


  console.log("isAuthenticated: ", isAuthenticated)

  return (
    <div className="app">
      {/* {isAuthenticated ? <UserAccount /> : <SignForm />} */}
      <Routes>
          <Route path='/' element={<SignForm/>}/>
          <Route path='/registration' element={<SignForm/>}/>
          <Route path='/account' element={<UserAccount/>}/>
          <Route path='/activate/:uid/:token' element={<UserActivate />}/>
          <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  )
}

