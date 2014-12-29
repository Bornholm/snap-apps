(function(Chat, Backbone, _) {

  Chat.MessageView = Backbone.Marionette.ItemView.extend({
    template: '#template-app-message',
  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
