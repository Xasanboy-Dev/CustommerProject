import { useContext } from "react";
import { UserContext } from "../Context/User";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
export default function SediBar() {
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
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}