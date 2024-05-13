import { useState } from "react"
import { toast } from "react-toastify"

const Login = () => {
    const [avatar, setAvatar] = useState({
        file:null,
        url: ''
    })
    const handleAvatar = (e) => {
        if(e.target.files[0]) {
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    const handleLogin = (e) => {
        e.preventDefault()
    }
    const handleRegister = e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { username, email, password } = Object.fromEntries(formData)
        console.log(username)
    }
    return (
        <div className="w-full h-full flex items-center gap-24">
            <div className="flex-1 flex flex-col items-center gap-5">
                <h2 className="font-bold text-2xl">Welcome back, </h2>
                <form className="flex flex-col items-center gap-5" onSubmit={handleLogin}>
                    <input type="text" placeholder="Email"          className="p-5 border-none outline-none searchBg rounded-md"/>
                    <input type="password" placeholder="Password"   className="p-5 border-none outline-none searchBg rounded-md"/>
                    <button className="w-full p-5 border-none bg-blue-500 text-white rounded-md cursor-pointer font-semibold">Sign In</button>
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
                    <button className="w-full p-5 border-none bg-blue-500 text-white rounded-md cursor-pointer font-semibold">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login