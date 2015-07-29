app.factory('portfolio', ['$http', function ($http) {
  var base = 'http://www.ericadamski.com';//"http://192.168.1.230:3000"; /*https://ericadamski.herokuapp.com*/
  return $http.get(base + '/portfolio/my-portfolio.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
