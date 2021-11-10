import axios from "axios"


function setAuthToken(token) {
 if(localStorage.token){
     axios.defaults.headers.common["x-auth-token"]=token
 } else {
     delete axios.defaults.headers.common["x-auth-token"]
 }
}

export default setAuthToken
