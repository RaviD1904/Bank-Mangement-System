import React,{useState} from 'react'
import { getData } from '../API/getData'
import {
    Button,
    Input} from "@chakra-ui/react";

    import {
        Table,
        Thead,
        Tbody,
        Tfoot,
        Tr,
        Th,
        Td,
        TableCaption,
        TableContainer,
      } from '@chakra-ui/react'
const Statement = () => {
    const  [account,setAccount] = useState()
    const [searchAcc,setSearchAcc]=useState([])
     
    const handleSearch =async() => {
        let data= await getData("http://localhost:3001/customer")
        console.log(data);
        let search = data.filter((el) => el.acc_no == account);
        console.log("found  account", search);
        search.length === 0
          ? alert("Account Not Found")
          : setSearchAcc({ ...search[0] });

        console.log("search_acc", searchAcc.transaction);
    }


   return (<div>
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
              <TableContainer>
  <Table variant='striped' colorScheme='red'>
    <TableCaption>This is Computer Generated Statement.</TableCaption>
    <Thead style={{
        backgroundColor:"aqua",
        color:"white"
    }}>
      <Tr>
        <Th>Date</Th>
        <Th>Particular</Th>
        <Th>Batch</Th>
        <Th>Type</Th>
        <Th>Amount</Th>
        <Th>Balance</Th>
      </Tr>
    </Thead>
    <Tbody>
        {searchAcc.transaction&&searchAcc.transaction.map((el)=>{return <Tr key={Date.now} >
        <Td>{el.date}</Td>
        <Td>{el.particular}</Td>
        <Td>{el.batch_no}</Td>
        <Td>{el.type}</Td>
        <Td>{el.amount}</Td>
        <Td>{el.balance}</Td>
      </Tr>})}
    </Tbody>
  </Table>
</TableContainer>
    </div>
  )
}

export default Statement