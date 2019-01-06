import {initialState} from './state';
import * as types from './types';

export function reducer(state = {}, action) {
    console.log('test', action);
    const property = action.type;
    switch (action.type) {
        case types.firebase.FIREBASE_UPDATE_REQUESTED:
            return {...state, [property]: {inProgress: true, error: ''}};
        case types.firebase.FIREBASE_UPDATE_FULFILLED:
            return {...state, [property]: {inProgress: false, error: ''}};
        case types.firebase.FIREBASE_UPDATE_REJECTED:
            return {...state, [property]: {inProgress: false, error: action.payload.error}};
        default:
            return state;
    }
}
