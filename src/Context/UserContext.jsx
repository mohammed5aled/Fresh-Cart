import { createContext, useState } from "react";

export let UserContext = createContext()


export default function UserContextProvider(pops) {
    const [userToken , setUserToken]  = useState(localStorage.getItem('userToken'))
  return (
    <>
      <UserContext.Provider value={{userToken , setUserToken}}>
      {pops.children}
      </UserContext.Provider>
    </>
  )
}
