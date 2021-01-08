import { combineReducers } from "redux";
import searchReducer from './SearchReducer'
import activeSearchReducer from './ActiveSearchReducer'
import ResultsReducer from "./ResultsReducer";
import ShowInfoReducer from "./ShowInfoReducer";

export default combineReducers({
    activeSearch: activeSearchReducer,
    search: searchReducer,
    result: ResultsReducer,
    showInfo: ShowInfoReducer
})