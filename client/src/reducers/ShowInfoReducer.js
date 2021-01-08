import { OPEN_INFO } from "../actions/types";

export default ( state = null, action ) => {
    switch (action.type) {
        case OPEN_INFO:
            return action.payload;
        default:
            return state;
    }
}