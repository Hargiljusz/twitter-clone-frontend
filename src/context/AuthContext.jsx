import axios from "axios";
import { createContext, useState, useEffect, useMemo,React } from "react";

const BackendType = {
    RestAPI : "RestAPI",
    GraphQL: "GraphQL"
}

const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [user, setUser] = useState({});
    const [userStatus, setUserStatus] = useState({
        isLogged: false,
        isAdmin: false
    })
    const [loadingInitial,setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
    const [backendType,setBackendType] = useState(BackendType.RestAPI);

    //On every mount
    useEffect(() => {
        _getUserByRefreshTokenFromCookie();
    }, [])

    const login = async (loginValues) => {
        setLoading(true)
        try{
            const response = await axios.post('/api/Authenticate/login',{email:loginValues.email,password:loginValues.password},{headers:{'Content-Type':'application/json'}}) 
                const logged_user = {
                    email: response.data.email,
                    jwt: response.data.jwt,
                    roles: response.data.roles,
                    userid: response.data.userID,
                    creationDate: response.data.creationDate
                };
        
                setUser(logged_user);
                localStorage.setItem("userLogged",true);
                let checkAdminRole = logged_user.roles.includes('Admin');
                setUserStatus({isLogged: true, isAdmin: checkAdminRole })
        }
        catch(err){
            if(err.response.status === 401){
                return "Błedne dane uwierzytelniające."
            }
            if(err.response.status === 403){
                return "Email nie został potwierdzony."
            }
            return "Coś poszło nie tak."
        }
        finally{
            setLoading(false)
        }
    }

    const logout = () => {
        setLoading(true);
        axios.get('/api/Authenticate/logout')
        .then(response => {
            localStorage.clear()
            setUserStatus({isLogged: false, isAdmin: false });
            setUser({});
        })
        .catch(err => {console.log(err)})
        .finally(()=>setLoading(false))
    }

    const setJWT = (newJwt)=>{
        setUser(prevState=> ({...prevState,jwt:newJwt}))
    }

    const _getUserByRefreshTokenFromCookie = () => {
        const userLogged = localStorage.getItem("userLogged");

        if(userLogged){
            axios.post('/api/Authenticate/refresh')
            .then(response => {
                if(response.status === 200){
                    
                    const logged_user = {
                        username: response.data.email,
                        jwt: response.data.jwt,
                        roles: response.data.roles,
                        userid: response.data.userID,
                        creationDate: response.data.creationDate
                    };

                    setUser(logged_user);
                    let checkAdminRole = logged_user.roles.includes('Admin');
                    setUserStatus({isLogged: true, isAdmin: checkAdminRole })
                }
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 500){
                    console.log("TODO")
                }
                if(err.response.status === 401){
                    logout()
                }
            })
            .finally(() => setLoadingInitial(false));
        }else{
            setLoadingInitial(false)
        }
    }

    const memoedValues = useMemo(()=>({
        login,
        logout,
        setJWT,
        setLoading,
        user,
        userStatus,
        loading,
        backendType,
        setBackendType
    }),[user,userStatus,loading])

    return(
        <AuthContext.Provider value={memoedValues}>
            {!loadingInitial ? children : null}
        </AuthContext.Provider>
    )
}
export {
    BackendType
}
export default AuthContext;

