import initialState from './initialState';
import {
    PAST_USER
} from '../actions';

export default function elementsReducer(state = initialState.user, action) {
    switch(action.type) {

        case PAST_USER:
            return {...state, ...action.payload};

        default: return state;
    }
}
