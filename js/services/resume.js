app.factory('resume', ['$http', function ($http) {
  return $http.get('http://192.168.1.230:3000/portfolio/my-resume.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
