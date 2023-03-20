import "./../Scss/style.scss"
export default function LoginPage() {
    return (
        <div className="formCoantiner">
            <div className="formWrapper">
                <span className="logo">Xasanboy Chat</span>
                <span className="title">Login</span>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <button type="submit">Sign in</button>
                </form>
                <p>You don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    )
}