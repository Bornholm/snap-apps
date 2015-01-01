this.rtc =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    this.sandbox.rtc.on('rtc:message', console.log.bind(console));
    return cb();
  },

  broadcast: function(test) {
    this.sandbox.rtc.broadcast({foo: 'bar'}, function(err, user) {
      test.ifError(err);
      test.done();
    });
  }

};
