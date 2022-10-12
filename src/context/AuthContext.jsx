import axios from "axios";
import { createContext, useState, useEffect, useMemo,React } from "react";
import {default as RestAPI} from "../services/auth/restAuth"
import {default as GraphQLAPI } from "../services/auth/graphqlAuth"
import useLocalStorage from "../hooks/localStorageHook";

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
    const [backendType,setBackendType] = useLocalStorage("backendType",BackendType.RestAPI);
    const [isUserLogged,setIsUserLogged] = useLocalStorage("userLogged",false)

    //On every mount
    useEffect(() => {
        _getUserByRefreshTokenFromCookie();
    }, [])

    const login = async (loginValues) => {
        
        setLoading(true)
        try{
                const logged_user =  await _loginResolver(backendType,{email:loginValues.email,password:loginValues.password},RestAPI.singIn,GraphQLAPI.singIn)
                setUser(logged_user);
                setIsUserLogged(true)
                let checkAdminRole = logged_user.roles.includes('Admin');
                setUserStatus({isLogged: true, isAdmin: checkAdminRole })
        }
        catch(err){
            console.log(err)
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

    const logout = async () => {
        setLoading(true);
        try{
           await _logoutResolver(backendType,user.jwt,RestAPI.logout,GraphQLAPI.logout)
           setIsUserLogged(false)
           setUserStatus({isLogged: false, isAdmin: false });
           setUser({});
        }
        catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        
    }

    const setJWT = (newJwt)=>{
        setUser(prevState=> ({...prevState,jwt:newJwt}))
    }

    const _getUserByRefreshTokenFromCookie =  async () => {
        const userLogged =isUserLogged;

        if(userLogged){
            try{
                const logged_user = await _refreshResolver(backendType,RestAPI.refresh,GraphQLAPI.refresh)
                setUser(logged_user);
                let checkAdminRole = logged_user.roles.includes('Admin');
                setUserStatus({isLogged: true, isAdmin: checkAdminRole })
            }catch(err){
                console.log(err);
                if(err.response.status === 500){
                    console.log("TODO")
                }
                if(err.response.status === 401){
                    logout()
                }
            }finally{
                setLoadingInitial(false)
            }
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
    }),[user,userStatus,loading,backendType])

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

const _loginResolver = async (backendType,body,RestLoginCallback,GraphQLLoginCallback) =>{ 
    if(backendType === BackendType.RestAPI){
        const response = await RestLoginCallback(body)
        const logged_user = {
            email: response.data.email,
            jwt: response.data.jwt,
            roles: response.data.roles,
            userId: response.data.userId,
            creationDate: response.data.creationTime
        };
        return logged_user
    }
    const {login} = await GraphQLLoginCallback(body.email,body.password);
    const logged_user = {
        email: login.email,
        jwt: login.jWT,
        roles: login.roles,
        userId: login.userId,
        creationDate: login.creationTime
    };
    return logged_user
}

const _logoutResolver = async (backendType,jwt,RestLogoutCallback,GraphQLLogoutCallback) =>{
    if(backendType === BackendType.RestAPI){
        const response = await RestLogoutCallback(jwt)
        return true
    }
    const response = await GraphQLLogoutCallback();
    return true;
}

const _refreshResolver = async(backendType,RestRefreshCallback,GraphQLRefreshCallback) =>{
    if(backendType === BackendType.RestAPI){
        const response = await RestRefreshCallback()
        const logged_user = {
            email: response.data.email,
            jwt: response.data.jwt,
            roles: response.data.roles,
            userId: response.data.userId,
            creationDate: response.data.creationTime
        };
        return logged_user;
    }
    const {refreshToken} = await GraphQLRefreshCallback();
    const logged_user = {
        email: refreshToken.email,
        jwt: refreshToken.jWT,
        roles: refreshToken.roles,
        userId: refreshToken.userId,
        creationDate: refreshToken.creationTime
    }; 
    return logged_user;
}