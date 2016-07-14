export const LETTER_CLICK = 'LETTER_CLICK'

export function letterClick(id, value) {
    return {
        type: LETTER_CLICK,
        payload: {
            id,
            value
        }
    }
}

export const SET_LETTERS = 'SET_LETTERS'

export function setLetters(letters) {
    return {
        type: SET_LETTERS,
        payload: letters
    }
}

export const ANSWER_CLICK = 'ANSWER_CLICK'

export function answerClick(id, value) {
    return {
        type: ANSWER_CLICK,
        payload: {
            id,
            value
        }
    }
}

export const IMAGE_CHANGE = 'IMAGE_CHANGE'

export function imageChange(url) {
    return {
        type: IMAGE_CHANGE,
        payload: url
    }
}
