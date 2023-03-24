import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../TypeScript/firebase";
export const AuthContext = createContext<any>(null);
export const AuthContextProvider: ({ children }: { children: any }) => any = ({
  children,
}: {
  children: any;
}) => {
  const [currentuser, setCurrentuser] = useState({});
  console.log(currentuser);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentuser(user!);
      console.log(user);
    });
  }, []);

  <AuthContext.Provider value={{ currentuser }}>
    {children}
  </AuthContext.Provider>;
};
