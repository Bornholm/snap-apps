(function() {

  var workspace = document.getElementById('workspace');
  var widgets = document.getElementById('widgets');

  function dragHandler(evt) {
    var el = evt.target;
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('text/plain', el.dataset.widgetType);
  }

  function dragOverHandler(evt) {
    evt.preventDefault();
    return false;
  }

  function dropHandler(evt) {
    var widgetType = evt.dataTransfer.getData('text/plain');
    if(widgetType) {
      var isContainer = evt.target.tagName === 'SNAP-CONTAINER';
      addWidget(widgetType, isContainer ? evt.target : evt.target.parentNode);
    }
  }

  function addWidget(tagName, target) {
    target = target || workspace;
    var widget = document.createElement(tagName);
    target.appendChild(widget);
  };

  widgets.addEventListener('dragstart', dragHandler, false);
  workspace.addEventListener('dragover', dragOverHandler, false);
  workspace.addEventListener('drop', dropHandler, false);

}());