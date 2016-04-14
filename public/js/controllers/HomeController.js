app.controller('HomeController',
  ['$scope', 'portfolio', 'profile', function($scope, portfolio, profile) {
    portfolio.success(function(data) {
      $scope.portfolios = data;
    })
    profile.success(function(data) {
      $scope.profile = data;
      $scope.socialMedia = data.socialMedia;
    });
}]);
