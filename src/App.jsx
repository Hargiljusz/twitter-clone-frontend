import {AuthContextProvider} from "./context/AuthContext"
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import './App.css'
import Sidebar from "./assets/Sidebar";
import Container from "./assets/Container";
import Activitybar from "./assets/Activitybar";
import routes from "./utils/routesData";
import Profile from "./pages/Profile";

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <AuthContextProvider>
        <Sidebar />
        <Container>
          <Routes>
            <Route path={routes.Home} element={<Home />} />
            <Route path={routes.Profile} element={<Profile />} />
          </Routes> 
        </Container>
        <Activitybar />

      </AuthContextProvider>
    </BrowserRouter>
    </div>
  )
}

export default App
