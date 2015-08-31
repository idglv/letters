import shuffle from 'array-shuffle';
import generateWord from './generateWord';
import imgs from './images';

let _getOWord = generateWord(imgs);

let _changeLetterEnabled = (letter) => {
  return {
    index: letter.index,
    text: letter.text,
    enabled: !letter.enabled
  }
};

let _wordToLetters = (word) => {
  return word.split('').map((letter, index) => {
      return {
        index: index,
        text: letter,
        enabled: false
      };
    })
};

let  _shuffleLetters = (word) => shuffle(_wordToLetters(word));

export default {
  changeEnabled: (letters, index) => {
    return letters.map((letter) => {
        if (letter.index === index ) {
          return _changeLetterEnabled(letter);
        }
      return letter;
    })
  },

  removeLetter: (letters, index) => {
    return letters.filter((letter) => letter.index !== index)
  },

  addLetter: (result, letters, index) => {
    return result.concat(letters.filter((letter) => letter.index === index));
  },

  getNewWord: () => {
    let oWord = _getOWord();
    return {
      word: oWord.word,
      imgSrc: oWord.src,
      wordLetter: _shuffleLetters(oWord.word)
    };
  }
}
