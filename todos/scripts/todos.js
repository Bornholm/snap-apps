(function() {

  var Todos = angular.module('Todos', []);

  Todos.controller('AppCtrl', ['$scope', 'Snap', function($scope, Snap) {

    $scope.sharedTodos = [];
    $scope.todos = [];

    Snap.appStorage.get('todos', function(err, todos) {
      console.log('get', todos)
      $scope.$apply(function() {
        $scope.todos = todos || [];
      });
    });

    Snap.appStorage.getShared('todos', function(err, todos) {
      console.log('getShared', todos)
      $scope.$apply(function() {
        $scope.sharedTodos = todos || [];
      });
    });

    $scope.newTodo = '';

    $scope.newTodoHandler = function($event) {
      if($event.keyCode === 13) { // ENTER Key
        $scope.createNewTodo($scope.newTodo);
        $scope.newTodo = '';
      }
    };

    $scope.createNewTodo = function(text, isShared) {
      var todo = {
        text: text,
        isShared: isShared || false,
        date: new Date(),
        done: false
      };
      var todos = isShared ? $scope.sharedTodos : $scope.todos;
      todos.push(todo);
      var cleanedTodos = todos.map(cleanUp);
      Snap.appStorage['put' + (isShared ? 'Shared' : '')]('todos', cleanedTodos);
    };

    function cleanUp(todo) {
      delete todo.$$hashKey;
      return todo;
    }

  }]);

  // Get Snap sandbox
  Snap.ready(function(err, sandbox) {

    // Expose Snap sandbox as an angular module 
    Todos.factory('Snap', function() {
      return sandbox;
    });

    // Bootstrap application
    angular.bootstrap(document, ['Todos']);

  });
  
}());