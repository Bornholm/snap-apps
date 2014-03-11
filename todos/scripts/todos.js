(function() {

  moment.lang('fr');

  var Todos = angular.module('Todos', []);

  Todos.controller('AppCtrl', ['$scope', 'Snap', function($scope, Snap) {

    $scope.predicate = ['done', sortDate];
    $scope.reverse = false;
    $scope.todosShared = [];
    $scope.todos = [];
    $scope.isShared = false;
    $scope.newTodo = '';

    var today = moment().startOf('day');

    function sortDate(todo) {
      if(!todo.dueDate) {
        return Number.MAX_VALUE;
      }
      var dueDate = moment(todo.dueDate).startOf('day');
      var diff = today.diff(dueDate, 'days');
      return -diff;
    }

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

    $scope.isOverdue = function(todo) {
      return !todo.done && moment(todo.dueDate).isBefore(today, 'day');
    };

    $scope.newTodoHandler = function($event) {
      if($event.keyCode === 13) { // ENTER Key
        var todo = $scope.createNewTodo($scope.newTodo, $scope.isShared);
        var todos = $scope.isShared ? $scope.sharedTodos : $scope.todos;
        todos.push(todo);
        $scope.saveTodo(todo);
        $scope.isShared = false;
        $scope.newTodo = '';
      }
    };

    $scope.createNewTodo = function(text, isShared) {
      var todo = {
        key: 'todo-'+Date.now(),
        text: text,
        isShared: isShared || false,
        creationDate: new Date(),
        doneDate: null,
        dueDate: null,
        done: false
      };
      return todo;
    };

    $scope.updateDoneDate = function(todo) {
      todo.doneDate = todo.done ? new Date() : null;
    };

    $scope.saveTodo = function(todo) {
      Snap.appStorage['put' + (todo.isShared ? 'Shared' : '')](todo.key, todo);
    };

    $scope.deleteTodo = function(todo) {
      Snap.appStorage['del' + (todo.isShared ? 'Shared' : '')](todo.key);
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
