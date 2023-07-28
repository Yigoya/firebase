import { useState } from "react"
import { auth, googleProvider } from "../config/firebase-config"
import { createUserWithEmailAndPassword,signInWithPopup,signOut } from "firebase/auth"
export const Auth =()=>{
    const [email,setEmail] = useState('')
    const [Pass,setPass] = useState('')
    console.log(auth?.currentUser?.email)
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth,email,Pass)
        }catch(e){
            console.log(e)
        }
    }
    const signInWithGoogle = async ()=>{
        try {
            await signInWithPopup(auth,googleProvider)
        }catch(e){
            console.log(e)
        }
    }
    const logout = async ()=>{
        try {
            await signOut(auth)
        }catch(e){
            console.log(e)
        }
    }
    return (
        <div>
            <input type="email" placeholder="Email.." value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="pass..." value={Pass} onChange={(e)=>setPass(e.target.value)}/>
            <button onClick={signIn}>sign in</button>
            <button onClick={logout}>logout</button>
            <button onClick={signInWithGoogle}>sign in with google</button>


        </div>
    )
}