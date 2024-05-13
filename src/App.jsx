import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
const App = () => {

  const user = false

  return(
    <div className="background w-screen h-screen flex items-center justify-center overflow-hidden">
      {user ? (<div className="w-5/6 h-5/6 containerBg rounded-xl text-white flex">
                <List/>
                <Chat/>
                <Detail/>
              </div>) : 
              (<div className="w-5/6 h-5/6 containerBg rounded-xl text-white flex">
                <Login />
                <Notification />
              </div>)}
      
    </div>
  )
}
export default App;
