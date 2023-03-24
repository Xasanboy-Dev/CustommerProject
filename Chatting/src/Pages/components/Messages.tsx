import { useContext } from "react"
import { UserContext } from "../Context/User"
import Message from "./Message"
export default function Messages() {
    const user = useContext(UserContext)
    return (
        <div className="messages">
            <Message  />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    )
}