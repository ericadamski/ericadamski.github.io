app.factory('profile', ['$http', function ($http) {
  return $http.get('http://www.ericadamski.herokuapp.com/portfolio/my-profile.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
