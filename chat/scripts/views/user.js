(function(Chat, Backbone, _) {

  Chat.UserView = Backbone.Marionette.ItemView.extend({
    template: '#template-app-user',
  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
