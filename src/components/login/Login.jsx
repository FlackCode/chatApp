import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { toast } from "react-toastify"
import { auth, db, storage } from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore"
import upload from "../../lib/upload"

const Login = () => {
    const [avatar, setAvatar] = useState({
        file:null,
        url: ''
    })

    const [loading, setLoading] = useState(false)

    const handleAvatar = (e) => {
        if(e.target.files[0]) {
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    const handleLogin = async e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData)
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch(error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.target)
        const { username, email, password } = Object.fromEntries(formData)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db, 'users', res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            })
            await setDoc(doc(db, 'userchats', res.user.uid), {
                chats: [],
            })
            toast.success("Account created! You can login now!")
        } catch(error){
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="w-full h-full flex items-center gap-24">
            <div className="flex-1 flex flex-col items-center gap-5">
                <h2 className="font-bold text-2xl">Welcome back, </h2>
                <form className="flex flex-col items-center gap-5" onSubmit={handleLogin}>
                    <input type="text" placeholder="Email"         name="email" className="p-5 border-none outline-none searchBg rounded-md"/>
                    <input type="password" placeholder="Password"  name="password" className="p-5 border-none outline-none searchBg rounded-md"/>
                    <button className="w-full p-5 border-none bg-blue-500 text-white rounded-md cursor-pointer font-semibold disabled:cursor-not-allowed disabled:bg-blue-700" 
                    disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
                </form>
            </div>
            <div className="h-4/5 separator"></div>
            <div className="flex-1 flex flex-col items-center gap-5">
                <h2 className="font-bold text-2xl">Create an Account</h2>
                <form className="flex flex-col items-center gap-5" onSubmit={handleRegister}>
                    <div className="w-full flex items-center justify-between">
                        <img src={avatar.url || "./avatar.png"} className="w-12 h-1/2 rounded-xl object-cover"/>
                        <label htmlFor="file" className="cursor-pointer underline">Upload an image</label>
                    </div>
                    <input type="file" id="file" className="hidden" onChange={handleAvatar}/>
                    <input type="text" placeholder="Username"     name="username" className="p-5 border-none outline-none searchBg rounded-md"/>
                    <input type="text" placeholder="Email"        name="email" className="p-5 border-none outline-none searchBg rounded-md"/>
                    <input type="password" placeholder="Password" name="password" className="p-5 border-none outline-none searchBg rounded-md"/>
                    <button className="w-full p-5 border-none bg-blue-500 text-white rounded-md cursor-pointer font-semibold disabled:cursor-not-allowed disabled:bg-blue-700" 
                    disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login