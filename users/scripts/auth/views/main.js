(function(Users, Backbone, _) {

  var Auth = Users.Auth = Users.Auth || {};

  Auth.MainView = Backbone.Marionette.ItemView.extend({

    template: '#template-auth-main'

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
