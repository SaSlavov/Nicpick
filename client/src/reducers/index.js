import { combineReducers } from "redux";
import searchReducer from './MovieSearchReducer'
import activeSearchReducer from './ActiveSearchReducer'

export default combineReducers({
    activeSearch: activeSearchReducer,
    search: searchReducer
})