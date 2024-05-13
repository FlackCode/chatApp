import { useUserStore } from "../../lib/userStore"

const UserInfo = () => {
    const { currentUser } = useUserStore()

    return(
        <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <img src={currentUser.avatar || "./avatar.png"} width={50} height={50} className="object-cover rounded-full"/>
                <h2>{currentUser.username}</h2>
            </div>
            <div className="hidden gap-5">
                <img src="./more.png"  width={20} height={20} className="cursor-pointer"/>
                <img src="./video.png" width={20} height={20} className="cursor-pointer" />
                <img src="./edit.png"  width={20} height={20} className="cursor-pointer"/>
            </div>
        </div>
    )
}

export default UserInfo