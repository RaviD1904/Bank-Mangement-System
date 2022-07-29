import { createContext,useEffect,useState } from "react";

export const AuthContext=createContext()

export const AuthContextProvider=({children})=>{
    const [isAuth, setIsAuth] = useState(false)
    const handleIsAuth=()=>{   
        setIsAuth(!isAuth)
    }   
    return <AuthContext.Provider value={{isAuth,handleIsAuth}}>{children}</AuthContext.Provider>
}





