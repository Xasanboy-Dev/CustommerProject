import { useEffect, useState } from "react";
import React from "react";
import { auth } from "../TypeScript/firebase";
import { GoogleAuthProvider, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import {} from "firebase/auth"
export default function Register() {
    let [name, setName] = useState("")
    let [lastname, setLastname] = useState("")
    let [PhoneNumber, setPhoneNumber] = useState("")
    let [password, setPassword] = useState("")
    let [photoUrl, setPhotoUrl] = useState("")
    let [file, setFile] = useState<any>()
    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(res => {
                let displayname = res.user.displayName!.split(" ")
                setName(displayname[0])
                setLastname(displayname[1])
                setPassword(res.user.uid)
                setPhotoUrl(res.user.photoURL!)
            })
    }
    useEffect(() => {
        if (file) {
            const blob = new Blob([file])
            const url = URL.createObjectURL(blob)
            console.log(url)
            setPhotoUrl(url)
            console.log(url)
        }
    }, [file])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signInWithPhoneNumber(auth, PhoneNumber, )
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        if (name && lastname && PhoneNumber && password) {
            if (name.length < 3 || lastname.length < 3 || PhoneNumber.length < 12 && password.length < 4) {
                return alert("Your data must n't shorter than 3")
            } else {

            }
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
                    <input type="number"
                        value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder=" Phone number" />
                    <input type="password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder=" Password" />
                    <label htmlFor="file" className="file">
                        <i className="bi bi-file-earmark-arrow-up"></i>
                        Add an avatar
                    </label>
                    <label className="label" htmlFor="file" style={{ display: photoUrl ? "flex" : "none" }}>
                        <img className="image" alt={`Your image in here!`} src={`${photoUrl}`} />
                    </label>
                    <input type="file" onChange={(e) => setFile(e.target.files![0])} id="file" accept="image/*" />
                    <button type="submit">Sign Up</button>
                </form>
                <button type="submit" onClick={() => signInWithGoogle()} >Sign up with google</button>
                <p>Do you have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    )
}