import { createContext, useContext, useEffect, useState } from "react"
import Chat from "../components/Chat"
import SediBar from "../components/SideBar"
import { UserContext } from "../Context/User"
export default function HomePage() {
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
        <div className="home">
            <div className="container">
                <SediBar />
                <Chat />
            </div>
        </div>
    )
}