import { applyMiddleware, legacy_createStore } from "redux";
import { rootReducer } from "./rootReducer";
import {composeWithDevTools} from "redux-devtools-extension"
import logger from 'redux-logger'
let store = legacy_createStore(rootReducer,composeWithDevTools(applyMiddleware(logger)))


export{store}