import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
export default function SediBar() {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
}