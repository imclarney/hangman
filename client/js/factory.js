hangman.factory('hangmanFactory', function($http) {
  var urlBase = '/api/games';
  var _hangmanService = {};
 
  _hangmanService.getGames = function() {
    return $http.get(urlBase);
  };
 
  _hangmanService.startGame = function(game) {
    return $http.post(urlBase, game);
  };
 
  _hangmanService.updateGame = function(game) {
    return $http.put(urlBase, game);
  };
 
  _hangmanService.deleteGame = function(id) {
    return $http.delete(urlBase + '/' + id);
  };
 
  return _hangmanService;
});