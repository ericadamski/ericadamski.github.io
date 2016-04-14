app.factory('marking', ['$http', function ($http) {
  var base = window.location.protocol + "//" + window.location.host;
  return function (filename) {
    console.log(filename);
    return $http.get(base + '/marking' + filename)
         .success(function(data) {
           return data;
         })
         .error(function(data) {
           return data;
         });
    };
}])
