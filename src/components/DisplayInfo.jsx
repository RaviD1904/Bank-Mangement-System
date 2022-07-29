import { Input,Button } from '@chakra-ui/react'
import React,{useState} from 'react'
import "./displayinfo.css"

const DisplayInfo = ({search_acc}) => {
    const [amount, setAmount] = useState(0)
        console.log("search_acc",search_acc)
  return (
    <div> 
        <div>
            <Button>Save</Button>
        </div>
        <div>
            <h3>Customer ID:{search_acc[0].id}</h3>
            <h3>Customer Name:{search_acc[0].cust_name}</h3>
            <h3>Account No:{search_acc[0].acc_no}</h3>
            <h3>Adhar No:{search_acc[0].adhar_no}</h3>
            <h3>Mobile NO:{search_acc[0].mobile_no}</h3>
            <h3 style={{backgroundColor:"#03e3fc"}}>Balance:{search_acc[0].balance}</h3>
            <div>Amount:{amount}</div>
            <Input type="number" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}/>
        </div>  
    </div>
  )
}
export default DisplayInfo
