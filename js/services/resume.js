app.factory('resume', ['$http', function ($http) {
  return $http.get('http://www.ericadamski.herokuapp.com/portfolio/my-resume.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
