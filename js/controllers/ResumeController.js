app.controller('ResumeController',
  ['$scope', 'profile', 'resume', function($scope, profile, resume) {
    resume.success(function(data) {
      if (data.skills)
      {
        data.skills.sort(function(skill1, skill2) {
          return skill2.proficiency - skill1.proficiency;
        });
      }
      $scope.resume = data;
    });

    profile.success(function(data) {
      $scope.profile = data;
    });
}]);
