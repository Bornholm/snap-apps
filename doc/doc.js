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
    var mdFile = $(this).attr('href');
    window.location.hash = "#/" + mdFile;
  });

  $(window).on('hashchange', function(){
    var hash = window.location.hash;
    var mdFile = hash.slice(1);
    loadMarkdown(mdFile ? mdFile : 'index.md');
  });

  loadMarkdown('index.md');

}());