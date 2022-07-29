import React from "react";
import {
  Button,
  Input} from "@chakra-ui/react";
  import "./dash.css";
  import { useState, useEffect } from "react";
  import axios from "axios";
import { getDateOfToday } from "./Dash";

const Withdrwal = () => {
    const [account, setAccount] = useState();
    const [search_acc, setSearch_acc] = useState({});
    const [accDetails, setAccDetails] = useState([]);
    const [amount, setAmount] = useState(0)
    const [particular,setParticular]=useState("")
   
    
    const handleSearch = () => {
        axios.get("http://localhost:3001/customer").then((res) => {
          setAccDetails(res.data);
        });
        console.log("reciveddata", accDetails);
        
        let search = accDetails.filter((el) => el.acc_no == account);
        console.log("found  account", search);
        search.length === 0
          ? alert("Account Not Found")
          : setSearch_acc({ ...search[0] });
        
        console.log("search_acc", search_acc);
    
        // {<DisplayInfo search_acc={search_acc}/>}
    };
    let batch=Math.floor(Math.random() * 1000)
    const saveTransaction=()=>{
        amount<=0?alert("Enter A Valid Amount"):axios.put(`http://localhost:3001/customer/${search_acc.id}`,{
          ...search_acc, balance:search_acc.balance>=Number(amount)?search_acc.balance-Number(amount):alert("Amount is Greater Than Balance"),transaction:[...search_acc.transaction,{
            "date": getDateOfToday(),
              "particular":particular,
              "batch_no": batch,
              "type": "Debit",
              "amount":+amount,
              "balance":search_acc.balance-Number(amount)
          }]
        }).then((res)=>{
          res.statusText=="OK"?alert(` TRANSACTION SUCCESS,,\nBATCH NO:-${batch}`):alert("Server Error")
        })
    }
  return (
    <div>
    <Input
                onChange={(e) => setAccount(e.target.value)}
                value={account}
                type="number"
                placeholder="Ac Number"
                width="300px"
                margin={2}
              />
              <Button onClick={handleSearch} margin={1.5}>
                Fetch
              </Button>
            <Button onClick={saveTransaction}>Save</Button> 
              <div className="main">
                <div className="left">
                  <h3>Name:{search_acc.cust_name}</h3>
                  <h3>Account:{search_acc.acc_no}</h3>
                  <h3 style={{ backgroundColor:"orange"}}>
                          Balance:{search_acc.balance}
                  </h3>
                  <Input type="number" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}/>
                </div>
                <div className="right">
                  <h3>Customer ID:{search_acc.id}</h3>
                  <h3>Adhar No:{search_acc.adhar_no}</h3>
                  <h3>Mobile NO:{search_acc.mobile_no}</h3>
                  <Input type="text" required placeholder="Particular/CHQ No" 
                  onChange={(e)=>setParticular(e.target.value)}/>
                </div>
              </div>

    </div>
  )
}

export default Withdrwal