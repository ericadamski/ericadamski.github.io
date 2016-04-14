$(function() {

  if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
    skrollr.init({
      forceHeight: false
    });
  }

  var collapseList = [
    "#work",
    "#education",
    "#skills",
    "#references"
  ];

  for( var string in collapseList )
    $(string).removeClass('in');

  function changeArrow(elementId, direction) {
    if (direction == "show")
    {
      $(elementId).transition({rotate: "0deg"});
    }
    else
    {
      $(elementId).transition({rotate: "-90deg"});
    }
  };

  $("#work").on('show.bs.collapse', function() {
    changeArrow('#work-arrow', 'show');
  });

  $("#work").on('hide.bs.collapse', function() {
    changeArrow('#work-arrow', 'hide');
  });

  $("#education").on('show.bs.collapse', function() {
    changeArrow('#education-arrow', 'show');
  });

  $("#education").on('hide.bs.collapse', function() {
    changeArrow('#education-arrow', 'hide');
  });

  $("#skills").on('show.bs.collapse', function() {
    changeArrow('#skills-arrow', 'show');
  });

  $("#skills").on('hide.bs.collapse', function() {
    changeArrow('#skills-arrow', 'hide');
  });

  $("#references").on('show.bs.collapse', function() {
    changeArrow('#references-arrow', 'show');
  });

  $("#references").on('hide.bs.collapse', function() {
    changeArrow('#references-arrow', 'hide');
  });
});
