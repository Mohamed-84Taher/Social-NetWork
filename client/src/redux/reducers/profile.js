import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState={
    profile:null,
    profiles:[],
    error:{},
    loading:true
}
export default function(state=initialState,{type,payload}){
    switch (type) {
      case GET_PROFILE:
          return {
              ...state,profile:payload,loading:false
          }
      case PROFILE_ERROR:
          return {
              ...state,error:payload,loading:false
          }
      case CLEAR_PROFILE:
          return {...state,profile:null,loading:false}
     default:
         return state
    }
}