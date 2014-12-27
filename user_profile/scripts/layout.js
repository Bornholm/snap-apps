(function(Users, Backbone, _) {

  Users.LayoutView = Backbone.Marionette.LayoutView.extend({

    el: '#app-container',

    template: '#template-layout-main',

    regions: { content: '#content' }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
