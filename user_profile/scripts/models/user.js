(function(Users, Backbone, _) {

  Users.UserModel = Backbone.Model.extend({

    defaults: {
      uid: '',
      isTemporary: true,
      nickname: ''
    }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
