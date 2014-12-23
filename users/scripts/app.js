(function(Users, Backbone, _) {

  var App = Users.App = new Backbone.Marionette.Application();

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
    App.start();
  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
