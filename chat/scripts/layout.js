(function(Chat, Backbone, _) {

  Chat.LayoutView = Backbone.Marionette.LayoutView.extend({

    el: '#app-container',

    template: '#template-layout-main',

    regions: {
      main: '#main',
      aside: '#aside',
      footer: '#footer'
    }

  });

}(
  this.Chat = this.Chat || {},
  Backbone,
  _
));
