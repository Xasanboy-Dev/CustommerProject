import { useContext } from "react"
import { UserContext } from "../Context/User"

export default function Navbar() {
    let user: {
        id: number,
        name: string,
        lastname: string,
        phoneNumber: string,
        role: "admin" | "user",
        lastMessage: string,
        lastMessageID: number,
        messages: number[],
        connectedCourses: number[],
        connectedChats: number[]
    }
    user = useContext(UserContext)
    return (
        <div className="navbar">
            <span className="logo">Xasanboy Chat</span>
            <div className="user">
                <img src="https://picsum.photos/500/500" alt="" />
                <span>{user?.name}</span>
                <button><a href="/login">Loguot</a></button>
            </div>
        </div>
    )
}