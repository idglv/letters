import React, { Component, Fragment } from "react";
import { range, shuffle } from "lodash";
import isMobile from "ismobilejs";
import cx from "classnames";

import "./app.css";
import Letter from "../Letter";
import Switch from "../Switch";
import Button from "../Button";
import data from "../../data";
import { newGame, selectLetter, deselectLetter } from "../../Game";

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

    this.inputValue = React.createRef();
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


  handleInputValueChange = e => {
    const value = e.target.value.toUpperCase();
    const game = this.state.game;
    
    const letterIndex = game.letters.findIndex(letter => {
      return letter.value === value && !game.answer.includes(letter.id);
    });

    if (letterIndex !== -1 ) {
      this.setState({
        game: selectLetter(game, letterIndex)
      }, this.checkGameState)
    }

  };

  handleInputValueKeyDown = e => {
    const game = this.state.game;

    // Backspace
    if (e.which === 8) {
      const answer = game.answer;
      if (answer.length) {
        const lastIndex = answer.length - 1;
        this.setState({
          game: deselectLetter(game, lastIndex)
        });
      }
    }
    // Space
    if (e.which === 32) {
      this.handleSkipGame();
    }
  };

  handlePutFocusInInput = () => {
    if (!isMobile.any) {
      this.inputValue.current.focus()
    }
  };

  // Render

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

  render() {
    const { game, loading, prevWords, skippedWords } = this.state;
    const imageClass = cx("image", {
      image_loading: loading
    });

    return (
      <Fragment>
        <div className="settings-block" onClick={this.handlePutFocusInInput}>
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
            <p>You can use keyboard to answer. Press "Space" to skip word.</p>
          </div>
        </div>
        <div className="app-block" onClick={this.handlePutFocusInInput}>
          <div className="app">
            <img
              className={imageClass}
              src={game.src}
              alt=""
              onLoad={this.handleImageOnload}
            />
            <input autoFocus={!isMobile.any} ref={this.inputValue} className="input_value" type="text" value="" onKeyDown={this.handleInputValueKeyDown} onChange={this.handleInputValueChange} />
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
