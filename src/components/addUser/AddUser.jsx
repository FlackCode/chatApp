import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from '../../lib/firebase'
import { useState } from "react"
import { useUserStore } from '../../lib/userStore'
const AddUser = () => {
    const [user, setUser] = useState(null)
    const { currentUser } = useUserStore()
    const handleSearch = async e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const username = formData.get('username')
        try {
            const userRef = collection(db, "users")
            const q = query(userRef, where("username", "==", username))
            const querySnapShot = await getDocs(q)

            if(!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data())
            }
        } catch(error) {
            console.log("Error", error.message)
        }
    }
    const handleAdd = async () => {
        const chatRef = collection(db, 'chats')
        const userChatsRef = collection(db, 'userchats')
        try {
            const newChatRef = doc(chatRef)
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            })
            await updateDoc(doc(userChatsRef, user.id), {
                chats:arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: currentUser.id,
                    updatedAt: Date.now(),
                })
            })
            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats:arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: '',
                    receiverId: user.id,
                    updatedAt: Date.now(),
                })
            })
        } catch(error) {
            console.log("Error", error.message)
        }
    }
    return(
        <div className="p-8 hoverBg rounded-xl absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
            <form className="flex gap-5" onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" className="p-5 rounded-xl border-none outline-none text-black"/>
                <button className="p-5 rounded-xl bg-blue-500 text-white cursor-pointer font-semibold">Search</button>
            </form>
            {user && 
            <div className="mt-12 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <img src={user.avatar || "./avatar.png"} className="w-12 h-12 rounded-full object-cover"/>
                    <span>{user.username}</span>
                </div>
                <button className="p-2 rounded-xl bg-blue-500 text-white cursor-pointer font-semibold"
                onClick={handleAdd}>Add User</button>
            </div>
            }
        </div>
    )
}

export default AddUser