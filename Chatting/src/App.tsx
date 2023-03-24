import Register from "./Pages/Auth/Register"
import { LoginPage } from "./Pages/Auth/Login"
import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/Auth/Home"
import "./Pages/Scss/style.scss"
import { createContext, useState } from "react"
export const UserContext = createContext<any>(null)
function App() {
  let [user, setUser] = useState("")
  return (
    <div >
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/" element={<HomePage />}>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
