import { ADMIN_USER, STAFF_USER } from "./project.actionTypes";


let initial_admin = {
  user:{
    authenticated: false,
     data: null,
    
  }
};

let inital_staff = {
  user:{
    authenticated: false,
    data: null,
  }
  };

let adminReducer = (state = initial_admin, action) => {
  switch (action.type) {
    case ADMIN_USER: {
      return{
      user:{
        ...action.payload
      }
      };
    }
    default:
     return state;
  }
};
export {adminReducer}

let staffReducer = (state = inital_staff, action) => {
    switch (action.type) {
      case STAFF_USER: {
        return {
          user:{
            ...action.payload
          } 
        };
        }
      default:
       return state;
    }
  };
  export{staffReducer}
