import * as types from './types';
import * as actions from './actions';
import firebaseInstance from './firebase';
import { put, take, call, fork } from 'redux-saga/effects';

export function* watchUpdateRequested() {
    while (true) {
        const action = yield take(types.firebase.FIREBASE_UPDATE_REQUESTED);
        let getUpdates = null;
        switch (action.meta.type) {
            case types.metaTypes.profile:
                getUpdates = getUserContactsUpdates;
                break;
            default:
                break;
        }
        if (typeof getUpdates === 'function') {
            const updates = yield call(getUpdates, action.payload);
            yield fork(updateItems, updates, action.meta.type);
        }
    }
}

export function* updateItems(updates, metaType) {
    try {
        const ref = firebaseInstance.database().ref();
        yield call([ref, ref.update], updates);
        yield put(actions.firebaseUpdateFulfilled(metaType))
    } catch (error) {
        yield put(actions.firebaseUpdateRejected(error, metaType))
    }
}

export function getUserContactsUpdates({ uid, name, age }) {
    return {
        [`user/${uid}/name`]: name,
        [`user/${uid}/age`]: age,
    }
}