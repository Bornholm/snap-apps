(function(Chat, Backbone, _) {

  Chat.MessageInputView = Backbone.Marionette.ItemView.extend({

    template: '#template-app-messageinput',

    className: 'message-input'

  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
