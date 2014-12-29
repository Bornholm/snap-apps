(function(Home, Backbone, _) {

  var DEFAULT_ICON = 'icons/default.png';

  Home.AppItemView = Backbone.Marionette.ItemView.extend({

    template: '#template-app-appitem',
    className: 'app transition',

    initialize: function(opts) {
      this.appColor = opts.appColor;
    },

    modelEvents: {
      'change': 'render'
    },

    onRender: function() {
      var $el = this.$el;
      _.defer(function() {
        $el.addClass('visible');
      });
    },

    events: {
      'click': 'onAppClicked'
    },

    ui: {
      'icon': '.icon'
    },

    templateHelpers: function() {

      var appColor = this.appColor;

      return {

        appColor: function() {
          return appColor;
        },

        appLabel: function() {
          // TODO Detect user preferred locale and use it
          var manifest = this.manifest;

          if(manifest && manifest.name) {
            return manifest.name;
          } else {
            return this.name;
          }

        },

        appDescription: function() {
          // TODO Detect user preferred locale and use it
          var manifest = this.manifest;

          if(manifest && manifest.description) {
            return manifest.description;
          } else {
            return this.description;
          }

        },

        appIconURL: function() {

          var appName = this.name;
          var manifest = this.manifest;

          if(manifest && manifest.icons) {
            var sizes =_.keys(manifest.icons);
            var max = _.reduce(sizes, getMaxSize, 0);
            if(max > 0) {
              var iconURL = '../apps/' + appName + '/' + manifest.icons[''+max];
              return iconURL;
            }
          } else {
            return DEFAULT_ICON;
          }

          function getMaxSize(prev, curr) {
            return Math.max(+prev, +curr);
          }

        }

      };

    },

    onAppClicked: function() {
      var snapServices = Home.channel.reqres.request('snapServices');
      snapServices.apps.loadApp(this.model.get('name'));
    }

  });

}(
  this.Home = this.Home || {},
  Backbone,
  _
));
