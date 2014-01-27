(function(angular) {

  "use strict";

  var deps = [];

  var module = angular.module('Snap.AppCreator');

  module
    .provider('widgetConfig', function WidgetConfigProvider() {

      var _widgetsBaseURL = '';

      this.setWidgetsBaseURL = function(baseURL) {
        _widgetsBaseURL = baseURL;
      };

      this.$get = function WidgetConfigFactory() {
        return {
          getWidgetsBaseURL: function() {
            return _widgetsBaseURL;
          }
        };
      };

    });

  module
    .directive('widget', function() {
      return {
        restrict: 'E',
        template: '<ng-include class="widget" src="getTemplateURL(widgetType)"></ng-include>',
        scope: {
          widgetOptions: '=widgetOptions',
          widgetType: '=widgetType'
        },
        controller: ['$scope', 'widgetConfig', function($scope, widgetConfig) {
          $scope.getTemplateURL = function(widgetType) {
            return widgetConfig.getWidgetsBaseURL() + '/' + widgetType + '.html';
          }
        }]
      };
    });

}(window.angular));