app.factory('resume', ['$http', function ($http) {
  var base = 'http://www.ericadamski.com';//"http://192.168.1.230:3000"; /*'https://ericadamski.herokuapp.com'*/
  return $http.get(base + '/portfolio/my-resume.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
