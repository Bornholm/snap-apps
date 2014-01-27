(function(angular) {

  var deps = ['$scope', 'Snap.File'];

  function MenuCtrl($scope, file) {

    $scope.openProject = function() {
      file
        .selectFolder('./apps')
        .then(function(folder) {
          console.log(folder);
        });
    }
    
  }

  angular
    .module('Snap.AppCreator')
    .controller('MenuCtrl', deps.concat(MenuCtrl));

}(angular));