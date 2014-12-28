(function(Home, Backbone, _) {

  Home.AppModel = Backbone.Model.extend({

    defaults: {
      name: '',
      manifest: {}
    }

  });

}(
  this.Home = this.Home || {},
  Backbone,
  _
));
