var  testLs = angular.module('testLs', []);
 
testLs.controller('PhoneListCtrl', function ($scope) {
    $scope.files = [];
    
    // Get Snap sandbox
    Snap.ready(function(err, sandbox) {

    // Expose Snap sandbox as an angular module 
    TestLs.factory('Snap', function() {
      return sandbox;
    });

    // Bootstrap application
    angular.bootstrap(document, ['TestLs']);

  });
});
