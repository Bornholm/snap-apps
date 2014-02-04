this.apps =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    return cb();
  },

  getAppsList: function(test) {
    this.sandbox.apps.getAppsList(function(err, apps) {
      test.ifError(err);
      test.ok(
        Array.isArray(apps),
        'apps.getAppsList should return a list of existing apps !'
      );
      test.ok(
        apps.indexOf('tests') !== -1,
        'The apps list should contain the app "tests" !'
      );
      test.done();
    });
  },

  getAppManifest: function(test) {
    this.sandbox.apps.getAppManifest('tests', function(err, manifest) {
      test.ifError(err);
      test.ok(
        manifest,
        'apps.getAppManifest should return a manifest object for the "tests" app !'
      );
      test.done();
    });
  }

};