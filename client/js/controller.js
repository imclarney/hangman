hangman.controller('HangmanCtrl', function($rootScope, $scope, hangmanFactory) {
  $scope.game = {};
  $scope.correctGuesses = [];
  $scope.incorrectGuesses = [];
  $scope.uniqueLetters = 0;
  $scope.hiddenWord = '';
  $scope.warning = false;

  // Start a new game
  $scope.start = function($event) {
    if ($event.which == 13 && $scope.word) {
      // Reset the game.
      $scope.game = {};
      $scope.correctGuesses = [];
      $scope.incorrectGuesses = [];
      $scope.uniqueLetters = 0;
      $scope.hiddenWord = $scope.word;
      $scope.warning = false;

      var uniqueLettersArr = []
      var jsonArr = [];
      var index = 0;
      while (index < $scope.word.length) {
        if (uniqueLettersArr.includes($scope.word.charAt(index))) {

        } else {
          uniqueLettersArr.push($scope.word.charAt(index));
        }

        jsonArr.push({
          letter: $scope.word.charAt(index).toLowerCase(),
          isFound: false
        });
        index++;
      }

      $scope.uniqueLetters = uniqueLettersArr.length;
      console.log('This word has ' + uniqueLettersArr.length + ' unique letters');

      $scope.game = {
        "status": "inProgress",
        "word": jsonArr,
        "guessesRemaining": $scope.word.length
      }

      // hangmanFactory.startGame({
      //   "status": "inProgress",
      //   "word": jsonArr,
      //   "guessesRemaining": $scope.word.length
      // }).then(function(data) {
      //   $scope.game = data.data;
      // });
      $scope.word = '';
    }
  };

  // Guess a letter
  $scope.guess = function($event) {
    if ($event.which == 13 && $scope.letter) {
      $scope.warning = false;
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
          }
        } else {
          $scope.correctGuesses.push(letter);
          if ($scope.correctGuesses.length === $scope.uniqueLetters) {
            $scope.game.status = "won"
          }
        }
      }
    }
    $scope.letter = '';
  }

  // // Update the edited Todo
  // $scope.edit = function($event, i) {
  //   if ($event.which == 13 && $event.target.value.trim()) {
  //     var _t = $scope.todos[i];
  //     todosFactory.updateTodo({
  //       _id: _t._id,
  //       todo: $event.target.value.trim(),
  //       isCompleted: _t.isCompleted
  //     }).then(function(data) {
  //       if (data.data.updatedExisting) {
  //         _t.todo = $event.target.value.trim();
  //         $scope.isEditable[i] = false;
  //       } else {
  //         alert('Oops something went wrong!');
  //       }
  //     });
  //   }
  // };

});