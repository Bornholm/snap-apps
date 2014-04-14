(function() {

  var $workspace = $('#workspace');
  var $widgets = $('#widgets');

  function dragHandler(evt) {
    var el = evt.target;
    var dataTransfer = evt.originalEvent.dataTransfer;
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('text/plain', el.dataset.widgetType);
  }

  function dragOverHandler(evt) {
    return false;
  }

  function dropHandler(evt) {
    var dataTransfer = evt.originalEvent.dataTransfer;
    var widgetType = dataTransfer.getData('text/plain');
    if(widgetType) {
      var isContainer = evt.target.tagName === 'SNAP-CONTAINER';
      addWidget(widgetType, isContainer ? evt.target : evt.target.parentNode);
    }
    return false;
  }

  function addWidget(tagName, target) {
    var $target = $(target || workspace);
    var widget = document.createElement(tagName);
    widget.style.width = 0;
    $target.append(widget);
  }

  function removeHandler(evt) {
    $(evt.target).remove();
  }

  $widgets.bind('dragstart', dragHandler);
  $workspace.bind({
    'dragover': dragOverHandler,
    'drop': dropHandler,
    'removeclick': removeHandler
  });

  $('#toggleView').bind('click', function() {
    var viewOnly = $workspace.attr('view-only');
    if(viewOnly) {
      $workspace.removeAttr('view-only');
    } else {
      $workspace.attr('view-only', true);
    }
  });

}());