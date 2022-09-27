import {AuthContextProvider} from "./context/AuthContext"
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import './App.css'
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Sidebar from "./assets/Sidebar";
import Container from "./assets/Container";
import Activitybar from "./assets/Activitybar";
import routes from "./utils/routesData";
import Profile from "./pages/Profile";
import User from "./pages/User";

const client = new QueryClient() 

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <Sidebar />
          <Container>
            <Routes>
              <Route path={routes.Home} element={<Home />} />
              <Route path={routes.Profile} element={<Profile />} />
              <Route path={`${routes.User}/:id`} element={<User />} />
            </Routes> 
          </Container>
          <Activitybar />
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
    </div>
  )
}

export default App
