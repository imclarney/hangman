# hangman
A classic guessing game between you and the computer.

Rules:
• When the game is started, the player is represented with an empty field for each letter in the word.
• When the player guesses a letter correctly, each field that represents that letter is filled with the letter.
• When the player guesses a letter incorrectly, a piece of a gallows with a hanging man is drawn.
• After 10 incorrect guesses, the game is over and the player lost.
• Thus, there should be 10 different states of the gallows to be drawn.
• If all fields are filled with their letter before 10 incorrect guesses, the player has won the game.

Technology Requirements:
• Server/client based with the client being the browser
• Client implemented with AngularJS
• Server implemented with NodeJS
• Business logic executed on the server (so nobody can cheat)
• Allow for keeping simple statistics (games won/lost)
• Game is self-contained
• Game must scale to millions of users
