import { combineReducers } from "redux";
import searchReducer from './SearchReducer'
import activeSearchReducer from './ActiveSearchReducer'
import ResultsReducer from "./ResultsReducer";

export default combineReducers({
    activeSearch: activeSearchReducer,
    search: searchReducer,
    result: ResultsReducer
})