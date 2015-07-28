app.factory('portfolio', ['$https', function ($https) {
  return $http.get('https://ericadamski.herokuapp.com/portfolio/my-portfolio.json')
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
}])
