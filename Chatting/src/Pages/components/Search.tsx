export default function Search() {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Find a user" />
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