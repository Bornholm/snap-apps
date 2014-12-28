(function(Home, Backbone, Snap, _) {

  'use strict';

  var App = Home.App = new Backbone.Marionette.Application();
  Home.channel = new Backbone.Wreqr.Channel('global');

  var AppsCollection = Backbone.Collection.extend({
    model: Home.AppModel
  });

  var appsCol = new AppsCollection();

  App.on('start', function() {
    var mainView = new Home.AppsView({
      el: '#app-container',
      collection: appsCol
    });
    mainView.render();
  });

  App.on('start', function() {

    var snapServices = Home.channel.reqres.request('snapServices');

    snapServices.apps.getAppsList(function(err, apps) {

      if(err) {
        return console.error(err);
      }

      _.each(apps, function(appName) {

        if(appName !== 'home') {
          snapServices.apps.getAppManifest(appName, function(err, manifest) {
            if(err) {
              return console.error(err);
            }
            var appItem = new Home.AppModel({name: appName, manifest: manifest});
            appsCol.add(appItem);
          });
        }

      });

    });

  });

  Snap.ready(function(err, services) {

    if(err) {
      return console.error(err);
    }

    // Expose Snap services as a Wreqr request
    Home.channel.reqres.setHandler('snapServices', function() {
      return services;
    });

    App.start();

  });

}(
  this.Home = this.Home || {},
  Backbone,
  Snap,
  _
));
