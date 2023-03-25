import { useContext } from "react"

export default function Message() {
    return (
        <div className="">
            <div className="message owner">
                <div className="messageInfo">
                    <span className="name">Xasanboy</span>
                    <img src="https://picsum.photos/500/500" />
                    <span>Just now</span>
                </div>
                <div className="messageContent">
                    <p>Hello</p>
                    <img src="https://picsum.photos/500/500" />
                    {/* <video src="" /> */}
                </div>
            </div>
            <div className="message ">
                <div className="messageInfo">
                    <span className="name">Xasanboy</span>
                    <img src="https://picsum.photos/500/500" />
                    <span>Just now</span>
                </div>
                <div className="messageContent">
                    <p>Hello</p>
                    <img src="https://picsum.photos/500/500" />
                    {/* <video src="" /> */}
                </div>
            </div>
        </div>

    )
}