(function(Users, Backbone, _) {

  Users.Router = Backbone.Marionette.AppRouter.extend({

    controller: {

      showIndex: function() {

        var snapServices = Users.Channel.reqres.request('snapServices');

        snapServices.users.getUser(function(err, user) {

          Users.App.layout
            .getRegion('content')
            .show(new Users.Profile.MainView({
              model: new Users.UserModel(user)
            }))
          ;

        });

      },

    },

    appRoutes: {
      '': 'showIndex'
    }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
