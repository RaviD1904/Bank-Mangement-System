import axios from "axios"

export const getData = (url) =>{

    let data=axios.get(url).then((response) =>response.data)
    return data
}


export const putData = (url, data) =>{
    let result=axios.put(url, data).then((response) => response.statusText)
    return result
}

export const postData =(url, data) =>{
    let result=axios.post(url, data).then((response) => response.statusText)
    return result
}