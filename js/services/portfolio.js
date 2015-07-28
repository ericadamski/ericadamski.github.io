app.factory('portfolio', ['$http', function ($http) {
  return $http.get('http://www.ericadamski.herokuapp.com/portfolio/my-portfolio.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
