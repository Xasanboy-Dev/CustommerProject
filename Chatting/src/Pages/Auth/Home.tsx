import Chat from "../components/Chat"
import SediBar from "../components/SideBar"
export default function HomePage() {
    return (
        <div className="home">
            <div className="container">
                <SediBar />
                <Chat />
            </div>
        </div>
    )
}