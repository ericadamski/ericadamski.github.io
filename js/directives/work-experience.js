app.directive('workExperience', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'views/work-experience.html'
  };
});
