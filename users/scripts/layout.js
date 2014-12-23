(function(Users, Backbone, _) {

  Users.LayoutView = Backbone.Marionette.LayoutView.extend({

    el: '#app-container',

    template: '#template-app-layout',

    regions: { main: '#main' }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
