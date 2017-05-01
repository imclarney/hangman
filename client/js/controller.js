hangman.controller('HangmanCtrl', function($rootScope, $scope, hangmanFactory) {
  $scope.game = {};
  $scope.games = [];
  $scope.correctGuesses = [];
  $scope.incorrectGuesses = [];
  $scope.uniqueLetters = 0;
  $scope.hiddenWord = '';
  $scope.warning = false;

  // Load all games
  hangmanFactory.getGames().then(function(data) {
    $scope.games = data.data;
  });

  // Show record
  $scope.showResultType = function(resultType) {
    var count = 0;
    $scope.games.forEach(function (game) {
      if (game.status === resultType) { count++; }
    });
    return count;
  };

  // Start a new game
  $scope.start = function($event) {
    if ($event.which == 13 && $scope.word) {
      // Reset
      reset();
      $scope.hiddenWord = $scope.word;

      // Set up the new game
      var uniqueLettersArr = []
      var jsonArr = [];
      var index = 0;
      while (index < $scope.word.length) {
        if (!uniqueLettersArr.includes($scope.word.charAt(index))) {
          uniqueLettersArr.push($scope.word.charAt(index));
        }

        jsonArr.push({
          letter: $scope.word.charAt(index).toLowerCase(),
          isFound: false
        });
        index++;
      }

      $scope.uniqueLetters = uniqueLettersArr.length;

      // Save the new game to the server.
      hangmanFactory.saveGame({
        "status": "inProgress",
        "word": jsonArr,
        "guessesRemaining": $scope.word.length
      }).then(function(data) {
        $scope.games.push(data.data);
        $scope.game = data.data;
      });

      $scope.word = '';
    }
  };

  // Guess a letter
  $scope.guess = function($event) {
    if ($event.which == 13 && $scope.letter) {
      $scope.warning = false;
      if ($scope.game.status === 'inProgress') {
        var letter = $scope.letter.toLowerCase();
        if ($scope.correctGuesses.includes(letter)) {
          $scope.warning = 'You already guessed \'' + $scope.letter + '\'!';
        } else {
          var wrong = true;
          var index = 0;
          while (index < $scope.game.word.length) {
            if ($scope.game.word[index].letter === letter) {
              $scope.game.word[index].isFound = true;
              wrong = false;
            }
            index++;
          }

          if (wrong) {
            $scope.incorrectGuesses.push(letter);
            $scope.game.guessesRemaining--;
            if ($scope.game.guessesRemaining === 0) {
              $scope.game.status = "lost";
              $scope.games[$scope.games.length - 1] = $scope.game;
              hangmanFactory.updateGame($scope.game);
            }
          } else {
            $scope.correctGuesses.push(letter);
            if ($scope.correctGuesses.length === $scope.uniqueLetters) {
              $scope.game.status = "won";
              $scope.games[$scope.games.length - 1] = $scope.game;
              hangmanFactory.updateGame($scope.game);
            }
          }
        }
      } else {
        $scope.warning = 'This game has ended. To start a new game, enter a word in the input field above.';
      }
    }
    $scope.letter = '';
  }

  // Delete this game
  $scope.delete = function() {
    hangmanFactory.deleteGame($scope.games[$scope.games.length - 1]._id)
    .then(function(data) {
      if (data.data) {
        $scope.games.splice($scope.games.length - 1, 1);
        reset();
      }
    });
  };

  reset = function() {
    $scope.game = {};
    $scope.correctGuesses = [];
    $scope.incorrectGuesses = [];
    $scope.uniqueLetters = 0;
    $scope.hiddenWord = '';
    $scope.warning = false;
  };

});