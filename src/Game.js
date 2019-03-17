import uuidv1 from "uuid/v1";
import {
    shuffle,
    random
} from "lodash";

function letter(value) {
    return {
        id: uuidv1(),
        value: value.toUpperCase()
    }
}

export function newGame(difficulty, {
    word,
    src
}) {
    const additional = difficulty ? 4 : 2;

    return updateGame({
        word: word.toUpperCase(),
        src: src,
        answer: [],
        letters: addRandom(word.split("").map(letter), word.length + additional),
        won: false,
        wrongAnswer: false
    })
}

function updateGame(oldGame, game = {}) {
    return Object.assign({}, oldGame, game);
}

function addRandom(letters, len) {
    const result = [].concat(letters);
    const variants = "abcdefghijklmnopqrstuvwxyz".split("");

    for (var i = 0; i < len - letters.length; i++) {
        const value = variants[random(variants.length - 1)];
        result.push(letter(value));
    }
    return shuffle(result);
}

export function selectLetter(game, index) {
    const selectedLetter = game.letters[index];

    if (game.word.length <= game.answer.length) {
        return game;
    }

    // Если пришёл не корректный индекс
    if (!selectedLetter) {
        return game;
    }

    // Не добавляем дубликаты
    if (game.answer.includes(selectedLetter.id)) {
        return game;
    }

    const answer = game.answer.concat([selectedLetter.id]);

    return updateStatus(updateGame(game, {
        answer
    }));
}

export function deselectLetter(game, index) {
    const answer = game.answer.filter((_, i) => i !== index);

    return updateStatus(updateGame(game, {
        answer
    }))
}

function updateStatus(game) {
    let won = false;
    let wrongAnswer = false;

    if (game.answer.length === game.word.length) {
        let aAnswer = game.answer
            .map(id => game.letters.find(letter => letter.id === id))
            .map(letter => letter.value);

        won = aAnswer.join("") === game.word;
        wrongAnswer = !won;
    }

    return updateGame(game, {
        won,
        wrongAnswer
    });
}