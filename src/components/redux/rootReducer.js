import { combineReducers} from "redux"
import { adminReducer, staffReducer } from "./project.reducer"
let rootReducer = combineReducers(
    {
        admin:adminReducer,
        staff:staffReducer
    }
)

export {rootReducer}