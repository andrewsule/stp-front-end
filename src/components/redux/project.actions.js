import { ADMIN_USER, STAFF_USER } from "./project.actionTypes"

let admin_user = (user)=>{
    return{
        type:ADMIN_USER,
        payload:user
    }
}
export {admin_user}

let staff_user = (user)=>{
    return{
        type:STAFF_USER,
        payload:user 
    }
}
export {staff_user}