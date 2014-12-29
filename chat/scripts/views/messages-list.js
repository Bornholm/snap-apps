(function(Chat, Backbone, _) {

  Chat.MessagesListView = Backbone.Marionette.CollectionView.extend({
    childView: Chat.MessageView,
  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
