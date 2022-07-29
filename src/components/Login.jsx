import React from 'react'
import axios from "axios"
import { Button, Input } from '@chakra-ui/react'
import "./login.css"
import { useState } from 'react'
import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {useNavigate}from "react-router-dom"









/* eslint-disable no-unused-expressions */
const Login = () => {
    const navigate=useNavigate()
    const {isAuth,handleIsAuth}=useContext(AuthContext)
    const toast = useToast()    
    const [login,setLogin]=useState()
    const [enterData,setEnterData]=useState({
        "username":"",
        "password":""
    })
    


useEffect(()=>{
    axios.get("http://localhost:3001/staff")
    .then((res)=>{
        //console.log("Response",res.data)
        setLogin(res.data)
    })
    //console.log("fetched data",login)
},[])


const handleChange=(e)=>{
    let {value,name}=e.target
    //console.log(`name:${name}&value:${value} `)
    setEnterData({
        ...enterData,
        [name]:value
    })
    // data.name===value?"Login":"Login Failed"
}
const handleLogin=()=>{
    login.map((el)=>el.password===enterData.password && el.username===enterData.username? [toast({
        title: 'LOGIN SUCCESS.',
        description: `Login Sucess Mr.${el.staff_name} and Branch:${el.branch_name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      }),handleIsAuth(),navigate('/dash',{state
    :{el}})] : toast({
        title: 'LOGIN FAILED.',
        description: "You Enter Invalid Username/Password.",    
        status: 'error',
        duration: 3000,
        isClosable: true,
      }))
    
      console.log(isAuth)
// console.log("enter data",token)
// localStorage.setItem("token",token)
}
  return (
    <div className='login'>
        <Input onChange={handleChange} placeholder='Username' name='username' width={"200px"} margin={2}/>
        <Input onChange={handleChange} type="password" placeholder='Password' name='password' width={"200px"} margin={2}/>
        <Button onClick={handleLogin}>LOGIN</Button>
    </div>
  )
}
export default Login;

