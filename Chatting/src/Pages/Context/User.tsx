

import { createContext } from "react";


 let user = ""


 export function getuser(user: any) {
    user = user
}

export const UserContext = createContext(user)

export const UserContextProvider = ({ children }: { children: any }) => {
    return <UserContext.Provider value={user} >{children}</UserContext.Provider>
} 