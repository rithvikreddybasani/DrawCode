import { Route, BrowserRouter, Routes } from "react-router-dom"
import Toast from "./components/toast/Toast"
import HomePage from "./pages/HomePage"
import EditorPage from "./pages/EditorPage" 
import PageNot from "./pages/PageNot"
// import GitHubCorner from "./components/GitHubCorner"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                    <Route path="*" element={ <PageNot/>} />
                </Routes>
            </BrowserRouter>
            <Toast /> {/* Toast component from react-hot-toast */}
            {/* <GitHubCorner /> */}
        </>
    )
}

export default App
