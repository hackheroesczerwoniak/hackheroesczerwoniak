import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar.js";
import { UserContextProvider } from "./context/userContext.js";
import Home from "./pages/Home"
import RegistrationPage from "./pages/RegistrationPage.js"
import MainPage from "./pages/MainPage.js"
import "./index.css"

export const App = () => {
    return <div className={'h-full w-full '}>
        <UserContextProvider>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/rejestracja" element={<RegistrationPage/>}/>
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    </div>
}

export default App;