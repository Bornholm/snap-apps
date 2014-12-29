(function(Chat, Backbone, _) {

  Chat.UserModel = Backbone.Model.extend({

    defaults: {
      uid: '',
      isTemporary: true,
      nickname: ''
    }

  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
