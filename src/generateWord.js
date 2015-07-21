export default (aWords) =>
  () => {
    let randWord = aWords[Math.random() * aWords.length << 0];
    aWords = aWords.filter((word) => word !== randWord);
    return randWord;
  }