(function(Chat, Backbone, _) {

  Chat.MessageModel = Backbone.Model.extend({

    defaults: {
      text: '',
      senderUid: ''
    }

  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
