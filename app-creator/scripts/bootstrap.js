Snap.ready(function(err, sandbox) {

  angular.element(document).ready(function() {

    var module = angular.module('Snap.AppCreator');

    module.config(['widgetConfigProvider', function(widgetConfig) {
      widgetConfig.setWidgetsBaseURL('widgets');
    }]);

    // Expose sandbox as an Angular service
    module.factory('Snap.Sandbox', function() {
      return sandbox;
    });

    module.factory('Snap.NW', function() {
      return require('nw.gui');
    });

    //Bootstrap Application
    angular.bootstrap(document, ['Snap.AppCreator']);

  });

});