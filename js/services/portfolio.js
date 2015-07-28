app.factory('portfolio', ['$http', function ($http) {
  return $http.get('http://192.168.1.230:3000/portfolio/my-portfolio.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
