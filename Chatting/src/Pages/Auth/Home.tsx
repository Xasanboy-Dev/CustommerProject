import { useEffect, useState } from "react"
import Chat from "../components/Chat"
import SediBar from "../components/SideBar"
import { getTokenValid } from "../TypeScript/auth"
export default function HomePage() {
    let token = localStorage.getItem("hello")
    let [user, setUser] = useState<any>()
    useEffect(() => {
        try {
            if (token) {
                const result = getTokenValid(token)
                result.then(res => {
                    setUser(res.data.user)
                }).catch(err => {
                    alert(err.response.data.message)
                    window.location.href = '/login'
                    return <div></div>
                })
            } else {
                window.location.href = '/login'
                return <div></div>
            }
        } catch (error: any) {
            alert(error.response.data.message)
            console.log("login")
            window.location.href = '/login'
            return <div></div>
        }
    }, [token])
    return (
        <div className="home">
            <div className="container">
                <SediBar />
                <Chat />
            </div>
        </div>
    )
}