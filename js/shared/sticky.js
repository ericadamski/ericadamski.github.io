// var stick = new Waypoint.Sticky({
//   element: $(".profile-picture")[0],
//   offset: function() {
//     return this.element.innerHeight;
//   }
// })
var isMobile = {
Android: function() {
    return navigator.userAgent.match(/Android/i) ? true : false;
},
BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
},
iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
},
Windows: function() {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
},
any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
}
};

function handleHeader (direction) {
  var elm = $(".name");
  if (elm.hasClass('is-down'))
    elm.transition({'opacity':'0', 'scale':'0.5'}).removeClass('is-down');
  else
    elm.transition({'opacity':'1', 'scale':'1'}).addClass('is-down');

  var nav = $(".navbar");
  if (nav.hasClass('is-down'))
    nav.transition(
      {'y':'-7vh'}).removeClass('is-down');
  else
    nav.transition(
      {'y': '7vh'}).addClass('is-down');

  var topElm = $(".navbar-brand");
  if (topElm.hasClass('is-down'))
    topElm.transition(
      {'y': '-7vh'}).removeClass('is-down');
  else
    topElm.transition({'y': '7vh'}).addClass('is-down');
}

if (!isMobile.any())
{
  var waypoint = new Waypoint({
    element: $(".profile")[0],
    handler: handleHeader
  })
}
