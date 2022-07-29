import React, { useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import { postData } from '../API/getData'
const CreateAccount = () => {

const [enterData,setEnterData] =useState({})

const handleOnChange = (e) => {
    const {value,name}=e.target
    setEnterData({...enterData,
        [name]:value,
        id:Date.now(),
        acc_no:Math.floor(Math.random() * (85110029999 - 85110020001)) + 85110020001,
        balance:0,
        transaction:[]
    })
}
const handleOnClick=async() => {
    console.log(enterData)
    let result=await postData("http://localhost:3001/customer",enterData)
    alert(`Account create sucessfully completed,\n Account Number: ${enterData.acc_no}`)

}
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    }}>
        {/* <Text mb='8px'>Customer Number</Text> */}
        <Input name="cust_name" onChange={handleOnChange} placeholder='Enter Account Name' size='md' width={"200px"} margin={2}/>
        <Input type="number" maxLength="12" name="adhar_no" onChange={handleOnChange} placeholder='Enter Adhar Number' size='md' width={"200px"} margin={2}/>
        <Input type="number" maxLength="10" name="mobile_no" onChange={handleOnChange} placeholder='Enter Mobile Number' size='md' width={"200px"} margin={2}/>
        <Button onClick={handleOnClick} width={"200px"} margin={2}>Create Account</Button>
    </div>
  )
}
export default CreateAccount;