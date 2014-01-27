(function(angular) {

  var deps = ['$scope'];

  function WorkspaceCtrl($scope) {

    $scope.workspaceWidgets = [
      {type: 'dummy'},
      {type: 'dummy'}
    ];
    
  }

  angular
    .module('Snap.AppCreator')
    .controller('WorkspaceCtrl', deps.concat(WorkspaceCtrl));

}(angular));