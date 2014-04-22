(function(AppBuilder) {

  var FS = AppBuilder.FileSystem = {};

  FS.openApp = function(targetDir, cb) {

  };

  function App() {
    this.targetDir = null;
    this.widgetsTree = null;
  };

  var p = App.prototype;

  p.save = function(cb) {
    var fs = require('./apps/app-builder/node_modules/fs-extra');
    
  };

}(this.AppBuilder = this.AppBuilder || {}));