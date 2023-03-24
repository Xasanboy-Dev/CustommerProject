import { useContext } from "react";
import { UserContext } from "../Context/User";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
export default function SediBar() {
    const user = useContext(UserContext)
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}