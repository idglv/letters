import { random, shuffle } from 'lodash'

import uuid from 'uuid'

export function word(letter, disabled = false) {
    return {
        id: uuid.v1(),
        value: letter,
        disabled: disabled
    }
}

export function convert(answer) {
    return answer.split('').map(letter => word(letter));
}

export function addRandom(answer, len) {
    var result = [].concat(answer);
    var variants = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    for (var i = 0; i < len - answer.length; i++) {
        result.push(word(variants[random(variants.length - 1)]))
    }
    return shuffle(result);
}

export function newVariant(word, len) {
    return addRandom(convert(word), len);
}
