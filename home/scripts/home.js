(function(w) {

  'use strict';

  var DEFAULT_ICON = 'icons/default.png';

  var Snap = w.Snap;
  var document = w.document;
  var panel = document.getElementById('panel-1');

  if(Snap) {

    // Get Snap sandbox
    Snap.ready(function(err, sandbox) {

      // Fest apps list
      sandbox.apps.getAppsList(function(err, apps) {
        if(err) {
          throw err; // TODO dispatch error
        }
        // For each app available, except home, create an icon
        apps.forEach(function(appName, i) {
          if(appName !== 'home') {
            var appItem = createAppItem(appName);
            panel.appendChild(appItem);
            setTimeout(makeVisible.bind(appItem), 25 + i*25);
          }
        });
      });

      function makeVisible() {
        this.classList.add('visible');
      }

      function setAppIcon(appName, iconEl) {
        var marker = Date.now().toString(16);
        getAppIconURL(appName, function(err, iconURL) {
          if(err) {
            throw err;
          }
          iconEl.style.backgroundImage = 'url(' + iconURL + ')';
        });
      };

      function getAppIconURL(appName, cb) {
        sandbox.apps.getAppManifest(appName, function(err, manifest) {
          if(err) {
            return cb(err);
          }
          if(manifest && manifest.icons) {
            var sizes = Object.keys(manifest.icons);
            var max = sizes.reduce(getMaxSize, 0);
            if(max > 0) {
              var iconURL = '/apps/' + appName + '/' + manifest.icons[''+max];
              return cb(null, iconURL);
            }
          } else {
            return cb(null, DEFAULT_ICON);
          }
        });
      }

      function getMaxSize(prev, curr) {
        return Math.max(+prev, +curr);
      }

      function loadApp(appName) {
        return sandbox.apps.loadApp(appName);
      }

      var COLORS = ['lime', 'blue', 'canary', 'rose'];
      var colorIndex = 3;

      function createAppItem(appName) {

        var appItem = document.createElement('div');
        appItem.className = 'app transition';

        var appIcon = document.createElement('div');
        appIcon.className = 'icon ' + COLORS[(colorIndex++)%COLORS.length];
        setAppIcon(appName, appIcon);
        appItem.appendChild(appIcon);

        var appLabel = document.createElement('span');
        appLabel.className = 'label';
        appLabel.innerHTML = appName;
        appItem.appendChild(appLabel);

        appItem.onclick = loadApp.bind(null, appName);

        return appItem;
      }

    });

  } else {
    throw new Error('Not in a Snap context !');
  }

}(window));
