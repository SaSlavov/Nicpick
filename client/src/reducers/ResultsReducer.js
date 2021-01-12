import { SET_PAGE, SET_RESULT } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_RESULT:
            return action.payload;
        case SET_PAGE:
            return {...state, "page": action.payload};
        default:
            return state;
    }
}