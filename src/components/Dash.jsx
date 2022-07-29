import React, { useContext } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Input} from "@chakra-ui/react";
  import "./dash.css";
  import { useState, useEffect } from "react";
  import axios from "axios";
  import { AuthContext } from "../context/AuthContext";
  import { useLocation, useNavigate } from "react-router-dom";
import Statement from "./Statement";
import Withdrwal from "./Withdrwal";
import CreateAccount from "./CreateAccount";
export const getDateOfToday =()=>{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;
  return today
}
const Dash = () => {
  const [token, setToken] = useState(null);
  const [particular,setParticular]=useState("")
  const local = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0)
  const { isAuth, handleIsAuth } = useContext(AuthContext);
  const [flag,setFlag] = useState(false);
  const [account, setAccount] = useState();
  const [search_acc, setSearch_acc] = useState({});
  const [accDetails, setAccDetails] = useState([]);
 



  const handleLogout = () => {
    console.log("handleLogin");
    handleIsAuth();
    navigate("/");
  };

  const handleSearch = () => {
    axios.get("http://localhost:3001/customer").then((res) => {
      setAccDetails(res.data)})
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
      ...search_acc, balance:+amount+search_acc.balance,transaction:[...search_acc.transaction,{
        "date": getDateOfToday(),
          "particular":particular,
          "batch_no": batch,
          "type": "Credit",
          "amount":+amount,
          "balance":+amount+search_acc.balance
      }]
    }).then((res)=>{
      res.statusText=="OK"?alert(` TRANSACTION SUCCESS,,\nBATCH NO:-${batch}`):alert("Server Error")
  
    })
} 
  return (
    <div>
      <div className="navbar">
        <h1>ID:{local.state.el.username.toUpperCase()}</h1>
        <h1>{local.state.el.designation.toUpperCase()}</h1>
        <h1>{local.state.el.branch_name.toUpperCase()}</h1>
        <h1>{local.state.el.staff_name.toUpperCase()}</h1>
        <h1>{new Date(Date.now()).toString()}</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="menu-tabs">
        <Tabs>
          <TabList>
            <Tab className="tab">Dashboard</Tab>
            <Tab className="tab">Statement</Tab>
            <Tab className="tab">Cash Deposit</Tab>
            <Tab className="tab">Cash Withdrawal</Tab>
            <Tab className="tab">Create SB Account</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>Dashboard</p>
            </TabPanel>
            <TabPanel>
              <Statement/>
            </TabPanel>
            <TabPanel>
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
                  <h3 style={{ backgroundColor: "#03e3fc" }}>
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
            </TabPanel>
            <TabPanel>
              <Withdrwal/>
            </TabPanel>
            <TabPanel>
              <CreateAccount/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};
export default Dash;

