app.factory('portfolio', ['$http', function ($http) {
  var base = window.location.protocol + "//" + window.location.host;
  return $http.get(base + '/portfolio/my-portfolio.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
