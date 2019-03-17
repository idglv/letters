import React, { Component, Fragment } from "react";
import "./app.css";
import Letter from "../Letter";
import Switch from "../Switch";
import Button from "../Button";
import { range, shuffle } from "lodash";
import data from "../../data";
import { newGame, selectLetter, deselectLetter } from "../../Game";
import cx from "classnames";

class App extends Component {
  constructor(props) {
    super(props);

    const index = 0;
    const wordIndexes = shuffle(range(data.length));
    const difficulty = true;

    this.state = {
      darkTheme: false,
      difficulty: difficulty,
      wordIndexes: wordIndexes,
      index: index,
      game: newGame(difficulty, data[wordIndexes[index]]),
      prevWords: [],
      skippedWords: [],
      loading: true
    };
  }

  newGameState = state => {
    const { index, wordIndexes, difficulty } = state;
    const newIndex = index + 1;

    return {
      index: newIndex,
      game: newGame(difficulty, data[wordIndexes[newIndex]]),
      loading: true
    };
  };

  checkGameState = () => {
    const { prevWords, game } = this.state;

    if (game.won) {
      this.setState({
        prevWords: prevWords.concat([game.word]),
        ...this.newGameState(this.state)
      });
    }
  };

  handleAnswerLetterClick = event => {
    const index = +event.target.dataset.index;

    this.setState({
      game: deselectLetter(this.state.game, index)
    });
  };

  handleLetterClick = event => {
    const { game } = this.state;
    const index = +event.target.dataset.index;
    const letterId = game.letters[index].id;

    const answerIndex = game.answer.indexOf(letterId);
    if (answerIndex !== -1) {
      this.setState({
        game: deselectLetter(game, answerIndex)
      });
      return;
    }

    this.setState(
      {
        game: selectLetter(game, index)
      },
      this.checkGameState
    );
  };

  handleImageOnload = () => {
    this.setState({
      loading: false
    });
  };

  handleSkipGame = () => {
    const { skippedWords, game } = this.state;
    this.setState({
      skippedWords: skippedWords.concat([game.word]),
      ...this.newGameState(this.state)
    });
  };

  renderLetterList = (letters, handleClick) => {
    return letters.map((letter, index) => {
      return (
        <Letter
          key={letter.id}
          onClick={handleClick}
          index={index}
          value={letter.value}
          selected={letter.selected}
          wrong={letter.wrong}
        />
      );
    });
  };

  themeChange = () => {
    const newDarkTheme = !this.state.darkTheme;

    if (newDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    this.setState({
      darkTheme: newDarkTheme
    });
  };

  difficultyChange = () => {
    const { difficulty, index, wordIndexes } = this.state;
    const newDifficulty = !difficulty;

    this.setState({
      difficulty: newDifficulty,
      game: newGame(newDifficulty, data[wordIndexes[index]])
    });
  };

  gameToAnswer = game => {
    return game.answer.map(id => ({
      id: id,
      value: game.letters.find(letter => letter.id === id).value,
      selected: false,
      wrong: game.wrongAnswer
    }));
  };

  gameToLetters = game => {
    return game.letters.map(letter => ({
      id: letter.id,
      value: letter.value,
      selected: game.wrongAnswer || game.answer.includes(letter.id),
      wrong: false
    }));
  };

  render() {
    const { game, loading, prevWords, skippedWords } = this.state;
    const imageClass = cx("image", {
      image_loading: loading
    });

    return (
      <Fragment>
        <div className="settings-block">
          <div className="settings">
            <Switch
              text="Dark theme"
              checked={this.state.darkTheme}
              onChange={this.themeChange}
            />
            <Switch
              text="Hard"
              checked={this.state.difficulty}
              onChange={this.difficultyChange}
            />
            <Button onClick={this.handleSkipGame}>Next word</Button>
            <p>{prevWords.join(", ")}</p>
            <p className="skipped">{skippedWords.join(", ")}</p>
          </div>
        </div>
        <div className="app-block">
          <div className="app">
            <img
              className={imageClass}
              src={game.src}
              alt=""
              onLoad={this.handleImageOnload}
            />
            <div className="word">
              {this.renderLetterList(
                this.gameToAnswer(game),
                this.handleAnswerLetterClick
              )}
            </div>
            <div className="word">
              {this.renderLetterList(
                this.gameToLetters(game),
                this.handleLetterClick
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
