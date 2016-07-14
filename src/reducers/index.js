import * as ActionTypes from '../actions'
import { combineReducers } from 'redux'

function letters(state = [], action) {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.LETTER_CLICK:
            return state.map(letter => {
                if (payload.id === letter.id) {
                    return Object.assign({}, letter, {
                        disabled: true
                    });
                }
                return letter;
            });
        case ActionTypes.ANSWER_CLICK:
            return state.map(letter => {
                if (payload.id === letter.id) {
                    return Object.assign({}, letter, {
                        disabled: false
                    });
                }
                return letter;
            });
        case ActionTypes.SET_LETTERS:
            return payload;
        default:
            return state;
    }
}

function answer(state = [], action) {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.LETTER_CLICK:
            return state.concat(payload);
        case ActionTypes.ANSWER_CLICK:
            return state.filter(letter => payload.id != letter.id);
        default:
            return state;
    }
}

function image(state = '', action) {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.IMAGE_CHANGE:
            return payload;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    letters,
    answer,
    image
})

export default rootReducer
