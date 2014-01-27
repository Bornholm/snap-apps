(function(angular) {

  var deps = ['$q'];

  function FileServiceFactory($q) {

    var api = {};

    function fakeInput(nwFileSelectorType, workingDir) {
      var deferred = $q.defer();
      var input = document.createElement('input');
      input[nwFileSelectorType] = true;
      input.nwworkingdir = workingDir;
      input.type = 'file';
      input.addEventListener("change", function(evt) {
        deferred.resolve(this.value)
      }, false);
      input.click();
      return deferred.promise;
    }

    api.selectFolder = function(workingDir) {
      return fakeInput('nwdirectory', workingDir);
    };

    return api;
    
  }

  angular
    .module('Snap.AppCreator')
    .factory('Snap.File', deps.concat(FileServiceFactory));

}(angular));