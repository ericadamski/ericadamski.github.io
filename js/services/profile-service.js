app.factory('profile', ['$http', function ($http) {
  var base = 'https://www.ericadamski.com';//"http://192.168.1.230:3000"; /*'https://ericadamski.herokuapp.com'*/
  return $http.get(base + '/portfolio/my-profile.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}]);
