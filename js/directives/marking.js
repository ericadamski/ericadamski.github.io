app.directive('markingOutline', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'views/current-marks.html'
  };
});
