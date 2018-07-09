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
    //This function sets the number of guesses the user gets and renders it to the HTML
    this.processUpdateTotalGuesses();
  },

  //updatePage is run whenever the user guesses a letter..
  updatePage: function (letter) {
    //If the user has no guesses left, restart the game
    if (this.guessesLeft === 0) {
      this.restartGame();
    }
    //If user still has guesses left
    else {
      //Check for & handle incorrect guesses
      this.updateGuesses(letter);

      //Check for & handle correct guesses
      this.updateMatchedLetters(letter);

      //Rebuild the view of the word. Guessed letters revealed, unguessed have an underscore
      this.rebuildWordView();

      //If the user wins restart the game
      if (this.updateWins() === true) {
        this.restartGame();
      }
    }
  },

  //This function deals with a user's incorrect guess
  updateGuesses: function (letter) {
    //If the letter is not in the guessedLetters array, and the letter is not in the lettersOfTheWord array..
    if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {

      //Add the letter to the guessedLetters array
      this.guessedLetters.push(letter);

      //Decrease guesses by one
      this.guessesLeft--;

      //Update guesses remaining and guessed letters on the page
      document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
      document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(", ");
    }
  },

  //This function sets the initial guesses the user gets
  processUpdateTotalGuesses: function () {
    //The user will get more guesses the longer the word is
    this.totalGuesses = this.lettersOfTheWord.length + 5;
    this.guessesLeft = this.totalGuesses;
    // render the "guesses-left" to the page
    document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
  },
  //This function governs what happens when the user makes a correct guess 
  updateMatchedLetters: function (letter) {
    // Loop through the letters of the "solution"
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      //If the guessed letter is in the solution and we havn't guessed it yet
      if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
        //Push the newly guessed letter into the matchedLetters array
        this.matchedLetters.push(letter);
      }
    }
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
        wordView += "&nbsp;_&nbsp;";
      }
    }
    //Update the page with the new string we built
    document.querySelector("#current-word").innerHTML = wordView;
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
  //function to see if the user has won
  updateWins: function () {
    var win;

    //If you havn't correctly guessed a letter in the word yet, we set win to false.
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    //Otherwise, we set win to true
    else {
      win = true;
    }
    //If all the letters in the word havn't been guessed yet, you don't win yet
    for (var i = 0; i < this.lettersOfTheWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
        win = false;
      }
    }
    //If win is true...
    if (win) {

      //Increment wins
      this.wins = this.wins + 1;

      //Update wins on the page
      document.querySelector("#wins").innerHTML = this.wins;

      //return true, which will trigger the restart of our game in the updatePage function.
      return true;
    }
    //If win is false, return false to the updatePage function. The game continues!
    return false;
  }
};
//Initialize the game when the page loads
hangmanGame.setupGame();

//When the user presses a key
document.onkeyup = function (event) {
  //Make the captured key and make it lowercase
  hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  //We can see a console log of which letters the user guessed
  console.log(hangmanGame.letterGuessed);
  //Pass the guessed letter into our updatePage function to run the game logic
  hangmanGame.updatePage(hangmanGame.letterGuessed);
}