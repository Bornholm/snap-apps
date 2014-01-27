(function(angular) {

  var deps = ['$scope'];

  function WidgetsListCtrl($scope) {

    $scope.availableWidgets = [
      {name: 'Dummy'}
    ];

    $scope.getThumbnailURL = function(widgetName) {
      return '';
    };
    
  }

  angular
    .module('Snap.AppCreator')
    .controller('WidgetsListCtrl', deps.concat(WidgetsListCtrl));

}(angular));