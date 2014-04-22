Snap.ready(function(err, sandbox){

    // Expose Snap sandbox as an angular module 
    angular.module('TestLs').factory('Snap', function() {
        return sandbox;
    });

    // Bootstrap application
    angular.bootstrap(document, ['TestLs']);
});
