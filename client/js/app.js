hangman = angular.module('hangman', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/game.html',
        controller: 'HangmanCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });