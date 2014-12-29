(function(Home, Backbone, _) {

  Home.AppModel = Backbone.Model.extend({

    defaults: {
      name: '',
      manifest: {}
    },

    initialize: function() {
      if(this.has('name')) {
        this.loadManifest();
      } else {
        this.once('change:name', this.loadManifest, this);
      }
    },

    loadManifest: function() {

      var snapServices = Home.channel.reqres.request('snapServices');

      snapServices.apps.getAppManifest(
        this.get('name'),
        _.bind(onManifestLoaded, this)
      );

      function onManifestLoaded(err, manifest) {
        if(err) {
          return this.trigger('error', err);
        }
        this.set('manifest', manifest);
      }

    }

  });

}(
  this.Home = this.Home || {},
  Backbone,
  _
));
