import { combineReducers, createStore } from "redux";
import { CinemaSeatsReducer } from "./CinemaSeatsReducer";


const rootReducer = combineReducers({
    CinemaSeatsReducer: CinemaSeatsReducer,

})

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);