(function() {

  var MARKDOWN_ROOT = 'content';
  var DEFAULT_PAGE = 'index.md';

  var markedOpts = {
    highlight : function(code, lang) {
      if(lang) {
        return hljs.highlight(lang, code).value;
      } else {
        return hljs.highlightAuto(code).value;
      }
    }
  };

  function loadMarkdown(mdFile) {
    return $.get(MARKDOWN_ROOT + '/' + mdFile).then(function(markdown) {
      $("#content")
        .hide()
        .fadeOut()
        .html(marked(markdown, markedOpts))
        .fadeIn();
    });
  }

  window.onhashchange = function() {
    var mdFile = window.location.hash.slice(1) || DEFAULT_PAGE;
    loadMarkdown(mdFile);
  };

  loadMarkdown(DEFAULT_PAGE);

}());