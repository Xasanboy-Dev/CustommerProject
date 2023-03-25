import { useState } from "react"

export default function Search() {
    let [input, setInput] = useState("")

    if (input) {
          
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Find a user" />
            </div>
            <div className="userChat">
                <img src="https://picsum.photos/500/500" alt="" />
                <div className="userChatInfo">
                    <span>Xasanboy</span>
                </div>
            </div>
        </div>
    )
}