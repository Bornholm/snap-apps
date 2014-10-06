this.messages =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    window.Snap.on('message', console.log.bind(console));
    return cb();
  },

  broadcast: function(test) {
    this.sandbox.messages.broadcast({foo: 'bar'}, function(err, user) {
      test.ifError(err);
      test.done();
    });
  }

};
