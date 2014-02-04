this.system =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    return cb();
  },

  getNetworkAddresses: function(test) {
    this.sandbox.system.getNetworkAddresses(function(err, adresses) {
      test.ifError(err);
      test.ok(
        adresses,
        'system.getNetworkAddresses should return a list of network adresses !'
      );
      test.done();
    });
  },

  getServerExternalURL: function(test) {
    this.sandbox.system.getServerExternalURL('tests', function(err, externalURL) {
      test.ifError(err);
      test.ok(
        externalURL,
        'system.getServerExternalURL should return an URL !'
      );
      test.done();
    });
  }

};