this.storage =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    return cb();
  },

  appStorage: {

    get: function(test) {

      this.sandbox.appStorage.get('fake-key-'+Date.now(), function(err, value) {
        test.ifError(err);
        test.ok(!value, 'Returned value should be falsy !');
        test.done();
      });
      
    },

    put: function(test) {

      var key = 'test-put-key';
      var value = {hello: 'world'};

      this.sandbox.appStorage.put(key, value, function(err) {

        test.ifError(err);

        this.sandbox.appStorage.get(key, function(err, retValue) {

          test.ifError(err);
          test.ok(
            JSON.stringify(retValue) == JSON.stringify(value),
            'Returned value should equal stored one !'
          );
          
          test.done();

        });

      });
    }

  }

};