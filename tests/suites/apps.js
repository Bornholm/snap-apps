this.apps =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    return cb();
  },

  getAppsList: function(test) {
    this.sandbox.apps.getAppsList(function(err, apps) {
      test.ifError(err);
      test.ok(
        apps.indexOf('tests') !== -1,
        'Apps list should contain "tests" app !'
      );
      test.done();
    });
  },

  getAppManifest: function(test) {
    this.sandbox.apps.getAppManifest('tests', function(err, manifest) {
      test.ifError(err);
      test.ok(
        manifest,
        'Manifest should not be falsy !'
      );
      test.done();
    });
  }

};