(function(Users, Backbone, _) {

  var Profile = Users.Profile = Users.Profile || {};

  Profile.MainView = Backbone.Marionette.ItemView.extend({

    template: '#template-profile-main',

    ui: {
      'saveButton': '#saveProfileButton',
      'nicknameInput': '#nicknameInput'
    },

    events: {
      'click @ui.saveButton': 'saveProfile',
      'change @ui.nicknameInput': 'onNicknameChanged'
    },

    modelEvents: {
      'change': 'render'
    },

    onNicknameChanged: function() {
      var user = this.model;
      var nickname = this.ui.nicknameInput.val();
      this.saveNickname(nickname, function(err, userData) {
        if(err) {
          // TODO show error

        } else {
          user.set(userData);
        }
      });
    },

    saveNickname: function(nickname, cb) {
      var self = this;
      var snapServices = Users.Channel.reqres.request('snapServices');
      snapServices.users.changeNickname(nickname, cb);
    }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
