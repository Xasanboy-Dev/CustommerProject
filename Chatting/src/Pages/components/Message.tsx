import { useContext } from "react"
import { UserContext } from "../Context/User"

export default function Message() {
    const user = useContext(UserContext)
    return (
        <div className="message owner">
            <div className="messageInfo">
                <span className="name">{user.name}</span>
                <img src="https://picsum.photos/500/500" />
                <span>Just now</span>
            </div>
            <div className="messageContent">
                <p>Hello</p>
                {/* <img src="https://picsum.photos/500/500" /> */}
                {/* <video src="" /> */}
            </div>
        </div>

    )
}