import EmojiPicker from "emoji-picker-react"
import { useEffect, useRef, useState } from "react"

const Chat = () => {
    const [open, setOpen] = useState(false)
    const [text, setText] = useState('')

    const endRef = useRef(null)

    useEffect(() => {
        endRef.current?.scrollIntoView()
    }, [])

    const handleEmoji = (e) => {
        setText(prev => prev + e.emoji)
        setOpen(false)
    }
    return(
        <div className="flexChat customChatBorder h-full flex flex-col scrollBar">
            <div className="p-5 flex items-center justify-between customBorder">
                <div className="flex items-center gap-5">
                    <img src="./avatar.png" width={60} height={60} className="object-cover rounded-full"/>
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-lg">Flack Codes</span>
                        <p className="text-sm font-light text-gray-200">Random information about user.</p>
                    </div>
                </div>
                <div className="flex gap-5">
                    <img src="./phone.png" width={20} height={20} />
                    <img src="./video.png" width={20} height={20} />
                    <img src="./info.png"  width={20} height={20} />
                </div>
            </div>
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
                <div className="w-3/4 flex gap-5">
                    <img src="./avatar.png" className="object-cover rounded-full w-8 h-8" />
                    <div className="flex-1 flex flex-col gap-1">
                        <p className="otherTexts p-5 rounded-xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Culpa id pariatur, voluptates voluptas quibusdam officiis eum voluptate vel repellat explicabo autem aspernatur eaque vero molestias temporibus, 
                        exercitationem sit iste quia.</p>
                        <span className="text-sm">1 min ago</span>
                    </div>
                </div>
                <div className="w-3/4 flex gap-5 self-end">
                    <div className="flex-1 flex flex-col gap-1">
                        <p className="bg-blue-500 p-5 rounded-xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Culpa id pariatur, voluptates voluptas quibusdam officiis eum voluptate vel repellat explicabo autem aspernatur eaque vero molestias temporibus, 
                        exercitationem sit iste quia.</p>
                        <span className="text-sm">1 min ago</span>
                    </div>
                </div>
                <div className="w-3/4 flex gap-5">
                    <img src="./avatar.png" className="object-cover rounded-full w-8 h-8" />
                    <div className="flex-1 flex flex-col gap-1">
                        <p className="otherTexts p-5 rounded-xl">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                        Culpa id pariatur, voluptates voluptas quibusdam officiis eum voluptate vel repellat explicabo autem aspernatur eaque vero molestias temporibus, 
                        exercitationem sit iste quia.</p>
                        <span className="text-sm">1 min ago</span>
                    </div>
                </div>
                <div className="w-3/4 flex gap-5 self-end">
                    <div className="flex-1 flex flex-col gap-1">
                        <img src="./heroIMG.jpg" className="w-full h-80 rounded-xl object-cover"/>
                        <p className="bg-blue-500 p-5 rounded-xl">Sex?</p>
                        <span className="text-sm">1 min ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="p-5 flex items-center justify-between customBorderTop gap-5 my-auto">
                <div className="flex gap-5">
                    <img src="./img.png"    width={20} height={20} />
                    <img src="./camera.png" width={20} height={20} />
                    <img src="./mic.png"    width={20} height={20} />
                </div>
                <input type="text" 
                placeholder="Type a message..." 
                className="flex-1 border-none outline-none text-white searchBg p-5 rounded-xl"
                value={text}
                onChange={e => setText(e.target.value)}/>
                <div className="relative">
                    <img src="./emoji.png" width={20} height={20} onClick={() => setOpen(prev => !prev)} className="cursor-pointer"/>
                    <div className="absolute bottom-12 left-0">
                        <EmojiPicker open={open} onEmojiClick={handleEmoji}/>
                    </div>
                </div>
                <button className="bg-blue-600 text-white py-2 px-5 border-none rounded-md cursor-pointer">Send</button>
            </div>
        </div>
    )
}

export default Chat