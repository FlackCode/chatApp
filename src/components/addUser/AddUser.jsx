const AddUser = () => {
    return(
        <div className="p-8 hoverBg rounded-xl absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max">
            <form className="flex gap-5">
                <input type="text" placeholder="Username" name="username" className="p-5 rounded-xl border-none outline-none"/>
                <button className="p-5 rounded-xl bg-blue-500 text-white cursor-pointer font-semibold">Search</button>
            </form>
            <div className="mt-12 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <img src="./avatar.png" className="w-12 h-12 rounded-full object-cover"/>
                    <span>Flack Codes</span>
                </div>
                <button className="p-2 rounded-xl bg-blue-500 text-white cursor-pointer font-semibold">Add User</button>
            </div>
        </div>
    )
}

export default AddUser