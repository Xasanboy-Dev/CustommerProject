import { useState } from "react";
import React from "react";

export default function Register() {
    let [name, setName] = useState("")
    let [lastname, setLastname] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [file, setFile] = useState<any>()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name && lastname && email && password) {
            const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (name.length < 3 || lastname.length < 3 || expression.test(email) && password.length < 4){
                return alert("")
            }
                let newFile = new FormData()
            const data = newFile.append("avatar", file)
            console.log([data, file])

        } else {
            alert("Please fill all the gaps!")
            return null
        }
    }

    return (
        <div className="formCoantiner">
            <div className="formWrapper">
                <span className="logo">Xasanboy Chat</span>
                <span className="title">Register</span>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text"
                        value={name} onChange={(e) => setName(e.target.value)}
                        placeholder=" Name" />
                    <input type="text"
                        value={lastname} onChange={(e) => setLastname(e.target.value)}
                        placeholder=" Lstname " />
                    <input type="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder=" Email" />
                    <input type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder=" Password" />
                    <label htmlFor="file" className="file">
                        <i className="bi bi-file-earmark-arrow-up"></i>
                        Add an avatar
                    </label>
                    <input type="file" onChange={(e) => setFile(e.target.files![0])} id="file" accept="image/*" />
                    <button type="submit">Sign Up</button>
                </form>
                <p>Do you have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    )
}