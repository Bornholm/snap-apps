this.users =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    return cb();
  },

  getUser: function(test) {
    this.sandbox.users.getUser(function(err, user) {
      test.ifError(err);
      test.ok(
        user,
        'users.getUser should return a valid user !'
      );
      test.done();
    });
  }

};
