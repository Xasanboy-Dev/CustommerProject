import { useState } from "react"
import { LoginAuth } from "../TypeScript/auth"
import "./../Scss/style.scss"
export default function LoginPage() {
    let [number, setNumber] = useState("")
    let [password, setPassword] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (number && password) {
                const result = await LoginAuth(number, password)
                if (result !== "Please fill all the gaps!") {
                    alert(result.data.message)
                    let token = result.data.user
                    localStorage.setItem("hello", token)
                    return window.location.href = '/'
                } else {
                    alert(result)
                }
            } else {
                alert("Please fill all the gaps!")
            }
        } catch (error: any) {
            alert(error.response.data.message)
        }
    }

    return (
        <div className="formCoantiner">
            <div className="formWrapper">
                <span className="logo">Xasanboy Chat</span>
                <span className="title">Login</span>
                <form action="" onSubmit={handleSubmit}>
                    <input type="number"
                        onChange={e => setNumber(e.target.value)}
                        placeholder="Number" />
                    <input type="password"
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password" />
                    <button type="submit">Sign in</button>
                </form>
                <p>You don't have an account? <a href="/register">Register</a></p>
            </div>
        </div>
    )
}