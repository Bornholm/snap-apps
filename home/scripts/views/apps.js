(function(Home, Backbone, _) {

  var COLORS = ['lime', 'blue', 'canary', 'rose'];

  Home.AppsView = Backbone.Marionette.CollectionView.extend({

    childView: Home.AppItemView,

    childViewOptions: function(model, index) {
      return {
        appColor: COLORS[index % COLORS.length]
      };
    }

  });

}(
  this.Home = this.Home || {},
  Backbone,
  _
));
