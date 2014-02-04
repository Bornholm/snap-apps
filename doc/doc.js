(function() {

  var mdRoot = 'content';

  function loadMarkdown(mdFile) {
    return $.get(mdRoot + '/' + mdFile).then(function(markdown) {
      $("#content")
        .hide()
        .fadeOut()
        .html(marked(markdown))
        .fadeIn();
    });
  }
  
  $("#content").on('click', 'a', function(evt) {
    evt.preventDefault();
    var $link = $(this);
    var mdFile = $(this).attr('href');
    loadMarkdown(mdFile).fail(function() {
      $link.css('color', 'red');
    });
  });

  loadMarkdown('index.md');

}());