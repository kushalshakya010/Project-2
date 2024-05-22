import {useLocation, Navigate, Outlet, Routes, Route} from "react-router-dom"
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import OTPVerification from "../src/pages/OTPVerification.jsx"

import StartPage from "./pages/StartPage";
import Dashboard from "./pages/Dashboard.jsx";
import Analytics from "./pages/Analytics.jsx";
import Followers from "./pages/Followers.jsx";
import Content   from "./pages/Content.jsx";
import WritePost from "./pages/WritePost.jsx";


function Layout() {
  const user = {}

  const location = useLocation()


// by pass gardeko login haru
// return true ? (
    
    return user?.token ? (
    <div className="w-full h-screen"> 
      <Navbar/>

      <div className="w-full h-full flex border-t pt-16">
        <div className="hidden lg:flex">
          <Sidebar/>
        </div>

        <div className="w-full flex-1 px-8 py-6 overflow-y-auto">
          <Outlet/>
        </div>
      </div>
    </div> 
    
  ) : (
  
  <Navigate to= "/auth" state = {{from: location}} replace />
  );
}
function App() {
  return (
    <main className='w-full min-h-screen '>
      <Routes>
        <Route element = {<Layout/>}>
            <Route index path= "/" element={<Navigate to="dashboard" />} />
            <Route path= "/dashboard" element={<Dashboard/>} />
            <Route path= "/analytics" element={<Analytics/>} />
            <Route path= "/followers" element={<Followers/>} />
            <Route path= "/contents" element={<Content/>} />
            <Route path= "/write/:postID?" element={<WritePost/>} />

        </Route>

        <Route path="/auth" element={<StartPage />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
      </Routes>

    </main>
  );
}

export default App;
