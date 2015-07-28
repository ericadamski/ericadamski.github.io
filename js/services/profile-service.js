app.factory('profile', ['$http', function ($http) {
  return $http.get('http://192.168.1.230:3000/portfolio/my-profile.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
