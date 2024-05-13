const Detail = () => {
    return(
        <div className="flexCont1">
            <div className="py-8 px-5 flex flex-col items-center gap-4 customBorder">
                <img src="./avatar.png" alt="" className="w-16 h-16 rounded-full object-cover"/>
                <h2>Flack Codes</h2>
                <p>Random info about user.</p>
            </div>
            <div className="p-5 flex flex-col gap-6">
                <div className="">
                    <div className="flex items-center justify-between">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" className="w-8 h-8 cursor-pointer otherTexts p-3 rounded-full" />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <span>Privacy & Help</span>
                        <img src="./arrowUp.png" className="w-8 h-8 cursor-pointer otherTexts p-3 rounded-full" />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" className="w-8 h-8 cursor-pointer otherTexts p-3 rounded-full" />
                    </div>
                    <div className="flex flex-col gap-5 mt-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <img src="./heroIMG.jpg" className="w-10 h-10 rounded-md object-cover" />
                                <span className="text-sm font-light text-gray-200">photoname.jpg</span>
                            </div>
                            <img src="./download.png" className="w-8 h-8 otherTexts p-3 rounded-full cursor-pointer" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <img src="./heroIMG.jpg" className="w-10 h-10 rounded-md object-cover" />
                                <span className="text-sm font-light text-gray-200">photoname.jpg</span>
                            </div>
                            <img src="./download.png" className="w-8 h-8 otherTexts p-3 rounded-full cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" className="w-8 h-8 cursor-pointer otherTexts p-3 rounded-full" />
                    </div>
                </div>
                <button className="py-2 px-5 bg-red-500 text-white border-none rounded-md cursor-pointer hover:bg-red-700">Block User</button>
                <button className="p-2 bg-blue-500 text-white border-none rounded-md cursor-pointer">Logout</button>
            </div>
        </div>
    )
}

export default Detail