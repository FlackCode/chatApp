import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";
import { auth } from "./lib/firebase";
import { useChatStore } from "./lib/chatStore";
const App = () => {
  const { chatId } = useChatStore()
  const { currentUser, isLoading, fetchUserInfo } = useUserStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, user => {
      fetchUserInfo(user?.uid)
      
    })

    return () => {
      unSub()
    }
  }, [fetchUserInfo])

  if(isLoading) return <div className="p-12 text-4xl hoverBg h-screen text-white flex justify-center items-center"><h1>Loading...</h1></div>

  return(
    <div className="background w-screen h-screen flex items-center justify-center overflow-hidden">
      {currentUser ? (<div className="w-5/6 h-5/6 containerBg rounded-xl text-white flex">
                <List/>
                {chatId && <Chat/>}
                {chatId && <Detail/>}
              </div>) : 
              (<div className="w-5/6 h-5/6 containerBg rounded-xl text-white flex">
                <Login />
                <Notification />
              </div>)}
      
    </div>
  )
}
export default App;
