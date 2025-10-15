// {// import './App.css';
// // import React from 'react';
// // import LetterBox from './LetterBox';
// // import SingleLetterSearchbar from './SingleLetterSearchBar';

// // const pics = ['Post.png', 'head.png', 'body.png', 'righthand.png', 'lefthand.png', 'leg.png', 'dead.png'];
// // const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];
// // class HangmanGame extends React.Component {
// //   state = {
// //     wordList: [],
// //     curWord:  0,
// //     lifeLeft: 0,
// //     usedLetters: []
// //   }
// //   componentDidMount() {
    
// //     console.log(words);
// //     this.setState({
// //       wordList: words
// //     });
// //   }
// //   getPlayerName = (name) => {
// //     this.setState({
// //       playerName: name
// //     });
// //   }
// //   startNewGame = () => {
// //     this.setState({
// //       curWord: Math.floor(Math.random() * this.state.wordList.length)
// //     });
// //   }

// //   render(){
// //     const word = this.state.wordList[this.state.curWord];
// //     return(
// //       <div>
// //         <img src={pics[this.state.lifeLeft]}/>
// //         <button onClick={this.startNewGame}>New Game</button>
// //         <p>{word}</p>
// //         <SingleLetterSearchbar></SingleLetterSearchbar>

// //         <LetterBox 
// //           letter="a"
// //           isVisible={true}
// //           boxStyle={{ backgroundColor: 'lightblue' }}
// //           letterStyle={{ color: 'white', fontSize: '30px' }}
// //         ></LetterBox>
// //       </div>
// //     )
// //   }

// // }
// }

import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = [
  'Post.png', 'head.png', 'body.png', 'righthand.png','lefthand.png', 'leg.png', 'dead.png','over.png'];
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React","Learning", "Love"];

class HangmanGame extends React.Component {
  state = {
    wordList: [],
    curWord: "",
    isWon: false,
    lifeLeft: 0,
    usedLetters: [],
    displayWord: [],
    message: ""
  }

  componentDidMount() {
    this.setState({ wordList: words }, this.startNewGame);
  }

  startNewGame = () => {
    const randomWord = this.state.wordList[
      Math.floor(Math.random() * this.state.wordList.length)
    ].toUpperCase();

    this.setState({
      curWord: randomWord,
      lifeLeft: 0,
      isWon: false,
      usedLetters: [],
      displayWord: Array(randomWord.length).fill("_"),
      message: ""
    });
  }

  handleLetterGuess = (letter) => {
    letter = letter.toUpperCase();
    const { curWord, usedLetters, lifeLeft, displayWord } = this.state;

    // Ignore repeated guesses
    if (usedLetters.includes(letter)) return;

    let newUsed = [...usedLetters, letter];
    let newDisplay = [...displayWord];
    let newLives = lifeLeft;
    let newMessage = "";

    if (curWord.includes(letter)) {
      // Reveal all matching letters
      for (let i = 0; i < curWord.length; i++) {
        if (curWord[i] === letter) {
          newDisplay[i] = letter;
        }
      }
      newMessage = "Nice guess!";
    } else {
      newLives += 1;
      newMessage = "Wrong letter!";
    }

    // Check game status
    let newIsWon = false;
    if (!newDisplay.includes("_")) {
      newMessage = `You win! The word was "${curWord}".`;
      newIsWon = true;
    } else if (newLives >= pics.length - 1) {
      newMessage = `Game over! The word was "${curWord}".`;
    }

    this.setState({
      usedLetters: newUsed,
      displayWord: newDisplay,
      lifeLeft: newLives,
      message: newMessage,
      isWon: newIsWon
    });
  }

  render() {
    const { curWord, displayWord, lifeLeft, usedLetters, message, isWon } = this.state;
    const isGameOver = isWon || (lifeLeft >= pics.length - 1);
    const imageSrc = isWon ? 'saved.png' : pics[lifeLeft];

    return (
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h1>Hangman Game</h1>
        <img
          src={imageSrc}
          alt="Hangman"
          className="hangman-image"
        />
        <p style={{ fontSize: '34px', letterSpacing: '10px' }}>
          {displayWord.join(" ")}
        </p>
  <SingleLetterSearchbar onGuess={this.handleLetterGuess} disabled={isGameOver} />
        <p>Used Letters: {usedLetters.join(", ")}</p>
        <p style={{ fontWeight: 'bold' }}>{message}</p>
        <button onClick={this.startNewGame}> New Game </button>

        {/* Example of LetterBox for visualization */}
        {/* <div style={{ marginTop: '20px' }}>
          <LetterBox
            letter="A"
            isVisible={true}
            boxStyle={{ backgroundColor: 'lightblue' }}
            letterStyle={{ color: 'white', fontSize: '30px' }}
          />
        </div> */}
      </div>
    );
  }
}

export default HangmanGame;
