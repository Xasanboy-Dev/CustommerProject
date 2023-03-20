export default function Navbar() {
    return (
        <div className="navbar">
            <span className="logo">Xasanboy Chat</span>
            <div className="user">
                <img src="https://picsum.photos/500/500" alt="" />
                <span>Xasanboy</span>
                <button><a href="/login">Loguot</a></button>
            </div>
        </div>
    )
}