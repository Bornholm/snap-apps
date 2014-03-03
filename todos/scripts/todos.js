(function() {

  var Todos = angular.module('Todos', []);

  Todos.controller('AppCtrl', ['$scope', 'Snap', function($scope, Snap) {

    $scope.sharedTodos = [];
    $scope.todos = [];

    function updateTodos(isShared, err, todos) {
      $scope.$apply(function() {
        todos = (todos || []).map(function(todo) {
          return todo.value;
        });
        $scope['todos' + (isShared ? 'Shared': '')] = todos;
      });
    }

    Snap.appStorage.find(
      {}, 
      {start: 'todo-', end: 'todo.'},
      updateTodos.bind(null, false)
    );

    Snap.appStorage.findShared(
      {}, 
      {start: 'todo-', end: 'todo.'},
      updateTodos.bind(null, true)
    );

    $scope.newTodo = '';

    $scope.newTodoHandler = function($event) {
      if($event.keyCode === 13) { // ENTER Key
        $scope.createNewTodo($scope.newTodo);
        $scope.newTodo = '';
      }
    };

    $scope.createNewTodo = function(text, isShared) {
      var todo = {
        key: 'todo-'+Date.now(),
        text: text,
        isShared: isShared || false,
        date: new Date(),
        done: false
      };
      var todos = isShared ? $scope.sharedTodos : $scope.todos;
      todos.push(todo);
      Snap.appStorage['put' + (isShared ? 'Shared' : '')](todo.key, todo);
    };

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