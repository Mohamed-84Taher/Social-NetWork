
import { ACCOUNT_DELETED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED } from "../actions/types"



const initState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    user:null,
    loading:true
}
const authReducer=(state=initState,{type,payload})=>{
    switch (type) {
        case USER_LOADED:
            return {
                ...state,isAuthenticated:true,user:payload,loading:false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token)
         return {
             ...state,isAuthenticated:true,...payload,loading:false
         }
        case REGISTER_FAIL:
        case AUTH_ERROR: 
        case LOGIN_FAIL:
        case ACCOUNT_DELETED:
        case LOGOUT:   
            localStorage.removeItem('token')
            return {
                ...state,isAuthenticated:false,loading:false,token:null
            }
    
        default:
        return state
    }
}
export default authReducer