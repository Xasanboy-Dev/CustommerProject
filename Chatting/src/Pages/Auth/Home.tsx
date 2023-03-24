import { useContext } from "react"
import Chat from "../components/Chat"
import SediBar from "../components/SideBar"
import { UserContext } from "./../../App"
export default function HomePage() {
    const user = useContext(UserContext)
    return (
        <div className="home">
            <div className="container">
                <SediBar />
                <Chat />
            </div>
        </div>
    )
}