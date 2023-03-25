import Register from "./Pages/Auth/Register"
import { LoginPage } from "./Pages/Auth/Login"
import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/Auth/Home"
import { UserContext } from "./Pages/Context/User"
import "./Pages/Scss/style.scss"
import { useEffect, useState } from "react"
import { getTokenValid } from "./Pages/TypeScript/auth"
import { useNavigate } from "react-router-dom"
function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem("hello")
  const [user, setUser] = useState<any>()
  if (token) {
    const result = getTokenValid(token)
    useEffect(() => {
      result.then(res => {
        setUser(res.data.user)
      })
    }, [token])
  } else {
    navigate("/login")
  }
  return (
    <div >
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />}>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  )
}

export default App
