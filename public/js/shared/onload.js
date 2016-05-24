function reset() {
  //Waypoint.refreshAll();

  var elm = $('.name');

  if (elm.hasClass('is-down'))
    elm.removeClass('is-down');

  elm = $('.navbar');

  if (!elm.hasClass('hidden'))
    elm.addClass('hidden');

  elm = $('.navbar-brand');

  if (elm.hasClass('is-down'))
    elm.removeClass('is-down');
}

$(function () {
  //reset();
  window.scrollTo(0, 0);
});
