//creating a hangmanGame object that will hold the logic and variables
var hangmanGame = {

  //object of all the words that can be chosen
  wordsToPick: {
    germany: {},
    poland: {},
    france: {},
    spain: {},
    portugal: {},
    belgium: {},
    switzerland: {},
    austria: {},
    italy: {},
  },

  //variables to set the initial game state 
  wordInPlay: null,
  lettersOfTheWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

}