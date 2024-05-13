import { useState } from "react"
import AddUser from '../addUser/AddUser'
const ChatList = () => {
    const [addMode, setAddMode] = useState(false)

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex items-center gap-5 p-5">
                <div className="flex-1 searchBg flex items-center gap-5 p-3 rounded-xl">
                    <img src="/search.png" alt="" width={20} height={20}/>
                    <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-white flex-1"/>
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" width={36} height={36} 
                className="searchBg p-3 rounded-xl cursor-pointer"
                onClick={() => setAddMode(prev => !prev)}/>
            </div>
            <div className="flex items-center gap-5 p-5 cursor-pointer customBorder">
                <img src="./avatar.png" alt="" width={50} height={50} className="object-cover rounded-full"/>
                <div>
                    <span className="font-semibold">Flack Codes</span>
                    <p className="font-light">Hello</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-5 cursor-pointer customBorder">
                <img src="./avatar.png" alt="" width={50} height={50} className="object-cover rounded-full"/>
                <div>
                    <span className="font-semibold">Flack Codes</span>
                    <p className="font-light">Skibidi toilet</p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-5 cursor-pointer customBorder">
                <img src="./avatar.png" alt="" width={50} height={50} className="object-cover rounded-full"/>
                <div>
                    <span className="font-semibold">Flack Codes</span>
                    <p className="font-light">yippie</p>
                </div>
            </div>
            {addMode && <AddUser/>}
        </div>
    )
}

export default ChatList