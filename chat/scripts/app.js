(function(Chat, Backbone, Snap) {

  var App = Chat.App = new Backbone.Marionette.Application();
  Chat.channel = new Backbone.Wreqr.Channel('global');

  App.on('start', function() {
    App.layout = new Chat.LayoutView();
    App.layout.render();
  });

  App.on('start', function() {
    App.router = new Chat.Router();
    if(Backbone.history) {
      Backbone.history.start();
    }
  });

  var UsersCollection = Backbone.Collection.extend({
    model: Chat.UserModel
  });

  App.connectedUsers = new UsersCollection();

  var MessagesCollection = Backbone.Collection.extend({
    model: Chat.MessageModel
  });

  App.messages = new MessagesCollection();

  Snap.ready(function(err, services) {

    // Expose Snap services as a Wreqr request
    Chat.channel.reqres.setHandler('snapServices', function() {
      return services;
    });



  });

  App.start();

}(
  this.Chat = this.Chat || {},
  Backbone,
  Snap
));
