const UserInfo = () => {
    return(
        <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-5">
                <img src="./avatar.png" width={50} height={50} className="object-cover rounded-full"/>
                <h2>Flack Codes</h2>
            </div>
            <div className="flex gap-5">
                <img src="./more.png"  width={20} height={20} className="cursor-pointer"/>
                <img src="./video.png" width={20} height={20} className="cursor-pointer" />
                <img src="./edit.png"  width={20} height={20} className="cursor-pointer"/>
            </div>
        </div>
    )
}

export default UserInfo