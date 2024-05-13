import UserInfo from "./UserInfo"
import ChatList from "./ChatList"

const List = () => {
    return(
        <div className="flexCont1 flex-1 flex flex-col scrollBar">
            <UserInfo/>
            <ChatList/>

        </div>
    )
}

export default List