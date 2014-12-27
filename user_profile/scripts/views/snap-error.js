(function(Users, Backbone, _) {

  Users.SnapErrorView = Backbone.Marionette.ItemView.extend({

    template: '#template-app-snaperror',

    initialize: function(opts) {
      opts = opts || {};
      this.error = opts.error;
    },

    serializeData: function() {
      if(this.error) {
        return {
          errorName: this.error.name,
          errorStack: this.error.stack,
          errorMessage: this.error.message
        };
      }
      return {};
    }

  });

}(
  this.Users = this.Users || {},
  Backbone,
  _
));
