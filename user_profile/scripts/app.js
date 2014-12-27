(function(Users, Backbone, Snap) {

  var App = Users.App = new Backbone.Marionette.Application();
  Users.Channel = new Backbone.Wreqr.Channel('global');

  App.on('start', function() {
    App.layout = new Users.LayoutView();
    App.layout.render();
  });

  App.on('start', function() {
    App.router = new Users.Router();
    if(Backbone.history) {
      Backbone.history.start();
    }
  });

  Snap.ready(function(err, services) {

    // Expose Snap services as a Wreqr request
    Users.Channel.reqres.setHandler('snapServices', function() {
      return services;
    });

    App.start();

    if(err) {
      Users.App.layout
        .getRegion('content')
        .show(new Users.SnapErrorView({error: err}))
      ;
    }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  Snap
));
