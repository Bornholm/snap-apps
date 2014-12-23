(function(Users, Backbone, _) {

  Users.Router = Backbone.Marionette.AppRouter.extend({

    controller: {

      showIndex: function() {
        Users.App.layout.getRegion('main').show(new Users.Auth.MainView());
      }

    },

    appRoutes: {
      '/*': 'showIndex'
    }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
