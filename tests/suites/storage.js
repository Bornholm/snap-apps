this.storage =  {

  setUp: function(cb) {
    this.sandbox = window.sandbox;
    return cb();
  },

  appStorage: {

    simpleGet: function(test) {

      this.sandbox.appStorage.get('fake-key-'+Date.now(), function(err, value) {
        test.ifError(err);
        test.ok(!value, 'Returned value should be falsy !');
        test.done();
      });
      
    },

    simplePut: function(test) {

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
    },

    simpleGetShared: function(test) {

      this.sandbox.appStorage.getShared('fake-key-'+Date.now(), function(err, value) {
        test.ifError(err);
        test.ok(!value, 'Returned value should be falsy !');
        test.done();
      });
      
    },

    simplePutShared: function(test) {

      var key = 'test-put-key';
      var value = {hello: 'world'};

      this.sandbox.appStorage.putShared(key, value, function(err) {

        test.ifError(err);

        this.sandbox.appStorage.getShared(key, function(err, retValue) {

          test.ifError(err);
          test.ok(
            JSON.stringify(retValue) == JSON.stringify(value),
            'Returned value should equal stored one !'
          );
          
          test.done();

        });

      });

    },

  },

  // Put data into user's space, try to get it into shared space
  separedStorageSpaces: function(test) {

    var key = 'test-put-key';
    var value = {hello: 'world'};

    this.sandbox.appStorage.put(key, value, function(err) {

      test.ifError(err);

      this.sandbox.appStorage.getShared(key, function(err, retValue) {

        test.ifError(err);
        test.ok(
          JSON.stringify(retValue) !== JSON.stringify(value),
          'Returned value should not equal stored one !'
        );
        
        test.done();

      });

    });
  }

};