app.controller('ContactController',
  ['$scope', 'profile', function($scope, profile) {
    profile.success(function(data) {
      $scope.profile = data;
      $scope.socialMedia = data.socialMedia;
    });
}]);
