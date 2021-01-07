import { SET_RESULT } from "../actions/types";

export default ( state = [], action ) => {
    switch (action.type) {
        case SET_RESULT:
            return action.payload;
        default:
            return state;
    }
}