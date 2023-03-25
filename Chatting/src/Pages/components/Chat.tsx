import { useContext } from "react"
import Input from "./Input"
import Messages from "./Messages"
export default function Chat() {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>Xasanboy</span>
                <div className="chatIcons">
                    <i className="bi bi-person-fill-add"></i>
                    <i className="bi bi-camera-video-fill"></i>
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}