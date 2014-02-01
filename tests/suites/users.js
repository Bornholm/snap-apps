this.users =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    return cb();
  },

  getUserInfo: function(test) {
    this.sandbox.users.getUserInfo(function(err, user) {
      test.ifError(err);
      test.ok(
        user,
        'users.getUserInfo should return a valid user !'
      );
      test.done();
    });
  }

};