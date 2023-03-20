import Register from "./Pages/Auth/Register"
import LoginPage from "./Pages/Auth/Login"
import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/Auth/Home"
import SediBar from "./Pages/components/SideBar"
import "./Pages/Scss/style.scss"
function App() {
  return (
    <div >
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App
