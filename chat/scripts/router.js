(function(Chat, Backbone, _) {

  Chat.Router = Backbone.Marionette.AppRouter.extend({

    controller: {

      showIndex: function() {

        Chat.App.layout
          .getRegion('main')
          .show(new Chat.MessagesListView({
            collection: Chat.messages
          }))
        ;

        Chat.App.layout
          .getRegion('aside')
          .show(new Chat.UsersListView({
            collection: Chat.connectedUsers
          }))
        ;

        Chat.App.layout
          .getRegion('footer')
          .show(new Chat.MessageInputView({
            model: new Chat.MessageModel()
          }))
        ;

      },

    },

    appRoutes: {
      '': 'showIndex'
    }

  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
