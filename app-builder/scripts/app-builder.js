(function() {

  function AppBuilder(menu, workspace, widgets) {
    this.$menu = $(menu);
    this.$widgets = $(widgets);
    this.$workspace = $(workspace);
    this._initListeners();
  }

  this.AppBuilder = AppBuilder;

  var p = AppBuilder.prototype;

  p.isNWContext = function() {
    return 'require' in window;
  };

  p._initListeners = function() {

    // Widgets listeners
    this.$widgets.on({
      'dragstart': this._widgetsDragHandler.bind(this)
    });

    // Workspace listeners
    this.$workspace.on({
      'dragover': this._widgetsDragOverHandler.bind(this),
      'drop': this._widgetsDropHandler.bind(this),
      'removeclick': this._widgetsRemoveHandler.bind(this)
    });

    // Menu listeners
    this.$menu.on({
      'click.toggleView': this._menuToggleViewHandler.bind(this)
    });

  };

  // Events Handlers

  p._widgetsDragHandler = function(evt) {
    var el = evt.target;
    var dataTransfer = evt.originalEvent.dataTransfer;
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('text/plain', el.dataset.widgetType);
  };

  p._widgetsDragOverHandler = function(evt) {
    return false;
  };

  p._widgetsDropHandler = function(evt) {
    var dataTransfer = evt.originalEvent.dataTransfer;
    var widgetType = dataTransfer.getData('text/plain');
    if(widgetType) {
      var isContainer = evt.target.tagName === 'SNAP-CONTAINER';
      this._addWidget(widgetType, isContainer ? evt.target : evt.target.parentNode);
    }
    return false;
  };

  p._widgetsRemoveHandler = function(evt) {
    $(evt.target).remove();
  };

  p._menuToggleViewHandler = function(evt) {
    var viewOnly = this.$workspace.attr('view-only');
    if(viewOnly) {
      this.$workspace.removeAttr('view-only');
    } else {
      this.$workspace.attr('view-only', true);
    }
  };

  p._addWidget = function(tagName, target) {
    var $target = $(target || this.$workspace);
    var widget = document.createElement(tagName);
    widget.style.width = 0;
    $target.append(widget);
  };

}());