import { useEffect, useState } from "react"
import AddUser from '../addUser/AddUser'
import { useUserStore } from "../../lib/userStore"
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { useChatStore } from "../../lib/chatStore"
const ChatList = () => {
    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([])
    const [input, setInput] = useState('')
    const { currentUser } = useUserStore()
    const { chatId, changeChat } = useChatStore()

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, 'users', item.receiverId)
                const userDocSnap = await getDoc(userDocRef)

                const user = userDocSnap.data()

                return {...item, user}
            })

            const chatData = await Promise.all(promises)

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt))
        });

        return () => {
            unSub()
        }
    }, [currentUser.id])
    const handleSelect = async (chat) => {
        const userChats = chats.map(item => {
            const { user, ...rest } = item
            return rest
        })
        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId )
        userChats[chatIndex].isSeen = true
        const userChatsRef = doc(db, 'userchats', currentUser.id)

        try {
            await updateDoc(userChatsRef, {
                chats: userChats
            })
            changeChat(chat.chatId, chat.user)
        } catch(error) {
            console.log(error)
        }

        
    }

    const filteredChats = chats.filter(c => c.user.username.toLowerCase().includes(input.toLowerCase()))

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="flex items-center gap-5 p-5">
                <div className="flex-1 searchBg flex items-center gap-5 p-3 rounded-xl">
                    <img src="/search.png" alt="" width={20} height={20}/>
                    <input type="text" 
                    placeholder="Search" 
                    className="bg-transparent border-none outline-none text-white flex-1"
                    value={input}
                    onChange={e => setInput(e.target.value)}/>
                </div>
                <img src={addMode ? "./minus.png" : "./plus.png"} alt="" width={36} height={36} 
                className="searchBg p-3 rounded-xl cursor-pointer"
                onClick={() => setAddMode(prev => !prev)}/>
            </div>
            {filteredChats.map(chat => (
                <div key={chat.chatId} 
                className="flex items-center gap-5 p-5 cursor-pointer customBorder" 
                onClick={() => handleSelect(chat)}
                style={{
                    backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"
                }}>
                    <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar} width={50} height={50} className="object-cover rounded-full"/>
                    <div>
                        <span className="font-semibold">{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</span>
                        <p className="font-light">{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            
            
            {addMode && <AddUser/>}
        </div>
    )
}

export default ChatList