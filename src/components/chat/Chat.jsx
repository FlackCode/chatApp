import EmojiPicker from "emoji-picker-react"
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from "../../lib/firebase"
import { useChatStore } from "../../lib/chatStore"
import { useUserStore } from "../../lib/userStore"
import upload from "../../lib/upload"

const Chat = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [chat, setChat] = useState()
    const endRef = useRef(null)
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore()
    const { currentUser } = useUserStore()
    const [img, setImg] = useState({
        file: null,
        url: '',
    })
    useEffect(() => {
        endRef.current?.scrollIntoView()
    }, [])

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chatId), res => {
            setChat(res.data())
        })

        return () => {
            unSub()
        }
    }, [chatId])

    const handleEmoji = (e) => {
        setText(prev => prev + e.emoji)
        setOpen(false)
    }

    const handleSend = async () => {
        if(text === '') return;
        let imgUrl = null


        try {
            if(img.file) {
                imgUrl = await upload(img.file)
            }
            await updateDoc(doc(db, 'chats', chatId), {
                messages:arrayUnion({
                    senderId: currentUser,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl && {img:imgUrl}),
                })
            })

            const userIDs = [currentUser.id, user.id]

            userIDs.forEach(async (id) => {
                const userChatsRef = doc(db, 'userchats', id)
                const userChatsSnapshot = await getDoc(userChatsRef)
                if(userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data()
                    const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId)

                    userChatsData.chats[chatIndex].lastMessage = text
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false
                    userChatsData.chats[chatIndex].updatedAt = Date.now()

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,

                    })
                }
            })
        } catch(error) {
            console.log(error)
        }

        setImg({
            file: null,
            url: '',
        })

        setText('')
        endRef.current?.scrollIntoView()
    }

    const handleImg = (e) => {
        if(e.target.files[0]) {
            setImg({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }
    return(
        <div className="flexChat customChatBorder h-full flex flex-col scrollBar">
            <div className="p-5 flex items-center justify-between customBorder">
                <div className="flex items-center gap-5">
                    <img src={user?.avatar || "./avatar.png"} width={60} height={60} className="object-cover rounded-full"/>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-lg">{isCurrentUserBlocked ? "FlackChat User" : isReceiverBlocked ? "User blocked" : user?.username}</span>
                        <p className="text-sm font-light text-gray-200">Status currently unavailable...</p>
                    </div>
                </div>
                <div className="gap-5 hidden">
                    <img src="./phone.png" width={20} height={20} />
                    <img src="./video.png" width={20} height={20} />
                    <img src="./info.png"  width={20} height={20} />
                </div>
            </div>
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
                {chat?.messages?.map(message => (
                    <div className={message.senderId.id === currentUser.id ? "max-w-fit flex gap-5 self-end" : "max-w-fit flex gap-5"} key={message?.createdAt}>
                        <div className="flex-1 flex flex-col gap-1">
                            {message.img && <img src={message.img} className="w-full h-80 rounded-xl object-cover"/>}
                            <p className={message.senderId.id === currentUser.id ? "bg-blue-500 p-5 rounded-xl" : "searchBg p-5 rounded-xl"}>{message.text}</p>
                        </div>
                    </div>
                )
                )}
                <div ref={endRef}></div>
            </div>
            <div className="p-5 flex items-center justify-between customBorderTop gap-5 my-auto">
                <div className="flex gap-5">
                    <label htmlFor="file">
                        <img src="./img.png" width={20} height={20} className="cursor-pointer"/>
                    </label>
                    <input type="file" id="file" 
                    className="hidden" 
                    onChange={handleImg}
                    accept="image/png, image/gif, image/jpeg"/>
                    <img src="./camera.png" width={20} height={20} className="cursor-pointer hidden"/>
                    <img src="./mic.png"    width={20} height={20} className="cursor-pointer hidden"/>
                </div>
                <input type="text" 
                placeholder={isCurrentUserBlocked ? "You are blocked" : isReceiverBlocked ? "User blocked" : "Type a message..."}
                className="flex-1 border-none outline-none text-white searchBg p-5 rounded-xl"
                value={text}
                onChange={e => setText(e.target.value)}
                disabled={isCurrentUserBlocked || isReceiverBlocked}/>
                <div className="relative">
                    <img src="./emoji.png" width={20} height={20} onClick={() => setOpen(prev => !prev)} className="cursor-pointer"/>
                    <div className="absolute bottom-12 left-0">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="bg-blue-600 text-white py-2 px-5 border-none rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-700"
                onClick={handleSend}
                disabled={isCurrentUserBlocked || isReceiverBlocked}>Send</button>
            </div>
        </div>
    )
}

export default Chat