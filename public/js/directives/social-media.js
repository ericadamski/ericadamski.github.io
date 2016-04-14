app.directive('socialMedia', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'views/social-media.html'
  };
});
