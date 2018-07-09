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

  //The setup game method is called when the page first loads

  setupGame: function () {
    //Pick a random word
    var objKeys = Object.keys(this.wordsToPick);
    this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
    //Log the random country to the console
    console.log(this.wordInPlay);
    //Split the chosen word into its individaul letters
    this.lettersOfTheWord = this.wordInPlay.split("");
    //The below builds the representation of the word to guess & displays it to the page
    //It will be all underscores to start ("_ _ _")
    this.rebuildWordView();
  },

  //Function that restarts the game by resetting all the variables
  restartGame: function () {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
  },

  //function that displays the word to guess
  rebuildWordView: function () {
    //We start with an empty string 
    var wordView = "";
    //Loop through the letters of the word to guess
    for (var i = 0; i < this.lettersOfTheWord.length;
      i++) {
      //If the letter has been guessed, display the letter
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
        wordView += this.lettersOfTheWord[i];
      }
      //If the letter hasn't been guessed display an underscore "_"
      else {
        wordView += "&nbsp;_&nbsp;"
      }
    }
    //Update the page with the new string we built
    document.querySelector("#current-word").innerHTML = wordView;
  },
}
//Initialize the game when the page loads
hangmanGame.setupGame();