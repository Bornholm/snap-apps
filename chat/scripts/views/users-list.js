(function(Chat, Backbone, _) {

  Chat.UsersListView = Backbone.Marionette.CollectionView.extend({
    childView: Chat.UserView,
  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
