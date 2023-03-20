export default function Input() {
    return (
        <div className="input">
            <input type="text" placeholder="Type something...." />
            <div className="send">
                <img src="" alt="" />
                <label htmlFor="file"> <i className=" bi bi-paperclip"></i> </label>
                <input style={{
                    display: 'none'
                }} id="file" type="file" />
                <label><i className="bi bi-card-image"></i></label>
                <button className="send">Send</button>
            </div>
        </div>
    )
}